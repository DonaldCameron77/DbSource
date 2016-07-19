/***************************************************************
 *
 *  JavaScript file for Free Code Camp Simon Challenge
 *  Author: Donald Cameron
 *  Creation Date: June-July 2016
 */

// all local JS is within the following document ready function

$(document).ready(function() {
    
    console.log("waking up - in document ready func");
    
/************************* Utilities *************************/
    
    function assert(condition, message) {
        if (!condition) {
            console.log(message);
            alert(message); /* development only */
        }
    }
    
    
/******************* View 'object' and utils *******************/
    
    function flashCount(times, updateString) {
        // Use #count-display for normal color changes (start/stop, etc.),
        // and #count-display p for flashing.
        // flashes by dimming, then restoring current brightness.
        // Brightness values and id are hard-coded.
        // In terms of user perception, it's best if you have just
        // brightened the count display, OR that you can tolerate
        // a 250 ms delay before flashing starts
        
        console.log("in flashCount. Times is", times, "updateString is", updateString);
        var delayMs = 250, // milliseconds
            delayMult = 0; // tweak delay to simulate serialization of 
        for (var i = 1; i <= times; ++i) {
            setTimeout(function() {
                    $('#count-display p').addClass('dim-count');
                }, delayMs * ++delayMult);
            console.log("flash-display: dimming after", delayMs * delayMult);
            setTimeout(function() {
                    $('#count-display p').removeClass('dim-count');
                }, delayMs * ++delayMult);
            console.log("flashCount: brightening after", delayMs * delayMult);
        }
        if (updateString) {
            setTimeout(function() {
                    $('#count-display p').html('01');
                }, delayMs * delayMult + 1000); // fire 1 sec after last change
            console.log("flashCount: stuffing 01 after",
                        delayMs * delayMult + 1000);
        }
    }
    
    function View() {
        
        console.log("In View's constructor");
        
        // 'View' has no properties, as they're "owned" by the DOM.
        // 'View' exposes methods to reset the mutables,
        // and to update them during game state changes.
        
        /* constants */
        var DARKCOUNT = '#660a18',  // the inactive text color for display
            DARKLED   = '#460710';  // same as count display background color
        
        /* private methods */
        function darkenStrict() {
            $('#led-strict').css('background-color', DARKLED);
        }
        
        function brightenCount() {
            // TODO: animate this turning on action
            // $('#count-display p').css('color', 'red');
            $('#count-display').css('color', 'red');
        }
        
        function resetCount() { // set back to '--' and dim text color
            $('#count-display p').html('--');
            $('#count-display').css('color', DARKCOUNT); /* darken count display */
        }
        
        return {
            reset: function() { /* controller routine for setting switch to 'off' */
                // count display
                resetCount();
                // 'strict' LED
                darkenStrict();
                $('#switch').css('left', '4%');
            },
            on: function() {
                $('#switch').css('left', '50%');
                brightenCount();
            },
            start: function(isRestart) {
                console.log("In view.start - isRestart = ", isRestart);
                if (isRestart) {
                    $('#count-display p').html('--');
                }
                flashCount(2, '01'); // TODO: animate turning on (incl restart)
            },
            updateStrict: function(strict) {
                // update LED to new value of strict
                console.log("In View::updateStrict() ... new value is", strict );
                if (strict) {
                    $('#led-strict').css('background-color', 'red'); 
                }
                else {
                    darkenStrict();
                }
            },
            /*****************************************************************/
            // From here down are the View properties/functions associated with
            // game play.  This kinda sucks from an encapsulation perspective,
            // b/c the View stuff for in-game is mixed with the device control
            // functions above.  What's a better way that doesn't involve
            // multiple View objects (or should there be ViewDeviceCtrl and ViewPlayGame?
            updateCount: function(newCount) { // TODO: test this
                var prefix = newCount < 10 ? '0' : '';
                newCount = prefix + newCount.toString();
                $('#count-display p').html('newCount'); // quote this?  If not we could say
                //  $('#count-display p').html(prefix + newCount.toString());
            },
        }
    }
     
    // constant.  Do not remake this object, 
    // as it's functions only - no "data members"
    var view = new View();
      
/*********************** Game State ***********************/

    /* initial creation or reset make a new object */
    
    /* do we want fancy getter/setter pseudo-functions? */
    function GameState() {
        console.log("In GameState's constructor");
        // are these gonna be private? What about 'this?'
        this.on = false;
        this.running = false;
        this.strict = false;
        this.count = undefined; // I think. Or should it be '--'?
        // we don't bother putting the game sequence array in
        // until the game actually starts
    }

    /* methods of GameState go here */

    var gameState = new GameState();
    
    function playGame() {
        // This will restart the game upon user error (NOT the same as pressing
        // the Start button). The only question is what does it do if the user wins?
        // It puts up the win display ("**" and fast flashing and pulsating sound),
        // and then returns (to the global exec. context, awaiting a click event).
        
        function playSequence() {
            // blah
        }
        
        function newSequence() {
            // glqh
        }
        gameState.running = true;
        gameState.count = 1;
        gameState.sequence = [];
        var /*const*/ maxRound = 20;
        for (var i = 1; i <= count; ++i) {
          //code
        }
    }

/**********************  Controller **********************/
    
    /* Like View, this is perpetual - it doesn't need to
     * be remade at on/off (as it has no persistent data) */
    
    /* for the on/off switch we have turnOn/turnOff, but
       for the start button we only have startUp, no
       shutdown.  That's because there is no way once
       the game is started to get back to the state where
       it has just been turned on.  Pressing start with the game
       running just resets count to 1 and restarts
    */
    function Controller() {
        console.log("In Controller's constructor");
        return {
            turnOn: function() {
                console.log("In Controller.turnOn()"); /* debug */
                gameState.on = true;
                view.on();
            },
            turnOff: function() {
                console.log("In Controller.turnOff()"); /* debug */
                gameState = new GameState();
                view.reset();
            },
            startUp: function() { /* controller routine for start button */
                // ok to call with game already started - it starts game over
                assert(gameState.on, "in Controller.startUp but GameState is off!!");
                console.log("In Controller.startUp()");
                var isRestart = gameState.running;
                view.start(isRestart);
                playGame(); // does it care if it's a restart?
                // do we ever return from this? don't think so.
                // Game plays itself until there's another event.
            },
            toggleStrict: function() {
                assert(gameState.on, "in Controller.toggleStrict but GameState is off!!");
                console.log("In Controller.toggleStrict()");
                gameState.strict = !gameState.strict;
                view.updateStrict(gameState.strict);
            }
        }
    }
      
    console.log("About to call Controller's constructor");
    var controller = new Controller();
        
/****************** event handlers ******************/

    $('#strict-btn').click(function() {
        console.log('strict button clicked!');
        if (gameState.on) {
            controller.toggleStrict();
        }
    });
    
    $('#start-btn').click(function() {
        console.log('start button was clicked!');
        // start or restart (cf. gameState.running)
        if (gameState.on) {
            controller.startUp();
        }
    });
    
    $('#switch-slot').click(function() {
        console.log('on/off switch clicked!');
        if (gameState.on) {
            controller.turnOff();
        }
        else {
            controller.turnOn();
        }
    });
    
    $('#top-left').click(function() {
        alert('#top-left was clicked');
        console.log('#top-left was clicked');
    });
    
    $('#top-right').click(function() {
        alert('#top-left was clicked');
        console.log('#top-left was clicked');
    });
    
    $('#bottom-right').click(function() {
        alert('#top-left was clicked');
        console.log('#top-left was clicked');
    });
    
    $('#bottom-left').click(function() {
        alert('#top-left was clicked');
        console.log('#top-left was clicked');
    });
    
});