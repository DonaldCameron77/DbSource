// Main (perhaps only) JS script file for FCC Weather Challenge
//
// Author: Donald Cameron
// Date: 2016-06
//

// To get the location: ip-api.com
//
// To get the weather: api.openweathermap.org - can't call more than once/10 min for any one location
// (Forecast.io was tried - it has fewer restrictions - but it apparently doesn't support
// cross-site invocations directly - would have to implement our own proxy to use 8-( )

// Everything happens when the page is loaded ... there's no button to
// get different weather.  The only user action available is toggling Farenheit/Celsius.

// Keep the weather data around for toggling the units. We *could* read weather data
// back from the DOM but this way is convenient.

var savedData;

var WeatherData = function()
{
    this.update = function(_temp, _units) {
        // alert.log("in WeatherData.update ... ", _temp, _units);
        this.temp = _temp;
        this.units = _units;
        return this;  // Unsure why this is needed, but assigning the result of update fails without it
                      // See "config" discussion at http://stackoverflow.com/questions/12773812/good-way-to-init-array-of-javascript-objects-and-their-properties
    }
};

// Update DOM with temperature and units character
function stuffTemperature(temp, units) {
    // console.log("stuffTemperature:", temp, units);
    $('#temperature').html(temp.toString() + '&#176; ');
    var unitString = units == 'metric'
                      ? 'C'
                      : 'F';
    $("#units").html(unitString);
}

// toggle units
$('#temperatureString').click(function () {
    // invoked when temperature string paragraph is clicked
    var curTemp  = savedData.temp,
        curUnits = savedData.units;
    // console.log("toggling temperature - temp = " + curTemp + ", units = " + curUnits);
    if (curUnits == 'metric') {
        curTemp = ((9 / 5) * curTemp + 32).toFixed(0);
        curUnits = 'imperial';
    }
    else {
        curTemp = ((curTemp - 32) * (5 / 9)).toFixed(0);
        curUnits = 'metric';
    }
    stuffTemperature(curTemp, curUnits);
    savedData.update(curTemp, curUnits);
    // console.log("updated weather data" + curTemp + curUnits);
});

// Set units to the country default.  Only the US, Bahamas, Belize, Cayman Is., and Palau
// use Imperial units. Everywhere else uses metric. Called from AJAX handler when page
// is first loaded.  See also click handler that toggles units (celsius vs. fahrenheit).
function getDefaultTempUnits(countryCode) {
    var holdouts = ['US', 'BS', 'BZ', 'KY', 'PW'];
    return holdouts.indexOf(countryCode) > -1
                ? 'imperial'
                : 'metric';
}

function stuffDescription(imageUrl, description) {
    // console.log('in stuffDescription; image is ', imageUrl, 'description is ', description)
    $('#weatherIcon').html(
        '<img src="' + imageUrl + '" alt="weather icon"' + 'width="224"' + '>'
    );
    
    $('#weatherDescription').html(
       '<p>' + description + '</p>'
    );
}

