let hunger = Math.floor(Math.random() * 100);
let happiness = Math.floor(Math.random() * 100);
let energy = Math.floor(Math.random() * 100);
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
let perfectDays = 0;
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
  const pet = document.getElementById('pet');
  pet.style.background = color;
  pet.style.borderColor = color.replace('99', '66');
}

function changePetSize(size) {
  petSize = size;
  const pet = document.getElementById('pet');
  pet.className = pet.className.replace(/\b(small|large)\b/g, '');
  if (size !== 'normal') {
    pet.classList.add(size);
  }
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
  const pet = document.getElementById("pet");
  
  // Update stat bars
  document.getElementById("hunger-bar").style.width = hunger + "%";
  document.getElementById("happiness-bar").style.width = happiness + "%";
  document.getElementById("energy-bar").style.width = energy + "%";
  document.getElementById("health-bar").style.width = health + "%";
  document.getElementById("level-bar").style.width = (experience % 100) + "%";
  
  // Update footer stats
  document.getElementById("footer-level").textContent = `Level: ${level}`;
  document.getElementById("footer-age").textContent = `Age: ${Math.floor(petAge / 10)} days`;
  document.getElementById("footer-exp").textContent = `EXP: ${experience % 100}/100`;
  
  // Preserve customizations
  pet.style.background = petColor;
  pet.style.borderColor = petColor.replace('99', '66');
  if (petSize !== 'normal') {
    pet.classList.add(petSize);
  }
  
  if (hunger <= 30) {
    statusText.textContent = "I'm really hungry!";
    pet.className = "pet hungry " + petSize;
  } else if (happiness <= 30) {
    statusText.textContent = "I'm so bored...";
    pet.className = "pet bored " + petSize;
  } else if (energy <= 30) {
    statusText.textContent = "I'm sleepy...";
    pet.className = "pet tired " + petSize;
  } else if (hunger === 100 && happiness === 100 && energy === 100) {
    statusText.textContent = "I'm absolutely perfect!";
    pet.className = "pet perfect " + petSize;
  } else {
    statusText.textContent = "I'm feeling great!";
    pet.className = "pet happy " + petSize;
  }
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
  happiness = Math.min(100, happiness + 25);
  hunger = Math.max(0, hunger - 10);
  energy = Math.max(0, energy - 15);
  gainExperience(3);
  totalInteractions++;
  checkAchievements();
  addSparkle();
  updateDisplay();
}

function startMinigame() {
  document.getElementById('minigame').classList.remove('hidden');
  gameActive = true;
  gameScore = 0;
  ballX = 100;
  ballY = 10;
  ballSpeedX = 2;
  ballSpeedY = 2;
  document.getElementById('score').textContent = gameScore;
  gameLoop();
}

function endMinigame() {
  gameActive = false;
  document.getElementById('minigame').classList.add('hidden');
  happiness = Math.min(100, happiness + Math.floor(gameScore / 2));
  energy = Math.max(0, energy - 10);
  gainExperience(gameScore);
  updateDisplay();
}

function gameLoop() {
  if (!gameActive) return;
  
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  
  if (ballX <= 0 || ballX >= 188) ballSpeedX = -ballSpeedX;
  if (ballY <= 0) ballSpeedY = -ballSpeedY;
  
  if (ballY >= 100 && ballX >= paddleX - 20 && ballX <= paddleX + 20) {
    ballSpeedY = -ballSpeedY;
    gameScore++;
    document.getElementById('score').textContent = gameScore;
  }
  
  if (ballY >= 120) {
    endMinigame();
    return;
  }
  
  document.getElementById('ball').style.left = ballX + 'px';
  document.getElementById('ball').style.top = ballY + 'px';
  document.getElementById('paddle').style.left = paddleX + 'px';
  
  setTimeout(gameLoop, 50);
}

document.addEventListener('touchstart', function(e) {
  if (gameActive) {
    const gameArea = document.querySelector('.game-area');
    const rect = gameArea.getBoundingClientRect();
    const touch = e.touches[0];
    paddleX = Math.max(20, Math.min(180, touch.clientX - rect.left - 20));
  }
});

document.addEventListener('touchmove', function(e) {
  if (gameActive) {
    e.preventDefault();
    const gameArea = document.querySelector('.game-area');
    const rect = gameArea.getBoundingClientRect();
    const touch = e.touches[0];
    paddleX = Math.max(20, Math.min(180, touch.clientX - rect.left - 20));
  }
});

document.addEventListener('mousemove', function(e) {
  if (gameActive) {
    const gameArea = document.querySelector('.game-area');
    const rect = gameArea.getBoundingClientRect();
    paddleX = Math.max(20, Math.min(180, e.clientX - rect.left - 20));
  }
});

function sleepPet() {
  energy = Math.min(100, energy + 30);
  hunger = Math.max(0, hunger - 5);
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

function petPet() {
  happiness = Math.min(100, happiness + 15);
  health = Math.min(100, health + 5);
  gainExperience(1);
  totalInteractions++;
  checkAchievements();
  addSparkle();
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

function gainExperience(amount) {
  experience += amount;
  if (experience >= level * 100) {
    level++;
    experience = 0;
    health = Math.min(100, health + 20);
  }
}

function decreaseStats() {
  hunger = Math.max(0, hunger - Math.floor(Math.random() * 3) - 1);
  happiness = Math.max(0, happiness - Math.floor(Math.random() * 2) - 1);
  energy = Math.max(0, energy - Math.floor(Math.random() * 2) - 1);
  health = Math.max(0, health - Math.floor(Math.random() * 2));
  petAge++;
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
  updateDisplay();
  setInterval(decreaseStats, 8000);
  setInterval(updateUptime, 1000);
  addPetMessage("Hi! I'm Pengu! Talk to me!");
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
  const achievementDiv = document.createElement('div');
  achievementDiv.className = 'achievement';
  achievementDiv.textContent = achievement;
  achievementList.appendChild(achievementDiv);
}
