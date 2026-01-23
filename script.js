let hunger = Math.floor(Math.random() * 100);
let happiness = Math.floor(Math.random() * 100);
let energy = Math.floor(Math.random() * 100);
let social = Math.floor(Math.random() * 80) + 20;
let hygiene = Math.floor(Math.random() * 80) + 20;
let health = Math.floor(Math.random() * 50) + 50;
let level = 1;
let experience = 0;
let petColor = '#ff9999';
let petSize = 'normal';
let petAge = 0;
let gameActive = false;
let gameScore = 0;
let ballX = 100;
let ballY = 10;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleX = 80;
let startTime = Date.now();
let achievements = [];
let totalInteractions = 0;
let petType = 'pengu';
let intelligence = Math.floor(Math.random() * 100);
let strength = Math.floor(Math.random() * 100);
let mood = 'happy';
let season = 'spring';
let evolutionStage = 'baby';
let accessories = [];
let unlockedFeatures = [];
let seasonalBonus = 0;
let chatResponses = {
  greetings: ["Hi there!", "Hello friend!", "Hey buddy!"],
  hungry: ["I'm so hungry...", "Feed me please!", "My tummy is empty!"],
  happy: ["I'm feeling great!", "This is awesome!", "I love you!"],
  tired: ["I need some rest...", "So sleepy...", "Zzz..."],
  bored: ["I'm bored...", "Let's play!", "Do something fun!"],
  jokes: [
    "Why don't pets ever pay for dinner? Because they always bring their own treats!",
    "What do you call a sleeping pet? A nap-kin!",
    "Why did the pet go to school? To improve its byte!",
    "What's a pet's favorite type of music? Anything with a good beat!",
    "Why don't pets make good comedians? Their jokes are too ruff!"
  ],
  default: ["Hmm?", "What?", "I don't understand...", "Tell me more!"]
};

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabName + '-tab').classList.add('active');
  event.target.classList.add('active');
}

function changePetColor(color) {
  petColor = color;
  updateDisplay();
}

function changePetSize(size) {
  petSize = size;
  const pet = document.getElementById('pet');
  pet.className = pet.className.replace(/\b(small|large)\b/g, '');
  if (size !== 'normal') {
    pet.classList.add(size);
  }
}

function changePetType(type) {
  petType = type;

  // Reset/Adjust stats based on pet type
  switch (type) {
    case 'kitto': happiness = Math.min(100, happiness + 20); break;
    case 'doggo': energy = Math.min(100, energy + 20); break;
    case 'bunno': health = Math.min(100, health + 20); break;
  }

  updateDisplay();
  addPetMessage(`I'm now a ${type}! Meow/Woof/Squeak!`);
}

function showSection(sectionName) {
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(sectionName + '-section').classList.add('active');

  // Handle event currentTarget for active class
  if (window.event && window.event.currentTarget && window.event.currentTarget.classList) {
    window.event.currentTarget.classList.add('active');
  } else {
    // Fallback if called without event or from non-nav element
    const btns = document.querySelectorAll('.nav-btn');
    if (sectionName === 'game' && btns[0]) btns[0].classList.add('active');
    if (sectionName === 'customize' && btns[1]) btns[1].classList.add('active');
    if (sectionName === 'about' && btns[2]) btns[2].classList.add('active');
  }
}

// Variables for specific games are already declared above or will be managed within functions
let memoryActive = false;
let memoryScore = 0;
let memoryCards = [];
let flippedCards = [];
let ballActive = false;

let colors = ['red', 'blue', 'green', 'yellow'];

let rhythmActive = false;
let rhythmScore = 0;
let rhythmNoteY = -30;
let rhythmSpeed = 2;
let notes = ['🎵', '🎶', '🎹', '🎸'];
let currentNoteEmoji = '🎵';

let ballLevel = 1;

function startBallGame() {
  document.getElementById('minigame-area').classList.remove('hidden');
  document.querySelectorAll('.game-area').forEach(ga => ga.classList.add('hidden'));
  document.getElementById('ball-game').classList.remove('hidden');
  ballActive = true;
  ballScore = 0;
  ballLevel = 1;
  ballX = 100;
  ballY = 10;
  ballSpeedX = 2;
  ballSpeedY = 2;
  document.getElementById('ball-score').textContent = ballScore;
  ballGameLoop();
}

