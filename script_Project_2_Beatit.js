var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
//rules of games
//step 1: 2 players game mode
//step 2: Submit button = rolls 2 dice
//step 3: eg. first dice is 4, second dice is 5, score:54
//step 4: Player 2 start and try to get bigger number....
var STATE_DICE_ROLL = "STATE_DICE_ROLL";
var STATE_DICE_ORDER = "STATE_DICE_ORDER";
var STATE_COMPARE_SCORES = "STATE_COMPARE_SCORES";
var gamestate = STATE_DICE_ROLL;

var CurrentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

var RollDice = function () {
  console.log("Control flow: start of RollDice()");
  var random_int = Math.floor(Math.random() * 6) + 1;
  console.log("RollDice output, random_int:", random_int);
  return random_int;
};

var RollDiceforplayer = function () {
  console.log("Control flow: start of RollDiceforplayer()");
  for (var i = 0; i < 2; i++) {
    var result = RollDice();
    CurrentPlayerRolls.push(result);
  }

  console.log(
    "RollDiceforplayer changes, CurrentPlayerRolls:",
    CurrentPlayerRolls
  );

  return (
    "Welcome Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice 1: " +
    CurrentPlayerRolls[0] +
    "| Dice 2: " +
    CurrentPlayerRolls[1] +
    "<br><br>Please input either 1 or 2 to choose a particular die to be used as the first digit of the final value!<br><br>Current Game State: " +
    gamestate
  );
};

// Get scores
var getPlayerScore = function (playerInput) {
  var playerScore;

  // VALIDATION
  if (playerInput != 1 && playerInput != 2) {
    //console.log("Control flow: invalidate input, NOT 1 and NOT 2");
    return (
      "Error!! Please only input either `1` or `2` to choose which die to use as the first digit.<br><br>Your dice rolls are:<br><br>Dice 1: " +
      CurrentPlayerRolls[0] +
      "| Dice 2: " +
      CurrentPlayerRolls[1] +
      ".<br><br>Current Game State: " +
      gamestate
    );
  }

  // input == 1
  if (playerInput == 1) {
    //console.log("Control flow: input == 1");
    playerScore = Number(
      String(CurrentPlayerRolls[0]) + String(CurrentPlayerRolls[1])
    );
    return (
      "Your chosen value is: " +
      playerScore +
      "\n\nCurrent Game State: " +
      gamestate
    );
  }

  // input == 2
  if (playerInput == 2) {
    //console.log("Control flow: input == 2");
    playerScore = Number(
      String(CurrentPlayerRolls[1]) + String(CurrentPlayerRolls[0])
    );

    // store playerScore in an array - to keep track
    allPlayersScore.push(playerScore);

    // clear current player rolls array
    CurrentPlayerRolls = [];

    return (
      "Player " +
      currentPlayer +
      ", Your chosen value is: " +
      playerScore +
      "<br><br>Current Game State: " +
      gamestate
    );
  }
};

// Compare player scores function
// Inside comparePlayerScores function
var comparePlayerScores = function () {
  if (allPlayersScore.length >= 2) {
    compareMessage =
      " Player 1 score: " +
      allPlayersScore[0] +
      "<br>Player 2 score:" +
      allPlayersScore[1];

    // Compare scores and determine the winner
    if (allPlayersScore[0] > allPlayersScore[1]) {
      return compareMessage + "<br><br>Player 1 wins!";
    } else if (allPlayersScore[1] > allPlayersScore[0]) {
      return compareMessage + "<br><br>Player 2 wins!";
    } else {
      return "It is a tie!<br><br>" + compareMessage;
    }
  } else if (allPlayersScore.length === 1) {
    // Handle the case when there is only one score
    return "Waiting for the second player to submit a score.";
  } else {
    // Return an error if there are not enough scores
    return "Error: Not enough scores to compare!";
  }
};

var resetGame = function () {
  currentPlayer = 1;
  gamestate = STATE_DICE_ORDER;

  return (
    "Good game, the game is reset. It is now player 1's turn<br><br>Current Game State: " +
    gamestate
  );
};
//////////////////////////////////////////////////////////////////////////
function main(input) {
  //console.log("Check game state by submit:", gamestate);
  //console.log("Checking currentPlayer on submit click", currentPlayer);
  var outputmessage = "";

  if (gamestate == STATE_DICE_ROLL) {
    //console.log("Control Flow: gamestate == STATE_DICE_ROLL");
    outputmessage = RollDiceforplayer();

    // Game state change
    gamestate = STATE_DICE_ORDER;
    return outputmessage;
  }

  if (gamestate == STATE_DICE_ORDER) {
    console.log("Control Flow: gamestate == STATE_DICE_ORDER");

    // Call playerscore function
    outputmessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      //console.log("Control flow: end of player 1`s turn, now player 2 turn");
      currentPlayer = 2;
      gamestate = STATE_DICE_ROLL;
      return (
        outputmessage +
        "<br><br>It is now Player 2`s turn!,<br><br>Current Game State: " +
        gamestate
      );
    }

    if (currentPlayer == 2) {
      gamestate = STATE_COMPARE_SCORES;
      //console.log("Control flow: end of player 2`s turn, now click submit, and calculate scores");
      return (
        outputmessage +
        "<br><br>Please submit to calculate the scores!<br><br>Current Game State: " +
        gamestate
      );
    }
  }

  if (gamestate == STATE_COMPARE_SCORES) {
    //console.log("Control Flow: gamestate == STATE_COMPARE_SCORES");

    // Call comparePlayerScores function
    outputmessage = comparePlayerScores();

    // Reset the game and display the reset message
    return outputmessage + "<br><br>" + resetGame();
  }
}
