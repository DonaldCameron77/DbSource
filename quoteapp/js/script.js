/*
 *  JavaScript support for Snark-O-Matic portfolio site.
 *  
 *    Created: 2016-02-11
 *    Author:  Donald Cameron
 *    Purpose: Free Code Camp random quote generator challenge; personal portfolio item
 *    Tech/Features:
 *      - client-side only
 *      - displays a random quote
 *      - 'tame' level uses API call from JavaScript (currently unimplemented)
 *      - 'famous' and 'nsfw' levels randomly index into built in array of quote objects
 *      - requires jQuery (for convenience)
 */


var quoteArr = [
{ source: "Dorothy Parker",
  text: 'A telegram sent to the detested wife of a friend after she gave birth: "Good work, Mary.  We all knew you had it in you."' },
{ source: "Dorothy Parker",
  text: "If you want to know what God thinks of money, just look at the people he gave it to." },
{ source: "Dorothy Parker",
  text: "I don't know much about being a millionaire, but I'll bet I'd be darling at it." },
{ source: "Dorothy Parker",
  text: "The best way to keep children at home is to make the home atmosphere pleasant, and let the air out of the tires." },
{ source: "Dorothy Parker",
  text: "A hangover is the wrath of grapes." },
{ source: "Dorothy Parker",
  text: "I'd rather have a bottle in front of me than a frontal lobotomy." },
{ source: "Dorothy Parker",
  text: "The two most beautiful words in the English language are 'cheque enclosed.'" },
{ source: "Dorothy Parker, offended by a producer's meager offer for a script",
  text: "You can’t take it with you, and even if you did, it would probably melt." },
{ source: "Dorothy Parker, on being told of Calvin Coolidge's death (Coolidge was well-known to be a man of few words)",
  text: "How do they know?" },
{ source: "Winston Churchill",
  text: "I may be drunk, Miss, but in the morning I will be sober and you will still be ugly." },
{ source: "Winston Churchill",
  text: "The best argument against democracy is a five-minute conversation with the average voter." },
{ source: "Winston Churchill",
  text: "Ending a sentence with a preposition is something up with which I will not put." },
{ source: "Mark Twain",
  text: "I did not attend his funeral, but I sent a nice letter saying I approved of it." },
{ source: "Oscar Wilde",
  text: "Some cause happiness wherever they go; others whenever they go." },
{ source: "Idries Shah",
  text: "You say this person has a wonderful presence; that I don't know. I do know he has a perfectly delightful absence." },
{ source: "Groucho Marx",
  text: "I've had a perfectly wonderful evening, but this wasn't it." },
{ source: "Winston Churchill, on British Labour politician Stafford Cripps",
  text: "He has all the virtues I dislike and none of the vices I admire." },
{ source: "P.G. Wodehouse",
  text: "He had just about enough intelligence to open his mouth when he wanted to eat, but certainly no more." },
{ source: "Mae West",
  text: "His mother should have thrown him away and kept the stork." },
{ source: "Clarence Darrow",
  text: "I have never killed anyone, but I have read some obituary notices with great satisfaction." },
{ source: "Moses Hadas",
  text: "Thank you for sending me a copy of your book. I'll waste no time reading it." },
{ source: "Billy Wilder",
  text: "He has Van Gogh’s ear for music." },
{ source: "Stephen Bishop",
  text: "I feel so miserable without you; it’s almost like having you here." },
{ source: "Mark Twain",
  text: "Reader, suppose you were an idiot. Now suppose you were a member of Congress. But I repeat myself." },
{ source: "Will Rogers",
  text: "A fool and his money are soon elected." },
{ source: "Mark Twain",
  text: "Politicians and diapers must be changed often, and for the same reason." },
{ source: "Groucho Marx",
  text: "I never forget a face, but in your case I'll make an exception." },
{ source: "Marilyn Monroe",
  text: "Women who seek to be equal with men lack ambition." },
{ source: "Cher",
  text: "The problem with most women is that they get all excited about nothing, then marry him." },
{ source: "Oscar Wilde",
  text:   "Be yourself; everyone else is already taken." },
{ source: "Jeremy Clarkson",
  text: "Speed has never killed anyone - suddenly becoming stationary, that's what gets you." },
{ source: "Irvin S. Cobb",
  text: "I've just learned about his illness.  Let's hope it's nothing trivial." },
{ source: "John Bright",
  text: "He is a self-made man, and worships his creator." },
{ source: "Rodney Dangerfield",
  text: 'A girl phoned me and said, "Come on over. There\'s nobody home." I went over ... there was nobody home!' },
{ source: "Rodney Dangerfield",
  text: "I was so ugly, my father carried around the picture of a kid that came with his wallet. " },
{ source: "Rodney Dangerfield",
  text: "My uncle's dying wish was to have me sitting on his lap. He was in the electric chair." },
{ source: "Joan Rivers",
  text: "I don't exercise. If God had wanted me to bend over, he would have put diamonds on the floor." },
{ source: "Joan Rivers",
  text: "I hate housework! You make the beds, you do the dishes and six months later you have to start all over again." },
{ source: "Joan Rivers (also attributed to Rodney Dangerfield)",
  text: "I knew I was an unwanted baby when I saw that my bath toys were a toaster and a radio." },
{ source: "Joan Rivers",
  text: "My husband wanted to be cremated. I told him I'd scatter his ashes at Neiman Marcus. That way, I'd visit him every day." },
{ source: "Joan Rivers",
  text: "The fun of working on the road means stealing from hotels. I've been doing it for so long, I have a set of towels from the Ark." },
{ source: "C.S.Lewis",
  text: "She's the sort of woman who lives for others.  You can tell the others by their hunted expressions." },
{ source: "Ambrose Bierce",
  text: "Belladonna, n.: In Italian a beautiful lady; in English a deadly poison. An example of the identity of the two tongues." },
{ source: "Ambrose Bierce",
  text: "Love: A temporary insanity curable by marriage. "},
{ source: "Rodney Dangerfield",
  text: "Once I asked a cop if he would help me find my parents. He said, \"I dunno, kid; there's so many places they can hide!\"" },
{ source: "Dorothy Parker",
  text: "Ducking for apples - change one letter and it's the story of my life." },
{ source: "Dorothy Parker",
  text: "Brevity is the soul of lingerie." },
{ source: "Dorothy Parker",
  text: "All I need is room enough to lay a hat and a few friends." },
{ source: "Joan Rivers",
  text: "I have no sex appeal. Peeping Toms look at my window and pull down the shade. My gynecologist examines me by telephone." },
{ source: "Dorothy Parker",
  text: "That woman speaks eighteen languages, and can't say 'No' in any of them." },
{ source: "Dorothy Parker",
  text: "Take me or leave me; or, as is the usual order of things, both." },
{ source: "Max Reger, responding to a critic",
  text: "I am seated in the smallest room in the house, with your review before me. Shortly it will be behind me." },
{ source: "Seth Myers",
  text: "Hugh Hefner: I just don't know where I'll find anyone else like her ever again. Friend: Have you checked your house?" },
{ source: "Rodney Dangerfield",
  text: "I was such an ugly baby that my mother never breast-fed me. She told me that she only liked me as a friend." },
{ source: "Voltaire, on his deathbed, when a priest told him to renounce Satan",
  text: "Now, now, my good man, this is no time for making enemies." },
  
  /* line of demarcation for unknown */
{ source: "UNKNOWN",
  text: "" },
/* unknown BELOW THIS LINE */
 
{ source: "unknown, via Reddit",
  text: "My wife backed into a Jaguar, but the left the owner a note on our bank statement so he knows not to bother calling." }, 
{ source: "@Missing_A on Twitter",
  text: "Just saw two homeless people kissing.  So I yelled at them: \"Get a box\"." },
{ source: "Mark Agee",
  text: "LIFE HACK: If you ask \"How much?\" when a guy introduces you to his wife your lady will stop dragging you to work parties" },
{ source: "@ClarkKant on Twitter",
  text: "\"RIP.\" - Christian tombstone ... \"BRB.\" - Buddhist tombstone." },
{ source: "@GoldenGateBlond on Twitter",
  text: "Had I known buying yogurt would cause my cashier to recount her epic battles with yeast infections, I'd have bought razor blades too." },
{ source: "Justin Valmassoi",
  text: "A robot perfectly programmed to mimic human intelligence and behavior gets a 3rd shift job at K-mart and spends its whole paycheck on beer." },
{ source: "@buckforitt on Twitter",
  text: "If iPhones had an \"LOL\" key and a \"send a boob pic\" key, hundreds of car accidents could be avoided.  It's like Apple doesn't even care." },
{ source: "Caprice Crane",
  text: "Any room can be a Panic Room if you run out of Xanax." },
{ source: "unknown, via Reddit",
  text: "How do Amish guys know if it's a romantic candlelit dinner, or just regular dinner?" },
{ source: "emergency-room-nurse.blogspot.com",
  text: "You can't fix stupid but you <em>can</em> sedate it." },
{ source: "unknown; found on Pinterest",
  text: "Oh sure, you're street smart ... Sesame Street smart." },
{ source: "unknown",
  text: "I'm sorry ... I didn't realize that you're an expert on my life and how I should live it.  Please continue while I take notes." },
{ source: "unknown, via Reddit",
  text: "My wife backed into a Jaguar, but the note she left was written on our bank statement so the owner knows not to bother calling." },
{ source: "unknown, via Reddit",
  text: "My wife suffers from chronic debilitating headaches. But enough about her ... back to drum practice." },
{ source: "unknown, via Twitter",
  text: "Writing well for Twitter requires a certain kind of wit.  I think I'm about half-way there." },
  { source: "Jelisa Castrodale",
  text: "I just yelled \"SHUT UP, I JUST GAVE YOU WATER\" at my Keurig, which perfectly illustrates why I will never have children." },
{ source: "John LeFevre (@gselevator)",
  text: "Give a man a fish, he eats for a day. Give a man a poisoned fish, he eats for the rest of his life." },
{ source: "@buckforitt on Twitter",
  text: "To keep up with my old high school friends, I don't use Facebook. I use a police scanner." },
{ source: "@jermHimself on Twitter",
  text: "My business card is just a crudely drawn picture of me borrowing money from you in the near future." },
{ source: "Rachel Callman",
  text: "If our first pets or childhood best friends ever want to hack our bank accounts, we're all screwed." },
{ source: "Jelisa Castrodale",
  text: "I just ate at a restaurant called Meat Liquor. Add a comma and you'll know exactly what my wedding registry will look like." },
{ source: "Justin Valmassoi",
  text: "\"More like Sauvignon Blackout!\" Cheryl laughed, although she would not remember doing so." },
{ source: "Emily Lallouz",
  text: "A fun joke to pull on your grandparents is to switch their LifeAlert with the garage door opener then just wait for the hijinx!" },
{ source: "@sortaBad on Twitter",
  text: "I'd be more excited about the prospect of Heaven if I wasn't dreading the awkward moment when God sneezes & I don't know what to say to Him." },
{ source: "Justin Valmassoi",
  text: "\"You can't take it with you\" into the afterlife, I guess, but you sure as hell CAN take it into your grave so your family can't have it." },
{ source: "@thedailydogfood on Twitter",
  text: "Just wanna send a shout out to my mother-in-law who has hit her ideal weight. 8 pounds, including the urn." },
  
{ source: "Caprice Crane",
  text: "Hey, guy I just saw flossing his teeth with his American Express card, are you seeing anyone?" },

{ source: "Nick Stadler",
  text: "Maury Povich is developing a new reality show for MTV.  It's called \"Six Teeth & Pregnant.\"" },

{ source: "@NeonWhisky on Twitter",
  text: "On a Saturday night, porn stars go to an office and do some admin." },

{ source: "Michael Saikin",
  text: "Why don't they have alcoholic milk? I thought there were whole businesses dedicated to making things \"the way mom used to\"." },

{ source: "@trevso_electric on Twitter",
  text: "Rosetta Stone's Vietnamese Level 1 pays for itself in the look on your manicurist's face when you go, \"I know what you said!\" in her language." },

{ source: "@SortaBad on Twitter",
  text: "I used to get sad listening to my wife cry herself to sleep at night. But then I bought a louder television." },

{ source: "@buck4itt on Twitter",
  text: "My wife said she's entered her \"comfort years\". It's that special time when the label on her dress goes from \"Size 6\" to \"Sleeps 6\"." },

{ source: "@Kim_pulsive on Twitter",
  text: "When I get a wedding announcement rather than an invite I like to respond by sending back a pic of me shopping but not buying them a gift." },

{ source: "JD Crowe on Twitter",
  text: "My wife's favorite position is the one where I lie very still wearing nothing but a toe tag and she starts dating again." },

{ source: "@shiraselko on Twitter",
  text: "I've done every single drug and had unprotected sex but I'm terrified of not cooking defrosted chicken in time." },

{ source: "@Elizabeastan on Twitter",
  text: "My boyfriend never likes to cuddle after sex. He usually just comes home to me afterwards." },

{ source: "@Elizabeastan on Twitter",
  text: "My best friend seems to know a lot about what my boyfriend is into sexually.  Being psychic must be weird for her." },

{ source: "Mark Agee",
  text: "A fun thing to comment on Facebook baby pictures is \"Cute! Reminds me of [insert name of last boyfriend before husband].\"" },

{ source: "Nick Stadler",
  text: "Did you hear about the emo kid who accidentally shaved himself while cutting?" },

{ source: "Jenny Wade",
  text: "It's not premarital sex if no one will marry you!" },

{ source: "@Elizabeastan on Twitter",
  text: "Do all video cameras constantly blink a red light when they're turned off? Or is just this guy's?" },

{ source: "@SortaBad on Twitter",
  text: "San Francisco International Airport is like the final, hardest level of the 'Gay or European?' game." },

{ source: "@OhNoSheTwitnt on Twitter",
  text: "But if we let gay people raise kids what's next? Letting inanimate objects raise kids? That's not MY America. [hands son an iPad]." },

{ source: "@SortaBad on Twitter",
  text: "Glad my car insurance company requires a 10 character password to log-in. Wouldn't want someone to hack in and pay my insurance bill." },

{ source: "@SortaBad on Twitter",
  text: "People complain about the NFL, but Ray Rice's career ended when he hit his wife, while Chris Brown is still performing at award shows." },

{ source: "@trevso_electric on Twitter",
  text: "Um, no offense Jennifer but I'm not going to consult a \"Somalian\" about the wine list at Per Se.  Somalia is a poor country with no wine." },

{ source: "@trevso_electric on Twitter",
  text: "Whatever \"pasto\" is, this Italian appetizer menu sure takes a strong stance against it." },

{ source: "Bristol Sweets",
  text: "What if you're in hell, and you're mad at someone ... where do you tell them to go?" },

{ source: "@buck4itt on Twitter",
  text: "Whenever I go to Disneyland and see a \"This attraction closed for maintenance\" sign, I'm reminded of the time my wife had a yeast infection." },

{ source: "@NickMotown on Twitter",
  text: "Just passed a river where a girl was shouting \"I can't swim! I can't swim!\" Well I can't use chopsticks but do you see me going on about it?" },

{ source: "Jamie Capria",
  text: "I just requested my credit score and it came back 707!  ... Whoops - I had the paper upside down; it actually says LOL." }
];

