// Hangman game
// Globals
var chosenWord;
var correctGuesses = 0;
var wins = 0;
var losses = 0;

var Hangman = {

  films: ["It's a Wonderful Life", "Raider's of the Lost Arc", "Star Wars", "Citizen Kane",
    "Full Metal Jacket", "Clockwork Orange", "Titanic", "The Godfather", "Forrest Gump",
    "Taxi Driver", "Avatar", "2001: A Space Odyssey", "The Lion King", "Back to the Future",
    "Rocky", "Pulp Fiction", "The Matrix", "Jaws", "Jurassic Park", "Airplane!", "Braveheart"],
  stickFig:["assets/images/hangman-imgs/Hangman-0.png", "assets/images/hangman-imgs/Hangman-1.png", "assets/images/hangman-imgs/Hangman-2.png", "assets/images/hangman-imgs/Hangman-3.png", "assets/images/hangman-imgs/Hangman-4.png", "assets/images/hangman-imgs/Hangman-5.png", "assets/images/hangman-imgs/Hangman-6.png"],
  wordChoice: function () {
    return this.films[Math.floor(Math.random() * this.films.length)]
  },
  displayArray: [],
  wrongGuesses: [],
  totalLetters: 0,
  prepWord: function (word) {
    this.totalLetters = 0;
    for (var i = 0; i < word.length; i++) {
      if (/^[a-zA-Z\s]*$/.test(word.charAt(i))) {
        if (word.charAt(i) == ' ') {
          this.displayArray.push('&nbsp;');
        } else {
          this.displayArray.push('_');
          this.totalLetters++;
        }
      } else {
        this.displayArray.push(word.charAt(i));
      }
    }
  },
  printArray: function (targetTag, array) {
    $(targetTag).html(array.join(" "));
  },
  resetGame: function () {
    this.wrongGuesses = [];
    this.displayArray = [];
    $("#hangman-image").attr("src", Hangman.stickFig[0]);
  }
};

function resetAll() {
  Hangman.resetGame();
  correctGuesses = 0;
}

function newWord() {
  chosenWord = Hangman.wordChoice();
  Hangman.prepWord(chosenWord);
  Hangman.printArray("#tried-array", Hangman.wrongGuesses);
  Hangman.printArray("#word-array", Hangman.displayArray);
  $("#hangman-image").attr("src", Hangman.stickFig[0]);
}

$(document).ready(function () {

  $("#play").on('click', function () {

    // Reset whole game
    resetAll();
    newWord();
  });

  $(document).on('keyup', function () {

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    var letterIndex = chosenWord.toLowerCase().indexOf(userInput);
    var updated = false;


    if ((letterIndex < 0) && (Hangman.wrongGuesses.indexOf(userInput.toUpperCase()) == -1)) {
      Hangman.wrongGuesses.push(userInput.toUpperCase());
      Hangman.printArray("#tried-array", Hangman.wrongGuesses);
      $("#hangman-image").attr("src", Hangman.stickFig[Hangman.wrongGuesses.length]);

      if (Hangman.wrongGuesses.length > 5) {

        // Game over condition code goes here

        losses++;
        $("#loss-counter").html(losses);
        losses = 0;
        resetAll();
        newWord();

        // Needs to stop game show or loss artifact

      }


    } else {
      for (var i = 0; i < chosenWord.length; i++) {
        if ((chosenWord[i].toLowerCase() == userInput.toLowerCase()) && (Hangman.displayArray[i] != chosenWord[i])) {
          Hangman.displayArray[i] = chosenWord[i];
          correctGuesses++;
          updated = true;
        }
      }
      if (correctGuesses == Hangman.totalLetters) {

        // Win Condition Code goes here.

        wins++;
        $("#win-counter").html(wins);
        correctGuesses = 0;

        //Add code here to reward the player i.e. show graphic etc

        resetAll();
        newWord();

        //Needs to display win and restart game.

      }

    }
    if (updated === true) {
      Hangman.printArray("#word-array", Hangman.displayArray);
    }
  });
});