var chosenWord;
var correctGuesses = 0;
var wins = 0;
var losses = 0;
var wrongArray = ["_", "_", "_", "_", "_", "_"];

var Hangman = {
  films: [{
    "title": "It's a Wonderful Life",
    "poster": "itsawonderfullife.jpeg"
    },
    {
      "title": "Raiders of the Lost Arc",
      "poster": "raidersofthelostarc.jpeg"
    },
    {
      "title": "Star Wars",
      "poster": "starwars.jpg"
    },
    {
      "title": "Citizen Kane",
      "poster": "citizenkane.jpeg"
    },
    {
      "title": "Full Metal Jacket",
      "poster": "fullmetaljacket.jpeg"
    },
    {
      "title": "Clockwork Orange",
      "poster": "clockworkorange.jpg"
    },
    {
      "title": "Titanic",
      "poster": "titanic.jpeg"
    },
    {
      "title": "The Godfather",
      "poster": "thegodfather.jpg"
    },
    {
      "title": "Forrest Gump" ,
      "poster": "forrestgump.jpeg"
    },
    {
      "title": "Taxi Driver",
      "poster": "taxidriver.jpeg"
    },
    {
      "title": "Avatar",
      "poster": "avatar.jpeg"
    },
    {
      "title": "2001: A Space Odyssey",
      "poster": "2001spaceoddysey.jpeg"
    },
    {
      "title": "The Lion King",
      "poster": "lionking.jpeg"
    },
    {
      "title": "Back to the Future",
      "poster": "backtothefuture.jpeg"
    },
    {
      "title": "Rocky",
      "poster": "rocky.jpeg"
    },
    {
      "title": "Pulp Fiction",
      "poster": "pulpfiction.jpg"
    },
    {
      "title": "The Matrix",
      "poster": "thematrix.jpeg"
    },
    {
      "title": "Jaws",
      "poster": "jaws.jpg"
    },
    {
      "title": "Jurassic Park",
      "poster": "jurassicpark.jpeg"
    },
    {
      "title": "Airplane!",
      "poster": "airplane.jpeg"
    },
    {
      "title": "Braveheart",
      "poster": "braveheart.jpg"
    },
    {
      "title": "Kill Bill",
      "poster": "killbill.jpeg"
    },
    {
      "title": "E.T. the Extra-Terrestrial",
      "poster": "ettheextraterrestrial.jpeg"
    }
  ],
  stickFig:["Hangman-0.png", "Hangman-1.png", "Hangman-2.png", "Hangman-3.png", "Hangman-4.png", "Hangman-5.png", "Hangman-6.png"],
  displayArray: [],
  wrongGuesses: [],
  totalLetters: 0,
  wordChoice: function () {
    return this.films[Math.floor(Math.random() * this.films.length)]["title"];
  },
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
  resetGame: function () {
    this.wrongGuesses = [];
    this.displayArray = [];
    $("#hangman-image").attr("src", "assets/images/hangman-imgs/".concat(Hangman.stickFig[0]));
  },
  // TODO: Refactor to be independat function it does not belong to Hangman alone
  printArray: function (targetTag, array) {
    $(targetTag).html(array.join(" "));
  }
};


// Helper functions
function resetAll() {
  Hangman.resetGame();
  correctGuesses = 0;
  wrongArray = ["_", "_", "_", "_", "_", "_"];
}

function newWord() {
  chosenWord = Hangman.wordChoice();
  Hangman.prepWord(chosenWord);
  Hangman.printArray("#tried-array", wrongArray);
  Hangman.printArray("#word-array", Hangman.displayArray);
  $("#hangman-image").attr("src", "assets/images/hangman-imgs/".concat(Hangman.stickFig[0]));
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

  $(document).on('keyup', function (event) {

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    var letterIndex = chosenWord.toLowerCase().indexOf(userInput);
    var updated = false;

    if ((letterIndex < 0) && (Hangman.wrongGuesses.indexOf(userInput.toUpperCase()) == -1) && (/^[a-zA-Z]*$/.test(userInput))) {
      Hangman.wrongGuesses.push(userInput.toUpperCase());

      wrongArray.pop();
      Hangman.printArray("#tried-array", Hangman.wrongGuesses.concat(wrongArray));
      $("#hangman-image").attr("src", "assets/images/hangman-imgs/".concat(Hangman.stickFig[Hangman.wrongGuesses.length]));

      if (Hangman.wrongGuesses.length > 5) {
        // Loss logic starts here
        losses++;
        $("#loss-counter").html(losses);
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

        // Win Condition Code

        // TODO: Possible timing delay to display word then pause

        wins++;
        $("#win-counter").html(wins);
        var objIndex = indexByValue(Hangman.films, "title" ,chosenWord);
        $("#poster-img").attr("alt", Hangman.films[objIndex]["title"]);
        $("#poster-img").attr("src", "assets/images/moviePosters/".concat(Hangman.films[objIndex]["poster"]));
        Hangman.films.splice(objIndex, 1);

        // Reset game (not win/lose record)
        resetAll();
        newWord();

        // TODO: Display winning title, maybe multimedia -- like sound
      }
    }

    if (updated === true) {
      Hangman.printArray("#word-array", Hangman.displayArray);
    }

  });
});