// Hangman game
// Globals
var chosenWord;
var correctGuesses = 0;
var wins = 0;
var losses = 0;

var Hangman = {
  films: [{
    "title": "It's a Wonderful Life",
    "imgPath": "assets/images/moviePosters/itsawonderfullife.jpeg"
    },
    {
      "title": "Raider's of the Lost Arc",
      "imgPath": "assets/images/moviePosters/raidersofthelostarc.jpeg"
    },
    {
      "title": "Star Wars",
      "imgPath": "assets/images/moviePosters/starwars.jpg"
    },
    {
      "title": "Citizen Kane",
      "imgPath": "assets/images/moviePosters/citizenkane.jpeg"
    },
    {
      "title": "Full Metal Jacket",
      "imgPath": "assets/images/moviePosters/fullmetaljacket.jpeg"
    },
    {
      "title": "Clockwork Orange",
      "imgPath": "assets/images/moviePosters/clockworkorange.jpg"
    },
    {
      "title": "Titanic",
      "imgPath": "assets/images/moviePosters/titanic.jpeg"
    },
    {
      "title": "The Godfather",
      "imgPath": "assets/images/moviePosters/thegodfather.jpg"
    },
    {
      "title": "Forrest Gump" ,
      "imgPath": "assets/images/moviePosters/forrestgump.jpeg"
    },
    {
      "title": "Taxi Driver",
      "imgPath": "assets/images/moviePosters/taxidriver.jpeg"
    },
    {
      "title": "Avatar",
      "imgPath": "assets/images/moviePosters/avatar.jpeg"
    },
    {
      "title": "2001: A Space Odyssey",
      "imgPath": "assets/images/moviePosters/2001spaceoddysey.jpeg"
    },
    {
      "title": "The Lion King",
      "imgPath": "assets/images/moviePosters/lionking.jpeg"
    },
    {
      "title": "Back to the Future",
      "imgPath": "assets/images/moviePosters/backtothefuture.jpeg"
    },
    {
      "title": "Rocky",
      "imgPath": "assets/images/moviePosters/rocky.jpeg"
    },
    {
      "title": "Pulp Fiction",
      "imgPath": "assets/images/moviePosters/pulpfiction.jpg"
    },
    {
      "title": "The Matrix",
      "imgPath": "assets/images/moviePosters/thematrix.jpeg"
    },
    {
      "title": "Jaws",
      "imgPath": "assets/images/moviePosters/jaws.jpg"
    },
    {
      "title": "Jurassic Park",
      "imgPath": "assets/images/moviePosters/jurassicpark.jpeg"
    },
    {
      "title": "Airplane!",
      "imgPath": "assets/images/moviePosters/airplane.jpeg"
    },
    {
      "title": "Braveheart",
      "imgPath": "assets/images/moviePosters/braveheart.jpg"
    },
    {
      "title": "Kill Bill",
      "imgPath": "assets/images/moviePosters/killbill.jpeg"
    },
    {
      "title": "E.T. the Extra-Terrestrial",
      "imgPath": "assets/images/moviePosters/ettheextraterrestrial.jpeg"
    }
  ],

  stickFig:["assets/images/hangman-imgs/Hangman-0.png", "assets/images/hangman-imgs/Hangman-1.png", "assets/images/hangman-imgs/Hangman-2.png", "assets/images/hangman-imgs/Hangman-3.png", "assets/images/hangman-imgs/Hangman-4.png", "assets/images/hangman-imgs/Hangman-5.png", "assets/images/hangman-imgs/Hangman-6.png"],
  wordChoice: function () {
    return this.films[Math.floor(Math.random() * this.films.length)]["title"];
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
      }else {
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

function indexByValue(objArray, key, value) {
  for(var i = 0; i < objArray.length; i++){
    if(objArray[i][key] == value){
      return i;
    }
  }
  return -1;
}

$(document).ready(function () {

    // Reset whole game
    resetAll();
    newWord();

  $(document).on('keyup', function () {

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    var letterIndex = chosenWord.toLowerCase().indexOf(userInput);
    var updated = false;


    if ((letterIndex < 0) && (Hangman.wrongGuesses.indexOf(userInput.toUpperCase()) == -1)) {
      Hangman.wrongGuesses.push(userInput.toUpperCase());
      Hangman.printArray("#tried-array", Hangman.wrongGuesses);
      $("#hangman-image").attr("src", Hangman.stickFig[Hangman.wrongGuesses.length]);

      if (Hangman.wrongGuesses.length > 5) {

        // Loss logic starts here

        losses++;
        $("#loss-counter").html(losses);
        losses = 0;
        resetAll();
        newWord();

        // TODO: Possible losing condition feedback

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

        // Win Condition Code goes below.

        wins++;
        $("#win-counter").html(wins);
        var objIndex = indexByValue(Hangman.films, "title" ,chosenWord);
        $("#poster-img").attr("src", Hangman.films[objIndex]["imgPath"]);
        $("#poster-img").attr("alt", Hangman.films[objIndex]["title"]);
        correctGuesses = 0;

        // TODO: Possibly remove winning title from obj array

        // Reset game (not win/lose record)
        resetAll();
        newWord();

        // TODO: Display winning title, maybe multimedia

      }

    }
    if (updated === true) {
      Hangman.printArray("#word-array", Hangman.displayArray);
    }
  });
});