function endBallGame() {
  ballActive = false;
  document.getElementById('ball-game').classList.add('hidden');
  document.getElementById('minigame-area').classList.add('hidden');

  const xpReward = Math.floor(ballScore * 0.5) + ballLevel;
  const happinessReward = ballScore;

  happiness = Math.min(100, happiness + happinessReward);
  energy = Math.max(0, energy - 10);
  gainExperience(xpReward);

  updateDisplay();
  addPetMessage(`Great game! Score: ${ballScore}. Level: ${ballLevel}`);
}

function ballGameLoop() {
  if (!ballActive) return;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Level up speed
  if (ballScore > 0 && ballScore % 5 === 0 && ballScore / 5 >= ballLevel) {
    ballLevel++;
    ballSpeedX *= 1.15;
    ballSpeedY *= 1.15;
    addSparkle();
  }

  if (ballX <= 0 || ballX >= 188) ballSpeedX = -ballSpeedX;
  if (ballY <= 0) ballSpeedY = -ballSpeedY;

  if (ballY >= 100 && ballX >= paddleX - 20 && ballX <= paddleX + 20) {
    ballSpeedY = -Math.abs(ballSpeedY); // Bounce up
    ballScore++;
    document.getElementById('ball-score').textContent = ballScore;

    // Add hit effect
    const paddle = document.getElementById('paddle');
    paddle.style.transform = 'scale(1.1)';
    setTimeout(() => paddle.style.transform = 'scale(1)', 100);
  }

  if (ballY >= 120) {
    endBallGame();
    return;
  }

  const ballEl = document.getElementById('ball');
  const paddleEl = document.getElementById('paddle');
  if (ballEl) {
    ballEl.style.left = ballX + 'px';
    ballEl.style.top = ballY + 'px';
  }
  if (paddleEl) {
    paddleEl.style.left = paddleX + 'px';
  }

  requestAnimationFrame(ballGameLoop);
}

function startMemoryGame() {
  document.getElementById('minigame-area').classList.remove('hidden');
  document.querySelectorAll('.game-area').forEach(ga => ga.classList.add('hidden'));
  document.getElementById('memory-game').classList.remove('hidden');
  memoryActive = true;
  memoryScore = 0;
  flippedCards = [];
  document.getElementById('memory-score').textContent = memoryScore;
  createMemoryCards();
}

function createMemoryCards() {
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  const symbols = ['🐧', '🐱', '🐶', '🐰', '🍎', '🐟', '🦴', '🥕', '🐧', '🐱', '🐶', '🐰', '🍎', '🐟', '🦴', '🥕'];
  memoryCards = symbols.sort(() => Math.random() - 0.5);

  memoryCards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.onclick = () => flipCard(index);
    grid.appendChild(card);
  });
}

function flipCard(index) {
  if (flippedCards.length >= 2) return;

  const card = document.querySelector(`[data-index="${index}"]`);
  card.textContent = memoryCards[index];
  card.classList.add('flipped');
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (memoryCards[first] === memoryCards[second]) {
    memoryScore++;
    document.getElementById('memory-score').textContent = memoryScore;
  } else {
    document.querySelector(`[data-index="${first}"]`).textContent = '';
    document.querySelector(`[data-index="${second}"]`).textContent = '';
    document.querySelector(`[data-index="${first}"]`).classList.remove('flipped');
    document.querySelector(`[data-index="${second}"]`).classList.remove('flipped');
  }
  flippedCards = [];
}

function endMemoryGame() {
  memoryActive = false;
  document.getElementById('memory-game').classList.add('hidden');
  document.getElementById('minigame-area').classList.add('hidden');
  intelligence = Math.min(100, intelligence + memoryScore * 5);
  updateDisplay();
  addPetMessage(`Memory master! Pairs found: ${memoryScore}`);
}

function startColorGame() {
  document.getElementById('minigame-area').classList.remove('hidden');
  document.querySelectorAll('.game-area').forEach(ga => ga.classList.add('hidden'));
  document.getElementById('color-game').classList.remove('hidden');
  colorActive = true;
  colorScore = 0;
  document.getElementById('color-score').textContent = colorScore;
  nextColor();
}

