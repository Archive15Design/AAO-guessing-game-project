// readline import
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// questions as variables for easy changing
const firstPrompt = "Guess a number: ";
const wrongAnswer = "Guess again: ";

// variable initialization
let secretNumber = 0;
let turnLimit = 5;
let min = 0;
let max = 0;
// calculate secret number using Math.Random
const getSecretNumber = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// prompt to provide range of secret number
const askRange = function(){
    rl.question("Give me the max number: ", (answer) => {
        max = Number(answer);
        rl.question("Give me the min number: ", (answer2 => {
            min = answer2;
            console.log("Thank you! Let's play!")
            secretNumber = getSecretNumber(min, max);
            askGuess();
        }))
    })
}

// handles initial promt for guess
const askGuess = function(){
    rl.question(firstPrompt, (answer) => {
        const result = guessCheck(answer);
        if (result === true){
            rl.close();
            victoryScreen();
        } else {
            console.log("-------------");
            console.log(`${turnLimit} turns left!`);
            askGuessAgain();
        }
    });
}

// handles prompts for subsequent guesses when given wrong answer
const askGuessAgain = function(){
    rl.question(wrongAnswer, (answer) => {
        const result = guessCheck(answer);
        turnLimit--;

        if (result === true){
            rl.close();
            victoryScreen();
        } else if (turnLimit === 0){
            rl.close();
            console.log("Out of turns! You lose!");
        }
         else {
            console.log("-------------");
            console.log(`${turnLimit} turns left!`);
            askGuessAgain();
        }
    });
}
// check if guess is correct, log hint and return bool value
const guessCheck = function(numStr){
    const num = Number(numStr);

    if (num > secretNumber){
        console.log("Ohh! Too high!");
        return false;
    } else if (num < secretNumber){
        console.log("Ohh! Too low!");
        return false;
    } else {
        console.log("You got it!");
        return true;
    }
};
//ascii victory screen
const victoryScreen = function(){
    console.log("\n\
     _   ___     __               \n\
    | | / (_)___/ /____  ______ __\n\
    | |/ / / __/ __/ _ \/ __/ // /\n\
    |___/_/\__/\__/\___/_/  \_, / \n\
                           /___/  ");
}

// ------------- game start code below this line
console.log("Welcome! Try to guess a random number somewhere between two numbers you will tell me.");
console.log("If you guess wrong,I'll give you a hint if you should go higher or lower!");
console.log("But you only have five turns to do it! Good luck!!");
askRange();