// it would be nice to encapsulate all this global stuff (and ensure inits are only done once!)

// per Pablo's answer at http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
var unknownPos = quoteArr.map(function(e) { return e.source; }).indexOf('UNKNOWN');

// demarcate the famous and unknown regions by their top and bottom indices, and note their lengths
var famousBottom = 0,
    famousTop    = unknownPos - 1,
    famousLength = famousTop + 1;
    
var unknownBottom = unknownPos + 1,
    unknownTop    = quoteArr.length - 1,
    unknownLength = unknownTop - unknownBottom;
    
// We might have used slicing but why copy stuff around?
// The formula for computing a random index of either (virtual) subarray is
//     Math.floor(Math.random() * (top - bottom + 1)) + bottom
// It would be nice to encapsulate this since we are needing it
// for two different ranges
// Note it might be better not to randomize, or to just randomize the starting position
// and then increment.

function randomIndex(bottom, top) {
    return Math.floor(Math.random() * (top - bottom + 1)) + bottom;
}

function displayQuote(quote) {
  // alert("in displayQuote(): quote is " + quote.text + " -- " + quote.source);
  $("#quote-text").html(quote.text);
  $("#quote-source").html('-- ' + quote.source); 
}

function setTweetLink(quote) {
  var tweetText = ("https://twitter.com/intent/tweet?text=" + quote.text + " -- " + quote.source);
  // alert("Tweet string: " + tweetText);
  $("#twitter-share-button").attr("href", tweetText);
}

function getQuote() {
    var quoteIndex = (snarkType == "famous"
                      ? randomIndex(famousBottom, famousTop)
                      : randomIndex(unknownBottom, unknownTop));
    // this shows quote to user
    displayQuote(quoteArr[quoteIndex]);  // show user the quote
    setTweetLink(quoteArr[quoteIndex]);  // set up link in case user tweets the quote 
}

// set initial value of quote
$(document).ready(function() {
  var initialQuote = { source: "SnarkBot 2000", text: "Into Each Day A Lot Of Rain Must Fall" };
  // alert("document ready func called: quote is " + initialQuote.text + " -- " + initialQuote.source);
  displayQuote(initialQuote);
  setTweetLink(initialQuote);
});

var snarkType = "famous"; // set default - corresponds to "checked" in the radio button group of index.html

function changeSnarkType(val) {
  if (val != "famous" && val != "unknown") {
    // alert("Changing snark type: internal error. Illegal value" + '"' + val + '"');
  }
  snarkType = val;
}

// eof