function nextColor() {
  if (!colorActive) return;
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('target-color').style.background = targetColor;
}

function catchColor(color) {
  if (color === targetColor) {
    colorScore++;
    document.getElementById('color-score').textContent = colorScore;

    // Feedback effect
    const target = document.getElementById('target-color');
    target.style.transform = 'scale(1.2)';
    setTimeout(() => target.style.transform = 'scale(1)', 150);

    nextColor();
  }
}

function endColorGame() {
  colorActive = false;
  document.getElementById('color-game').classList.add('hidden');
  document.getElementById('minigame-area').classList.add('hidden');
  happiness = Math.min(100, happiness + colorScore * 2);
  intelligence = Math.min(100, intelligence + colorScore);
  updateDisplay();
  addPetMessage(`Colorful fun! Score: ${colorScore}`);
}

function startRhythmGame() {
  document.getElementById('minigame-area').classList.remove('hidden');
  document.querySelectorAll('.game-area').forEach(ga => ga.classList.add('hidden'));
  document.getElementById('rhythm-game').classList.remove('hidden');
  rhythmActive = true;
  rhythmScore = 0;
  rhythmNoteY = -30;
  rhythmSpeed = 2;
  document.getElementById('rhythm-score').textContent = rhythmScore;

  // Event listener for tapping
  const gameArea = document.getElementById('rhythm-game');
  gameArea.onclick = handleRhythmTap;

  spawnRhythmNote();
  rhythmGameLoop();
}

function spawnRhythmNote() {
  rhythmNoteY = -30;
  currentNoteEmoji = notes[Math.floor(Math.random() * notes.length)];
  const noteEl = document.getElementById('rhythm-note');
  if (noteEl) {
    noteEl.textContent = currentNoteEmoji;
    noteEl.style.top = rhythmNoteY + 'px';
  }
}

function handleRhythmTap() {
  if (!rhythmActive) return;

  // Target range is roughly bottom 30px to 60px
  if (rhythmNoteY >= 80 && rhythmNoteY <= 120) {
    rhythmScore++;
    document.getElementById('rhythm-score').textContent = rhythmScore;
    addSparkle();
    spawnRhythmNote();
    rhythmSpeed += 0.1; // Increase difficulty
  } else {
    // Miss? Maybe deduct or just do nothing
    console.log('Miss!');
  }
}

function rhythmGameLoop() {
  if (!rhythmActive) return;

  rhythmNoteY += rhythmSpeed;
  const noteEl = document.getElementById('rhythm-note');
  if (noteEl) {
    noteEl.style.top = rhythmNoteY + 'px';
  }

  if (rhythmNoteY > 150) {
    // Note missed the bottom
    endRhythmGame();
    return;
  }

  requestAnimationFrame(rhythmGameLoop);
}

function endRhythmGame() {
  rhythmActive = false;
  document.getElementById('rhythm-game').classList.add('hidden');
  document.getElementById('minigame-area').classList.add('hidden');

  const xpReward = Math.floor(rhythmScore * 0.8);
  const happinessReward = rhythmScore * 2;

  happiness = Math.min(100, happiness + happinessReward);
  intelligence = Math.min(100, intelligence + Math.floor(rhythmScore * 0.5));
  gainExperience(xpReward);

  updateDisplay();
  addPetMessage(`Musical star! Rhythm Score: ${rhythmScore}`);
}

function changeBackground(theme) {
  const body = document.body;
  body.className = body.className.replace(/bg-\w+/g, '');
  if (theme !== 'default') {
    body.classList.add('bg-' + theme);
  }
}

