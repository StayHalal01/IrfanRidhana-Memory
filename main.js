//emoji
const emoji = ["😁","😁","🥺","🥺","🦊","🦊","🐣","🐣",
                "🐶","🐶","🐹","🐹","🙀","🙀","🐰","🐰"];

var shuf_emoji = emoji.sort(() => (Math.random() > .5) ? 2 : -1);

var openedCards = [];

//Score
let score = 0;
const scoreCount = document.getElementById("score-count");
const gameScore = document.querySelector(".score");

function updateScore(points) {
  score += points;
  scoreCount.textContent = score;
}

function resetScore() {
  score = 0;
  updateScore(0);
}

//Move Count
var moveCount = 0;
function updateMoveCount() {
  moveCount++;
  document.getElementById("moves-count").textContent = `Moves: ${moveCount}`;
}

//Time
var seconds = 0;
var minutes = 0;
var timerInterval = null;
function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  document.getElementById("time").textContent = `Time: ${minutes}m ${seconds}s`;
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

//Start Game
const startButton = document.querySelector('.start-button');
const gameContainer = document.querySelector('.game-container');
const startMenu = document.querySelector('.start-menu');
startButton.addEventListener('click', () => {
  startGame();
});

function startGame() {
  startMenu.style.display = 'none';
  gameContainer.style.display = 'block';

  clearInterval(timerInterval);

  seconds = 0;
  minutes = 0;

  timerInterval = setInterval(updateTimer, 1000);

  document.getElementById("moves-count").textContent = `Moves: ${moveCount}`;
  document.getElementById("time").textContent = `Time: ${minutes}m ${seconds}s`;
}

//Game Logic
for (var i = 0; i < emoji.length; i++) {
  let box = document.createElement('div');
  box.className = 'item';
  box.innerHTML = shuf_emoji[i];

  box.onclick = function () {
    if (!this.classList.contains('boxOpen') && openedCards.length < 2) {
      this.classList.add('boxOpen');
      openedCards.push(this);

      if (openedCards.length === 2) {
        updateMoveCount();
        setTimeout(function () {
          if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            openedCards[0].classList.add('boxMatch');
            openedCards[1].classList.add('boxMatch');
            openedCards = [];

            updateScore(1000);

            if (document.querySelectorAll('.boxMatch').length === emoji.length) {
              finishMenu();
              gameScore.style.display = 'none';
            }

          } else {
            openedCards[0].classList.remove('boxOpen');
            openedCards[1].classList.remove('boxOpen');
            openedCards = [];
          }
        }, 500);
      }
    }
  };

  document.querySelector('.game').appendChild(box);
}

function resetGame() {
  window.location.reload();
  resetScore();
  window.location.reload();
}

//Finish
function finishMenu() {
  clearInterval(timerInterval);
  const finishMenu = document.querySelector('.finish-menu');
  const gameContainer = document.querySelector('.game-container');
  const finishScore = document.getElementById('finish-score');

  const timeScore = (minutes * 60 + seconds) * 20;
  const moveScore = moveCount * 20;
  const finalScore = score - timeScore - moveScore;

  finishScore.textContent = finalScore;
  document.getElementById("finish-time").textContent = `Time: ${minutes}m ${seconds}s`;
  document.getElementById("finish-moves").textContent = `Moves: ${moveCount}`;

  finishMenu.style.display = 'block';
  gameContainer.style.display = 'none';
}

function playAgain() {
  const finishMenu = document.querySelector('.finish-menu');
  const gameContainer = document.querySelector('.game-container');

  finishMenu.style.display = 'none';
  gameContainer.style.display = 'block';
  resetGame(); 
}