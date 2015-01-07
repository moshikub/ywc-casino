// Prevent button spamming

var isButtonPressed = false;

// Master function that is called by the button
// Checks if we've pressed a button
// Set button to pressed
// Creates variable for the type of dice based off diceID parameter
// Creates variable for the max number based off diceID parameter
// Adds the spinPoly class
// Runs showSide once spinPoly is done animating

var masterRoller = function(diceID,char) {
    if (isButtonPressed === false) {
    isButtonPressed = true;
    shapeID = "shape" + diceID;
    animationID = "animation" + diceID;
    maxNumber = diceID.substring(diceID.indexOf('D')+1);
    document.getElementById(shapeID).classList.add(animationID);
    var audio = $("#effect")[0];
    audio.play();
    document.getElementById(shapeID).addEventListener('webkitAnimationEnd', function(){showSide(char);}, false);
    }
};

// Function that determines which side of the dice to show
// Removes spinPoly so the object only has one class (face)
// Creates variable based on object's current class (face)
// Runs randomRoll to get random number
// Creates variable for face to be shown
// Removes object's current class (face)
// Adds new class based off the roll (currently showing face)
// Resets our button so process can be repeated

var showSide = function(char) {
    console.log(char);
    document.getElementById(shapeID).classList.remove(animationID);
    currentClass = document.getElementById(shapeID).className;
    if( char==120 || char==99 || char == 118) randomRoll(1,3);
    else if(char==47 || char==122 ||char==98 || char==110) random=4;
    else if(char==109 || char==44 || char==46 ) randomRoll(5,6);
    else randomRoll(1,6);
    sideID = "show-side" + random;
    document.getElementById(shapeID).classList.remove(currentClass);
    document.getElementById(shapeID).classList.add(sideID);
    isButtonPressed = false;
    // score = document.getElementById('shapeD6').getAttribute("class");
    score = parseInt($('#shapeD6').attr('class').slice(-1));
    if(score<4) $('#result').html("ตำ่");
    else if(score>4) $('#result').html("สูง");
    else $('#result').html("กลาง");
}

// Function to randomly select number

var randomRoll = function(min, max) {
    random = Math.floor(Math.random()*(max-min+1)+min);
};




