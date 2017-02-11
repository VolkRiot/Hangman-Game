// Hangman game

var Hangman = {

  films: ["It's a Wonderful Life", "Raider's of the Lost Arc", "Star Wars", "Citizen Kane",
    "Full Metal Jacket", "Clockwork Orange", "Titanic", "The Godfather", "Forrest Gump",
    "Taxi Driver", "Avatar", "2001: A Space Odyssey", "The Lion King", "Back to the Future",
    "Rocky", "Pulp Fiction", "The Matrix", "Jaws", "Jurassic Park", "Airplane!", "Braveheart"],

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
  }
};



// Begins actual document run

$(document).ready(function () {

  var chosenWord;
  var correctGuesses = 0;
  var wins = 0;
  var losses = 0;

  $("#play").on('click', function () {

    chosenWord = Hangman.wordChoice();
    correctGuesses = 0;
    Hangman.displayArray = [];
    Hangman.wrongGuesses = [];

    Hangman.prepWord(chosenWord);
    Hangman.printArray("#tried-array", Hangman.wrongGuesses);
    Hangman.printArray("#word-array", Hangman.displayArray);
  });

  $(document).on('keyup', function () {

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    var letterIndex = chosenWord.toLowerCase().indexOf(userInput);
    var updated = false;


    if ((letterIndex < 0) && (Hangman.wrongGuesses.indexOf(userInput.toUpperCase()) == -1)) {
      Hangman.wrongGuesses.push(userInput.toUpperCase());
      Hangman.printArray("#tried-array", Hangman.wrongGuesses);

      if (Hangman.wrongGuesses.length > 5) {

        // Ends condition code goes here
        losses++;
        $("#loss-counter").html(losses);
        //Hangman.reset();

      }


    } else {
      for (var i = 0; i < chosenWord.length; i++) {
        if ((chosenWord[i].toLowerCase() == userInput.toLowerCase()) && (Hangman.displayArray[i] != chosenWord[i])) {
          Hangman.displayArray[i] = chosenWord[i];
          correctGuesses++;
          console.log("Correct Guesses " + correctGuesses);
          updated = true;
        }
      }
      if (correctGuesses == Hangman.totalLetters) {

        // Win Condition Code goes here.
        console.log("Total Letters is " + Hangman.totalLetters);
        wins++;
        $("#win-counter").html(wins);
        correctGuesses = 0;
        //Hangman.reset()
      }

    }
    if (updated === true) {
      Hangman.printArray("#word-array", Hangman.displayArray);
    }
  });
});