//
// JavaScript for the J-Man challenge
//
// Author & Creator: Donald Cameron
//
// Simple Light 'n' Sound touch game for toddlers
//

// These are data structures we can index by IDs.
// All game color values must be accessed via these maps!  Nothing inline please!

// the bright blue seems dimmer, so we are going to tone down the other colors
//var mapDim = {
//    '#top-left':    '#00a',
//    '#top-right':   '#0a0',
//    '#bottom-right':'#a00',
//    '#bottom-left': '#aa0'
//};
var mapDim = {
    '#top-left':    '#00a',
    '#top-right':   '#090',
    '#bottom-right':'#900',
    '#bottom-left': '#990'
};

var mapBright = {
    '#top-left':    '#00f',
    '#top-right':   '#00c800',
    '#bottom-right':'#d80000',
    '#bottom-left': '#c8c800'
};

var gameId = ['#top-left', '#top-right', '#bottom-right', '#bottom-left'];

/* might explore a game-related sounds solution like Howler.js, as
 * there is a noticeable time lag before sounds play on Safari */
var sounds = {
    '#top-left':    'sounds/klaxon_ahooga.wav',
    '#top-right':   'sounds/burp2_x.wav',
    '#bottom-right':'sounds/cash_register2.wav',
    '#bottom-left': 'sounds/hit_with_frying_pan_y.wav'
}

function resetBrightness() {
    // reset to default dimmer values
    // alert('resetBrightness() called');
    //for (var i = 0; i < gameId.length; ++i) {
    //    $(gameId[i]).css('background-color', mapDim[gameId[i]]);
    //}
    gameId.forEach(function(id) { $(id).css('background-color', mapDim[id])});
}

function colorBlockClick(id) {
    console.log(this);
    // alert("click function called with " + id);
    resetBrightness();
    // alert('setting ' + id + ' background-color to ' + mapBright[id]);
    
    var sound = new Audio(sounds[id]);
    sound.play();
    
    // brighten selected block 3 times and leave bright
    var delayMs = 200; // delay in milliseconds
    $(id).css('background-color', mapBright[id]);
    
    // For my next trick: you can't animate color, but jQuery UI has an extension for that. ... Let's try it.
    // We use delay for the timing, and set animation duration of 0 as per Felix King:
    //    http://stackoverflow.com/questions/4509222/jquery-delay-altering-css
    for (var i = 1; i <= 2; ++i) {
        $(id).delay(delayMs).animate({'background-color': mapDim[id]}, 0);
        $(id).delay(delayMs).animate({'background-color': mapBright[id]}, 0);
    }
    
    //for (var i = 1; i <= 2; ++i) {
    //    // alert("dimming " + id);
    //    setTimeout(function() { $(id).delay(delayMs).css('background-color', mapDim[id]); });
    //    // alert("brightening " + id);
    //    setTimeout(function() { $(id).delay(delayMs).css('background-color', mapBright[id]); });
    //}

    //for (var i = 1; i <= 2; ++i) {
    //    alert("dimming " + id);
    //    setTimeout(function() { $(id).css('background-color', mapDim[id]); }, delayMs);
    //    alert("brightening " + id);
    //    setTimeout(function() { $(id).css('background-color', mapBright[id]); }, delayMs);
    //}
    
    // @#$%^ it doesn't work
    //for (var i = 1; i <= 2; ++i) {
    //    // alert("dimming " + id);
    //    $(id).delay(delayMs).css('background-color', mapDim[id]);
    //    // alert("brightening " + id);
    //    $(id).delay(delayMs).css('background-color', mapBright[id]);
    //}
    
    // try this
    // no don't bother - no workee
    //$(id).css('text-decoration', 'blink');
    //$(id).delay(2000).css('text-decoration', 'none');
    
    // delay won't work with css properties per http://stackoverflow.com/questions/4411644/jquery-change-css-after-a-certain-amount-of-time
    // So try setTimeout("js statement", milliseconds);
    
}

$(document).ready(function() {
    // alert('ready function called');
    resetBrightness();
    /* sidestep loop closure problem with map ... though perhaps [].forEach is more semantic */
    gameId.map(function(id) {
        // alert('map function called with id = ' + id);
        $(id).click(function() {colorBlockClick(id);});
    });
});
  