function updateDisplay() {
  const statusText = document.getElementById("status");
  const mainPet = document.getElementById("pet");
  const previewPet = document.getElementById("preview-pet");

  // Update stat bars
  if (document.getElementById("hunger-bar")) document.getElementById("hunger-bar").style.width = hunger + "%";
  if (document.getElementById("happiness-bar")) document.getElementById("happiness-bar").style.width = happiness + "%";
  if (document.getElementById("energy-bar")) document.getElementById("energy-bar").style.width = energy + "%";
  if (document.getElementById("social-bar")) document.getElementById("social-bar").style.width = social + "%";
  if (document.getElementById("hygiene-bar")) document.getElementById("hygiene-bar").style.width = hygiene + "%";
  if (document.getElementById("health-bar")) document.getElementById("health-bar").style.width = health + "%";
  if (document.getElementById("level-bar")) document.getElementById("level-bar").style.width = (experience % 100) + "%";

  // Update footer stats
  if (document.getElementById("footer-level")) document.getElementById("footer-level").textContent = `Level: ${level}`;
  if (document.getElementById("footer-age")) document.getElementById("footer-age").textContent = `Age: ${Math.floor(petAge / 10)} days`;
  if (document.getElementById("footer-exp")) document.getElementById("footer-exp").textContent = `EXP: ${experience}/${level * 100}`;

  // Update new header displays
  if (document.getElementById("level-display")) document.getElementById("level-display").textContent = `Lv. ${level}`;
  if (document.getElementById("season-display")) document.getElementById("season-display").textContent = season.charAt(0).toUpperCase() + season.slice(1);

  // Update Evolution
  updateEvolution();
  if (document.getElementById("preview-stage")) {
    document.getElementById("preview-stage").textContent = `Stage: ${evolutionStage.charAt(0).toUpperCase() + evolutionStage.slice(1)}`;
  }

  // Mood/Status determination
  let status = "happy";
  if (hunger <= 30) {
    statusText.textContent = "I'm really hungry!";
    status = "hungry";
  } else if (happiness <= 30) {
    statusText.textContent = "I'm so bored...";
    status = "bored";
  } else if (energy <= 30) {
    statusText.textContent = "I'm sleepy...";
    status = "tired";
  } else if (hunger === 100 && happiness === 100 && energy === 100) {
    statusText.textContent = "I'm absolutely perfect!";
    status = "perfect";
  } else {
    statusText.textContent = "I'm feeling great!";
    status = "happy";
  }

  const commonClasses = `${petType} ${evolutionStage} ${status}`;

  if (mainPet) {
    mainPet.className = `pet ${commonClasses}`;
    mainPet.style.backgroundColor = petColor;
  }

  if (previewPet) {
    previewPet.className = `pet ${commonClasses}`;
    previewPet.style.backgroundColor = petColor;
  }

  updateTimeOfDay();
}

function updateEvolution() {
  const oldStage = evolutionStage;
  if (level < 5) evolutionStage = 'baby';
  else if (level < 10) evolutionStage = 'child';
  else if (level < 20) evolutionStage = 'teen';
  else if (level < 40) evolutionStage = 'adult';
  else evolutionStage = 'elder';

  if (oldStage !== evolutionStage) {
    addPetMessage(`Amazing! I've evolved into a ${evolutionStage}!`);
    addSparkle();
  }
}

function updateTimeOfDay() {
  const hour = new Date().getHours();
  const body = document.body;
  body.classList.remove('time-morning', 'time-day', 'time-evening', 'time-night');

  if (hour >= 5 && hour < 10) body.classList.add('time-morning');
  else if (hour >= 10 && hour < 17) body.classList.add('time-day');
  else if (hour >= 17 && hour < 21) body.classList.add('time-evening');
  else body.classList.add('time-night');
}

function feedPet() {
  hunger = Math.min(100, hunger + 25);
  health = Math.min(100, health + 5);
  gainExperience(2);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}

function playPet() {
  let happinessGain = 25;
  if (petType === 'doggo') happinessGain *= 2; // Doggo passive: Loyal Companion

  happiness = Math.min(100, happiness + happinessGain);
  social = Math.min(100, social + 15);
  hunger = Math.max(0, hunger - 10);
  energy = Math.max(0, energy - 15);
  gainExperience(3);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}



function sleepPet() {
  let energyGain = 30;
  if (petType === 'pengu') energyGain *= 1.2; // Pengu passive: Arctic Metabolism

  energy = Math.min(100, energy + energyGain);
  hunger = Math.max(0, hunger - 5);
  hygiene = Math.max(0, hygiene - 10);
  health = Math.min(100, health + 10);
  gainExperience(1);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}

function washPet() {
  health = Math.min(100, health + 20);
  happiness = Math.min(100, happiness + 10);
  energy = Math.max(0, energy - 5);
  gainExperience(2);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}

