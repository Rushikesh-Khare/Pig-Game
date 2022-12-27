"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // diff way to select id
const curr0El = document.getElementById("current--0");
const curr1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
let currScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
};
// hide dice
diceEl.classList.add("hidden");
// clicking roll button
btnRoll.addEventListener("click", function () {
  if (playing) {
    // genrate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display that number on dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // check if number is 1 switch to next player
    if (dice == 1) {
      // switch player
      switchPlayer();
    } else {
      currScore += dice;
      // keep track of which player is active now
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
      // curr0El.textContent = currScore; //change later
    }
  }
});
// hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.add current score to active player score
    scores[activePlayer] += currScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player score >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // finish game
    } else {
      switchPlayer();
    }
  }

  // 3. switch active player
});

// new button
btnNew.addEventListener("click", function () {
  playing = true;
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  for(let i = 0; i < scores.length; i++){
    scores[i] = 0;
  }
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;
  activePlayer = 0;
  currScore = 0;
  
//   curr1El.classList.remove('player--active');
  
});
