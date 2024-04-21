"use srict";

// selecting elements
let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");
let diceEl = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

// default state of all elements
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// defining the state of the game playing or not playing --------------------
let Playing = true;

// end of state definition lmao -----------------------------------

// creating a function that switches the active player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector(`.player--1`).classList.toggle("player--active");
  document.querySelector(`.player--0`).classList.toggle("player--active");
};

// end of switch player funvtion
// ------------------------------------------------------------------------------

// rolling the dicce on the click of the roll btn
btnRoll.addEventListener("click", function () {
  if (Playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;
    // display the dice result to the current score tab
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// click event to the hold button
btnHold.addEventListener("click", function () {
  if (Playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(".player--active");
      Playing = false;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  window.location.reload();
});