function chatPet() {
  social = Math.min(100, social + 30);
  happiness = Math.min(100, happiness + 10);
  gainExperience(1);
  totalInteractions++;
  addPetMessage("You're my best friend!");
  addSparkle();
  updateDisplay();
}

function showerPet() {
  hygiene = Math.min(100, hygiene + 50);
  health = Math.min(100, health + 5);
  happiness = Math.max(0, happiness - 5); // Some might dislike bath
  gainExperience(2);
  totalInteractions++;
  addPetMessage("Squeaky clean!");
  addSparkle();
  updateDisplay();
}

function gainExperience(amount) {
  let expGain = amount;
  if (petType === 'bunno') expGain = Math.ceil(amount * 1.2); // Bunno passive: Fast Metabolism

  experience += expGain;
  const expNeeded = level * 100;

  if (experience >= expNeeded) {
    level++;
    experience = experience - expNeeded; // Keep overflow EXP
    health = Math.min(100, health + 20);
    addPetMessage(`Level UP! I'm now level ${level}!`);
    addSparkle();
  }
  updateDisplay();
}

function trainPet() {
  energy = Math.max(0, energy - 20);
  hunger = Math.max(0, hunger - 15);
  gainExperience(5);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}


function decreaseStats() {
  // Apply seasonal bonuses/penalties
  let hungerDrain = 1;
  let happinessDrain = 1;
  let energyDrain = 0.5;

  if (season === 'spring') happinessDrain *= 0.8;
  if (season === 'summer') energyDrain *= 0.8;
  if (season === 'autumn') hungerDrain *= 0.8;
  if (season === 'winter') energyDrain *= 1.2; // Harder in winter? Or maybe cozy? 

  hunger = Math.max(0, hunger - (Math.floor(Math.random() * 2) + hungerDrain));
  happiness = Math.max(0, happiness - (Math.floor(Math.random() * 2) + happinessDrain));
  energy = Math.max(0, energy - (Math.floor(Math.random() * 1) + energyDrain));
  health = Math.max(0, health - (Math.floor(Math.random() * 2)));

  petAge++;
  if (petAge % 50 === 0) {
    cycleSeason();
  }

  updateDisplay();
}

function cycleSeason() {
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  let currentIndex = seasons.indexOf(season);
  season = seasons[(currentIndex + 1) % seasons.length];
  addPetMessage(`Look! The season has changed to ${season}!`);
  changeBackground(season);
}

document.addEventListener('DOMContentLoaded', function () {
  updateDisplay();
  setInterval(decreaseStats, 8000);
  setInterval(updateUptime, 1000);
  addPetMessage("Hi! I'm Pengu! Talk to me!");

  // Add mouse and touch controls for ball game
  document.addEventListener('mousemove', function (e) {
    if (ballActive) {
      const ballField = document.querySelector('.ball-field');
      if (ballField) {
        const rect = ballField.getBoundingClientRect();
        paddleX = Math.max(20, Math.min(180, e.clientX - rect.left - 20));
      }
    }
  });

  document.addEventListener('touchmove', function (e) {
    if (ballActive) {
      e.preventDefault();
      const ballField = document.querySelector('.ball-field');
      if (ballField) {
        const rect = ballField.getBoundingClientRect();
        const touch = e.touches[0];
        paddleX = Math.max(20, Math.min(180, touch.clientX - rect.left - 20));
      }
    }
  });
});

function updateUptime() {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  document.getElementById('uptime').textContent = `Uptime: ${hours}h ${minutes}m ${seconds}s`;
}

function resetPet() {
  if (confirm('Reset Pengu? This will clear all progress!')) {
    hunger = Math.floor(Math.random() * 100);
    happiness = Math.floor(Math.random() * 100);
    energy = Math.floor(Math.random() * 100);
    health = Math.floor(Math.random() * 50) + 50;
    level = 1;
    experience = 0;
    petAge = 0;
    achievements = [];
    totalInteractions = 0;
    perfectDays = 0;
    document.getElementById('achievement-list').innerHTML = '';
    updateDisplay();
    addPetMessage('Hi! I\'m back to being a baby Pengu!');
  }
}

function savePet() {
  const petData = {
    hunger, happiness, energy, health, level, experience, petAge, petColor, petSize, achievements, totalInteractions, perfectDays
  };
  localStorage.setItem('penguData', JSON.stringify(petData));
  addPetMessage('My data has been saved!');
}

