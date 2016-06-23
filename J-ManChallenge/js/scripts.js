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
    // alert('resetBrightness() called'); // debug
    //for (var i = 0; i < gameId.length; ++i) {
    //    $(gameId[i]).css('background-color', mapDim[gameId[i]]);
    //}
    gameId.forEach(function(id) { $(id).css('background-color', mapDim[id])});
}

function colorBlockClick(id) {
    console.log(this);
    // alert("click function called with " + id); // debug
    resetBrightness();
    // alert('setting ' + id + ' background-color to ' + mapBright[id]); // debug
    
    var sound = new Audio(sounds[id]);
    sound.play();
    
    // brighten selected block 3 times and leave bright
    var delayMs = 200; // delay in milliseconds
    $(id).css('background-color', mapBright[id]);
    
    // Using delay directly won't work - it doesn't work on the css() command.  Nor,
    // for reasons unknown, could I get setTimeout to work.
    // But there's this, though it requires jQueryUI:
    // You can't animate color, but jQuery UI has an extension for that. ... Let's try it.
    // We use delay for the timing, and set animation duration of 0 as per Felix King:
    //    http://stackoverflow.com/questions/4509222/jquery-delay-altering-css
    for (var i = 1; i <= 2; ++i) {
        $(id).delay(delayMs).animate({'background-color': mapDim[id]}, 0);
        $(id).delay(delayMs).animate({'background-color': mapBright[id]}, 0);
    }    
}

$(document).ready(function() {
    resetBrightness();
    /* sidestep loop closure problem with map or forEach */
    gameId.forEach(function(id) {
        // alert('forEach/map function called with id = ' + id); // debug
        $(id).click(function() {colorBlockClick(id);});
    });
});
  