$(document).ready(function() {
    /* for testing internal mechanics, comment this out & uncomment the following scaffold */
    $.getJSON('http://ip-api.com/json',
              function(loc) {
                  // where are we?
                  // console.log('in getJSON location callback func:', loc);
                  // stuff city, etc. into DOM
                  $('#location').html(loc.city + ', ' + loc.regionName + ' (' + loc.countryCode + ')');
                  // what's the weather like there?
                  var myWxApiKey = "8785123613d1f26ee68fcf17a08b6c33";
                  var localUnits = getDefaultTempUnits(loc.countryCode);
                  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                                loc.lat + '&lon=' + loc.lon + '&units=' + localUnits + '&APPID=' + myWxApiKey;
                  // console.log("wx api url:", url);
                  $.getJSON(url,
                            function (wx) {
                                // console.log('in getJSON weather callback func:', wx);
                                // temperature
                                var curTemperature = wx.main.temp.toFixed(0)
                                stuffTemperature(curTemperature, localUnits);
                                // icon for weather type + text description from API
                                var wxDescriptor = mapWxToIconAndDescr(wx);
                                stuffDescription(wxDescriptor.imageUrl, wxDescriptor.description);
                                savedData = new WeatherData().update(curTemperature, localUnits);
                                // console.log("temperature string:", temperature);
                            },
                            'jsonp'); // getJSON openweathermap
              },
              'jsonp'); // getJSON ip-api
    /* for testing internal mechanics, comment this out & uncomment the following scaffold */

    // alternative scaffold for testing -------------------------------------------------------
    //$('#location').html('Dubai' + ', ' + 'Emirate of Dubai' + ' (' + 'UAE' + ')');
    //
    //var curUnits = 'metric',
    //    curTemp  = 30.0.toFixed(0);
    //stuffTemperature(curTemp, curUnits);
    //
    //// need to fake up an object to test icon and description
    //function fakeWx() {
    //  var innerWx = {
    //    description: "thunderstorm",
    //    id: 200
    //  };
    //  var fakeWx = {
    //    weather: []
    //  };
    //  fakeWx.weather[0] = innerWx; // could we use an initializer?
    //  return fakeWx;
    //}
    //
    //var wx = fakeWx();
    //// console.log('fakeWx is ', fakeWx);
    //var wxDescriptor = mapWxToIconAndDescr(wx);
    //stuffDescription(wxDescriptor.imageUrl, wxDescriptor.description);
    //
    //// savedData = new WeatherData(curTemp, curUnits);
    //savedData = new WeatherData().update(curTemp, curUnits);
    //// console.log("saved Data = ", savedData);
    // end of alternative scaffold for testing -------------------------------------------------
    
    $('#dateString').html(formatCurrentDateTime());
})

// ---- formatDateTime ------------------------
// Format user's local time according to local conventions (hopefully - toLocalTimeString is browser-dependent)

function formatCurrentDateTime() {
    // Timestamp from API seems to be GMT, which the JS Date object handles
    var dayName = ['Sunday', 'Monday', 'Tuesday', 
                  'Wednesday', 'Thursday', 'Friday', 'Saturday'];   
    var localNow = new Date(),
        dayString = dayName[ localNow.getDay() ],
        localTime = localNow.toLocaleTimeString();
    // console.log("in formatCurrentDateTime", dayString, localTime);
    return 'as of ' + dayString + ' ' + localTime;
}

// ---- mapWxToIconAndDescr ------------------------
//
// Extract weather ID (condition code) and text description from
// weather object returned by OpenWeatherMap.org API.
// Map the condition code to a weather type and corresponding icon.
// Return the icon url and the description.

function mapWxToIconAndDescr(wxAPIreturn) {
    // note we are not handling day vs. night (wrt icons)
    var descr = wxAPIreturn.weather[0].description;
    var iconUrl = "";
    var coarseWeatherCode = Math.floor(wxAPIreturn.weather[0].id / 100);
    
    switch (coarseWeatherCode) {
        case 2:
            iconUrl = './weatherIcons/thunderstorm.png';
            break;
        case 3: // drizzle
        case 5: // rain
            iconUrl = './weatherIcons/rain.png';
            break;
        case 6:
            iconUrl = './weatherIcons/snow.png';
            break;
        case 7:
            iconUrl = './weatherIcons/fog.png';
            break;
        case 8: // clear or cloudy - no precip or fog
            var subID = wxAPIreturn.weather[0].id % 100;
            if (subID == 0) {
                iconUrl = './weatherIcons/sunny.png';
            }
            else if (subID == 4) {
                iconUrl = './weatherIcons/overcast.png';
            }
            else {
                iconUrl = './weatherIcons/partly_cloudy.png';
            }
            // alert("clear or cloudy - icon is " + iconUrl);
            break;
        case 9: // breezy to extreme weather, hurricane
        default:
            iconUrl = './weatherIcons/questionmark.png';
            break;
    }
    // console.log("in mapWxToIconAndDescr - imageURL =", iconUrl);
    
    var result = {
      description: descr,
      imageUrl: iconUrl
    };
    return result;
}

// eof