function loadPet() {
  const saved = localStorage.getItem('penguData');
  if (saved) {
    const petData = JSON.parse(saved);
    hunger = petData.hunger || hunger;
    happiness = petData.happiness || happiness;
    energy = petData.energy || energy;
    health = petData.health || health;
    level = petData.level || level;
    experience = petData.experience || experience;
    petAge = petData.petAge || petAge;
    petColor = petData.petColor || petColor;
    petSize = petData.petSize || petSize;
    achievements = petData.achievements || [];
    totalInteractions = petData.totalInteractions || 0;
    perfectDays = petData.perfectDays || 0;

    // Restore achievements display
    achievements.forEach(achievement => displayAchievement(achievement));

    updateDisplay();
    addPetMessage('Welcome back! I missed you!');
  } else {
    addPetMessage('No saved data found!');
  }
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = '';

  setTimeout(() => {
    const response = getPetResponse(message);
    addPetMessage(response);
  }, 500);
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function addUserMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  messageDiv.textContent = 'You: ' + message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addPetMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message pet-message';
  messageDiv.textContent = 'Pengu: ' + message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getPetResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('joke') || msg.includes('funny') || msg.includes('laugh')) {
    return getRandomResponse('jokes');
  }
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return getRandomResponse('greetings');
  }
  if (msg.includes('hungry') || msg.includes('food') || msg.includes('eat')) {
    return getRandomResponse('hungry');
  }
  if (msg.includes('play') || msg.includes('game') || msg.includes('fun')) {
    return getRandomResponse('happy');
  }
  if (msg.includes('tired') || msg.includes('sleep') || msg.includes('rest')) {
    return getRandomResponse('tired');
  }
  if (msg.includes('bored') || msg.includes('boring')) {
    return getRandomResponse('bored');
  }

  // Respond based on current mood
  if (hunger <= 30) return getRandomResponse('hungry');
  if (happiness <= 30) return getRandomResponse('bored');
  if (energy <= 30) return getRandomResponse('tired');
  if (happiness >= 80) return getRandomResponse('happy');

  return getRandomResponse('default');
}

function getRandomResponse(category) {
  const responses = chatResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

function addSparkle() {
  const pet = document.getElementById('pet');
  pet.classList.add('sparkle');
  setTimeout(() => pet.classList.remove('sparkle'), 1000);
}

function checkAchievements() {
  const newAchievements = [];

  if (level >= 5 && !achievements.includes('Level Master')) {
    newAchievements.push('Level Master');
  }
  if (totalInteractions >= 50 && !achievements.includes('Caretaker')) {
    newAchievements.push('Caretaker');
  }
  if (hunger === 100 && happiness === 100 && energy === 100 && health === 100 && !achievements.includes('Perfect Pet')) {
    newAchievements.push('Perfect Pet');
    perfectDays++;
  }
  if (petAge >= 100 && !achievements.includes('Elder')) {
    newAchievements.push('Elder');
  }

  newAchievements.forEach(achievement => {
    achievements.push(achievement);
    displayAchievement(achievement);
    addPetMessage(`Wow! You earned: ${achievement}!`);
  });
}

function displayAchievement(achievement) {
  const achievementList = document.getElementById('achievement-list');
  if (!achievementList) return;
  const achievementDiv = document.createElement('div');
  achievementDiv.className = 'achievement';
  achievementDiv.textContent = achievement;
  achievementList.appendChild(achievementDiv);
}

// Initialization and Game Loops
updateDisplay();

setInterval(() => {
  // Stats drain
  hunger = Math.max(0, hunger - 1);
  energy = Math.max(0, energy - 0.5);
  happiness = Math.max(0, happiness - 0.5);
  hygiene = Math.max(0, hygiene - 0.8);

  let socialDrain = 0.6;
  if (petType === 'kitto') socialDrain *= 0.7; // Kitto passive: Solo Spirit
  social = Math.max(0, social - socialDrain);

  // Health penalty for poor conditions
  if (hunger < 10 || energy < 10 || hygiene < 10) {
    health = Math.max(0, health - 1);
  }

  petAge++;
  checkAchievements();
  updateDisplay();
}, 5000);
