const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('bestScore');
const gameStatusElement = document.getElementById('gameStatus');
const startButton = document.getElementById('startMinigame-btn');
let score = 0;
let bestScore = 0;
let gameInterval;
let gameStatus = 'Not Started'; // Possible values: "Not Started", "Playing", "Finished"
let spawnRate = 1000; // Initial spawn rate in milliseconds
const minSpawnRate = 350; // Minimum spawn rate
const spawnRateDecrement = 40; // Amount to decrease spawn rate at each interval
let spawnInterval;
let rateAdjustmentInterval;
const entityLifetime = 3000; // Time in milliseconds an entity stays on screen
let endGameTimeout;

function adjustSpawnRate() {
  clearInterval(spawnInterval);

  spawnRate = Math.max(spawnRate - spawnRateDecrement, minSpawnRate);
  spawnInterval = setInterval(() => {
    spawnEntity(Math.random() < 0.7);
  }, spawnRate);
}

function updateGameStatus(newStatus) {
  gameStatus = newStatus;
  gameStatusElement.textContent = 'Status: ' + newStatus;
  startButton.textContent =
    newStatus === 'Playing' ? 'Restart Minigame' : 'Start Minigame';
}

function spawnEntity(isVirus = true) {
  const entity = document.createElement('img');
  entity.classList.add('entity');
  entity.src = isVirus
    ? './src/images/minigame/virus.png'
    : './src/images/minigame/chicken.png';
  entity.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
  entity.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';

  entity.onclick = function () {
    if (isVirus) {
      score++;
    } else {
      score--;
    }
    updateScore();
    gameArea.removeChild(entity);
  };

  gameArea.appendChild(entity);

  setTimeout(() => {
    if (gameArea.contains(entity)) {
      gameArea.removeChild(entity);
      score += isVirus ? -1 : 1;
      updateScore();
    }
  }, entityLifetime);
}

function updateScore() {
  scoreElement.textContent = 'Score: ' + score;
  if (score > bestScore) {
    bestScore = score;
    bestScoreElement.textContent = 'Best Score: ' + bestScore;
  }
}

function startGame() {
  updateGameStatus('Playing');
  score = 0;
  updateScore();

  // Clear existing intervals and timeouts if any
  clearInterval(spawnInterval);
  clearTimeout(endGameTimeout);

  // Set initial spawn rate and start adjusting it
  spawnRate = 1000;
  adjustSpawnRate();

  // Schedule adjustments to the spawn rate
  rateAdjustmentInterval = setInterval(adjustSpawnRate, 1000);

  // Set timeout to end the game after 30 seconds
  endGameTimeout = setTimeout(() => {
    clearInterval(spawnInterval);
    clearInterval(rateAdjustmentInterval);
    endGame();
  }, 30000);
}

function endGame() {
  clearInterval(spawnInterval);
  clearInterval(rateAdjustmentInterval);
  updateGameStatus('Finished');
}

startButton.addEventListener('click', startGame);
