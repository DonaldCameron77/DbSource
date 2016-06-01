'use strict';

/* "modules" in order of appearance in this file
 *  - AJAX-related stuff
 *  - formatting utlities
 */

// ************** Set up for and do AJAX **************

// TODO: what is the valid symbol format? AFAIK for US markets it can be 5 or fewer letters.
// Should we filter out symbols with special characters or other junk,
// or just let the API return an error?  Except that it doesn't seem to  return something
// that our 'error' property can catch. So we must diagnose errors in the success property.

function quoteAjax(symbolId) {
    // API at http://dev.markitondemand.com/#stockquote
   
    // alert("about to get quote from HTML element with ID " + symbolId);
    
    var symbol = $(symbolId).val();
    if (symbol == "") {
      alert("Error - please enter a ticker symbol");
      console.log("Ticker symbol string was empty");
      return false; /* return value ignored b/c there is no form and no further processing such as POST */
    }
    $.ajax({
        dataType: 'jsonp',
        url: 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol,
        success: function(data) {
            // console.log(data); // debug
            // console.log(data.Name, data.Message); // debug
            if (data.Name === undefined) { // API not returning error .. instead Name is undef, and Message string is set.
                // TODO: (?) clear the data currently displayed (if any)
                alert("Error - the symbol you entered was invalid");
                console.log("Invalid symbol entered - message was: ", data.Message);
                return false;
            }
            $('h1').html(formatName(data.Name));
            $('#curQuote').html(data.LastPrice.toFixed(2));
            $('#curChange').html(data.Change.toFixed(2) + ' ( ' + data.ChangePercent.toFixed(2) + '%)');
            $('#curRange').html(data.Low.toFixed(2) + ' - ' + data.High.toFixed(2));
            $('#curOpen').html(data.Open.toFixed(2));
            $('#curVolume').html(formatNumber(data.Volume));
            $('#curMarketCap').html(formatNumber(data.MarketCap));
            $('#curDateTime').html(formatDateTime(data.Timestamp));
            
        },
        error: function(data) { alert(data); } // API not returning errors, it appears ... still, it's safer to have this
                                               // if they change their mind.  Errors currently diagnosed/patched above.
    });
}

// ************** Utilities go here ****************

/* ---- formatName --------------------------
    Reformat company name. Note the API we're using
    returns the name in title case on a single line.  The widget we're making
    uppercases the string and inserts a newline before a trailing 'INC', 'CORP', etc.
    We are going to skip this last step if the string is short.

    Steps:
    1. Uppercase it.
    
    2. Is the total name "short?" (Fewer than 10 chars after stripping).
        If so, exercise creative license and return as is (after uppercasing).

    3. Find the rightmost blank.  If there isn't one, return.

    4. If the text to the right of the blank is one of
        INC
        CORP
        CO
        LLC
        GMBH
      then replace the blank before it with a line break tag (<br>);
      TODO: is this list complete?  Seems unlikely. Are we only expecting domestic suffixes?
*/

function formatName(name)
{
    function replaceCharAt(str, index, strToInsert) {
        // hard coded to replace a single character with the string strToInsert
        // Isn't there a standard JS library call to do this?
        return str.substr(0, index) + strToInsert + str.substr(index + 1);
    }

    /* const */ var businessTypenames = ['CO', 'INC', 'CORP', 'LLC', 'GMBH'];

    var result = name.toUpperCase();
    if (result.length < 10) {
        return result;
    }
    var rightBlankIndex = result.lastIndexOf(' ');
    if (rightBlankIndex === -1) { // No blank in string
        return result;
    }
    if (businessTypenames.indexOf(result.substr(rightBlankIndex + 1)) !== -1) {
        result = replaceCharAt(result, rightBlankIndex, '<br>');
    }
    return result;
}

/* ---- formatDateTime ------------------------
 * Format the date/time line for the stock widget, giving the time of the quote adjusted
 * to local time.  Omit the day unless it's different than the day associated with the
 * quote (i.e, it's being requested on a weekend, holiday, or the morning before the
 * exchange has opened).  So e.g. you would see either 1:59:00 PM or Friday 1:59:00 PM
 */

function formatDateTime(quoteDateTime) {
    // Timestamp from API seems to be GMT, which the JS Date object handles
    var dayName = ['Sunday', 'Monday', 'Tuesday', 
                     'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // adjust to local time
    var localQuoteDateTime = new Date(quoteDateTime);
    // - extract the time portion (12 hr format) in the form HH:MM:SS [A|P]M
    var localQuoteTime = localQuoteDateTime.toLocaleTimeString();
    // - Do we need to add the day? N.b. using day from the quote locale rather than local day
    var localNow = new Date();
    var currentDay = localNow.getDay(), // could eliminate these temp vars if desired
        quoteDay = localQuoteDateTime.getDay();
    var dayString = currentDay === quoteDay ? ""
                                            : dayName[quoteDay] + " ";

    return "As of " + dayString + localQuoteTime;
}

/* ---- formatNumber ----------------------------------
 * For things like market cap where you want millions and billions of the form 3.7M or 36.1B.
 * Contains a hack that will need revision if you want to handle trillions and above the same way
 */ 

// If number < 1 million, output all digits with commas (or local equivalent) as appropriate.
// Otherwise, round to the desired form, e.g., 103.5M, 6.0B.  Force the tenths place to appear to
// clarify the precision.
// TODO: friendlier output for trillions and above.  Would need loop or recursion else code will smell.

function formatNumber(x) {
    /* const */
    var thousand = 1000,
        million = 1000000,
        billion = 1000000000;

    if (x < million) {
        return x.toLocaleString();
    }

    if (x < billion) {
        var str = (x / million).toFixed(1);
        // hack to handle, e.g., 999M where toFixed(1) gives 1000.0M
        // and you really want 1.0B.  Fall thru for those cases.
        if (Number(str) < 1000) {
            return str + 'M';
        }
    }

    return (x / billion).toFixed(1) + 'B';
}

// eof
