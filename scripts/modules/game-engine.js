// ============================================
// game-engine.js - Memory Match Game Engine
// محرك لعبة الذاكرة والتطابق
// ============================================
// Core game logic: card flipping, matching, scoring, timing
// منطق اللعبة: قلب الورق، التطابق، النقاط، الوقت

import { shuffle } from './shuffle.js';
import { DIFFICULTY_LEVELS } from '../config/defaults.js';

// ============================================
// EMOJI POOL - مجموعة الإيموجيات
// ============================================
// Pool of emoji pairs available for the game
// مجموعة الإيموجيات المتاحة للعبة
const EMOJI_POOL = [
  { emoji: '😀', label: 'grinning face' },
  { emoji: '🎉', label: 'party popper' },
  { emoji: '🍎', label: 'red apple' },
  { emoji: '⚽', label: 'soccer ball' },
  { emoji: '🚗', label: 'red car' },
  { emoji: '🐶', label: 'dog face' },
  { emoji: '🌟', label: 'glowing star' },
  { emoji: '🦋', label: 'butterfly' },
  { emoji: '🍕', label: 'pizza slice' },
  { emoji: '🎸', label: 'guitar' },
  { emoji: '🌈', label: 'rainbow' },
  { emoji: '🦁', label: 'lion face' }
];

// ============================================
// GAME STATE - حالة اللعبة
// ============================================
// All game state variables grouped together
// كل متغيرات حالة اللعبة في مكان واحد
const gameState = {
  score: 0,
  attempts: 0,
  matchedPairs: 0,
  totalPairs: 0,
  firstCard: null,
  secondCard: null,
  isLocked: false,
  isStarted: false,
  elapsedSeconds: 0,
  timerInterval: null,
  difficulty: 'medium'
};

// ============================================
// PUBLIC API - الواجهة الخارجية
// ============================================

/**
 * Initializes a new game
 * يبدأ لعبة جديدة
 *
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 */
export function startGame(difficulty = 'medium') {
  // Reset all game state / نصفّر كل حالة اللعبة
  resetState();
  gameState.difficulty = difficulty;

  // Get pair count based on difficulty / نجيب عدد الأزواج حسب الصعوبة
  const config = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.medium;
  gameState.totalPairs = config.pairs;

  // Build the deck and render / نبني الورق ونعرضه
  const deck = buildDeck(config.pairs);
  renderBoard(deck);

  // Update displays / نحدّث العرض
  updateAllDisplays();

  console.log(`%c🎮 Game started! Difficulty: ${difficulty}`,
    'color:#6f42c1;font-weight:bold;');
  console.log(`🎯 Match ${config.pairs} pairs to win! / اطبق ${config.pairs} زوج عشان تفوز`);
}

/**
 * Resets all game state to initial values
 * يصفّر حالة اللعبة للبداية
 */
function resetState() {
  // Stop any running timer / نوقف أي تايمر شغال
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }

  // Reset all values / نصفّر كل القيم
  gameState.score = 0;
  gameState.attempts = 0;
  gameState.matchedPairs = 0;
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isLocked = false;
  gameState.isStarted = false;
  gameState.elapsedSeconds = 0;
  gameState.timerInterval = null;
}

/**
 * Builds the shuffled deck of cards
 * يبني الورق المخلوط
 *
 * @param {number} pairCount - Number of pairs needed
 * @returns {Array} Shuffled deck (each emoji appears twice)
 */
function buildDeck(pairCount) {
  // Pick random emojis from pool / نختار إيموجيات عشوائية
  const selected = shuffle(EMOJI_POOL).slice(0, pairCount);

  // Duplicate each (one for each pair) / نكرر كل إيموجي مرتين
  const pairs = [...selected, ...selected];

  // Shuffle the pairs / نخلطهم
  return shuffle(pairs);
}

/**
 * Renders the cards on the game board
 * يعرض الورق على لوحة اللعبة
 *
 * @param {Array} deck - The shuffled deck
 */
function renderBoard(deck) {
  const board = document.getElementById('gameBoard');
  if (!board) {
    console.error('❌ Game board not found / لوحة اللعبة مش موجودة');
    return;
  }

  // Clear existing content / نمسح المحتوى القديم
  board.innerHTML = '';
  board.className = 'row g-2 g-md-3 justify-content-center game-board';

  // Create card for each emoji / نعمل كرت لكل إيموجي
  deck.forEach((card, index) => {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-3 col-sm-2';

    const cardBtn = document.createElement('button');
    cardBtn.className = 'memory-card w-100';
    cardBtn.dataset.emoji = card.emoji;
    cardBtn.dataset.label = card.label;
    cardBtn.dataset.index = index;
    cardBtn.setAttribute('aria-label', `Hidden card ${index + 1}. Click to reveal.`);
    cardBtn.setAttribute('aria-pressed', 'false');

    // Card faces (front and back) / وجوه الكرت
    cardBtn.innerHTML = `
      <span class="card-face card-back" aria-hidden="true">
        <i class="bi bi-question-circle"></i>
      </span>
      <span class="card-face card-front" aria-hidden="true">${card.emoji}</span>
    `;

    // Add click handler / نضيف معالج النقر
    cardBtn.addEventListener('click', handleCardClick);

    cardCol.appendChild(cardBtn);
    board.appendChild(cardCol);
  });
}

/**
 * Handles when a card is clicked
 * يعالج لما يضغط على كرت
 *
 * @param {Event} event - The click event
 */
function handleCardClick(event) {
  const card = event.currentTarget;

  // Ignore if locked, already flipped, or matched
  // نتجاهل لو مقفل أو منقلب أو متطابق
  if (gameState.isLocked) return;
  if (card === gameState.firstCard) return;
  if (card.classList.contains('is-matched')) return;
  if (card.classList.contains('is-flipped')) return;

  // Start timer on first click / نبدأ التايمر مع أول نقرة
  if (!gameState.isStarted) {
    startTimer();
    gameState.isStarted = true;
  }

  // Flip the card / نقلب الكرت
  flipCard(card, true);

  // First card of the pair / أول كرت
  if (!gameState.firstCard) {
    gameState.firstCard = card;
    return;
  }

  // Second card / الكرت الثاني
  gameState.secondCard = card;
  gameState.attempts++;
  updateDisplay('attemptsDisplay', gameState.attempts);
  gameState.isLocked = true;

  // Check for match / نشيك التطابق
  checkMatch();
}

/**
 * Flips a card to show or hide it
 * يقلب الكرت
 */
function flipCard(card, show) {
  if (show) {
    card.classList.add('is-flipped');
    card.setAttribute('aria-pressed', 'true');
    card.setAttribute('aria-label', `${card.dataset.label} card revealed`);
  } else {
    card.classList.remove('is-flipped');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', 'Hidden card. Click to reveal.');
  }
}

/**
 * Checks if the two flipped cards match
 * يشيك إذا الكرتين متطابقين
 */
function checkMatch() {
  const { firstCard, secondCard } = gameState;
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

/**
 * Handles a successful match
 * يعالج التطابق الناجح
 */
function handleMatch() {
  const { firstCard, secondCard } = gameState;

  // Mark both as matched / نعلّم الاتنين كمتطابقين
  [firstCard, secondCard].forEach(card => {
    card.classList.add('is-matched');
    card.disabled = true;
    card.setAttribute('aria-label', `${card.dataset.label} - matched!`);
  });

  // Award points (more points for fewer attempts) / نضيف نقاط
  const pointsEarned = Math.max(10, 50 - gameState.attempts);
  gameState.score += pointsEarned;
  gameState.matchedPairs++;

  // Update displays / نحدّث العرض
  updateDisplay('scoreDisplay', gameState.score);
  updateProgress();

  // Reset for next pair / نصفّر للزوج الجاي
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isLocked = false;

  console.log(`✨ Match! +${pointsEarned} points (Total: ${gameState.score})`);

  // Check for win / نشيك الفوز
  if (gameState.matchedPairs === gameState.totalPairs) {
    handleWin();
  }
}

/**
 * Handles a mismatch (cards don't match)
 * يعالج عدم التطابق
 */
function handleMismatch() {
  const { firstCard, secondCard } = gameState;

  // Wait 1 second then flip back / ننتظر ثانية ونقلبهم
  setTimeout(() => {
    flipCard(firstCard, false);
    flipCard(secondCard, false);
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.isLocked = false;
  }, 1000);
}

/**
 * Handles the win condition
 * يعالج حالة الفوز
 */
function handleWin() {
  // Stop timer / نوقف التايمر
  clearInterval(gameState.timerInterval);

  // Save best score if better / نحفظ أحسن نتيجة لو أفضل
  const previousBest = Number(sessionStorage.getItem('bestScore') || 0);
  if (gameState.score > previousBest) {
    sessionStorage.setItem('bestScore', String(gameState.score));
    updateDisplay('bestScoreDisplay', gameState.score);
    console.log(`🏆 NEW BEST SCORE! ${gameState.score}`);
  }

  // Show victory message / نعرض رسالة الفوز
  const username = sessionStorage.getItem('username') || 'Player';
  const message = `🎉 You won, ${username}! Score: ${gameState.score} | Time: ${gameState.elapsedSeconds}s`;

  console.log(`%c${message}`, 'color:#198754;font-weight:bold;font-size:16px;');

  const statusEl = document.getElementById('statusMessage');
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.className = 'text-success fw-bold fs-5';
  }

  // Package game data as JSON / نحزم بيانات اللعبة كـ JSON
  const gameResult = {
    player: username,
    score: gameState.score,
    attempts: gameState.attempts,
    timeSeconds: gameState.elapsedSeconds,
    difficulty: gameState.difficulty,
    timestamp: new Date().toISOString()
  };
  console.log('📦 Game result packaged as JSON:', JSON.stringify(gameResult, null, 2));

  // Show celebration after short delay / نعرض الاحتفال
  setTimeout(() => {
    alert(`🎉 Congratulations ${username}!\n\nScore: ${gameState.score}\nAttempts: ${gameState.attempts}\nTime: ${gameState.elapsedSeconds}s\n\nClick "New Game" to play again!`);
  }, 500);
}

/**
 * Starts the game timer
 * يبدأ تايمر اللعبة
 */
function startTimer() {
  gameState.timerInterval = setInterval(() => {
    gameState.elapsedSeconds++;
    updateDisplay('timerDisplay', `${gameState.elapsedSeconds}s`);
  }, 1000);
}

/**
 * Updates a display element by ID
 * يحدّث عنصر العرض
 */
function updateDisplay(elementId, value) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = value;
}

/**
 * Updates all displays at once
 * يحدّث كل العرض دفعة وحدة
 */
function updateAllDisplays() {
  updateDisplay('scoreDisplay', gameState.score);
  updateDisplay('attemptsDisplay', gameState.attempts);
  updateDisplay('timerDisplay', `${gameState.elapsedSeconds}s`);

  // Load best score from sessionStorage / نجيب أحسن نتيجة
  const bestScore = sessionStorage.getItem('bestScore');
  updateDisplay('bestScoreDisplay', bestScore || '-');

  // Reset progress / نصفّر التقدم
  updateProgress();

  // Clear status / نمسح الحالة
  const statusEl = document.getElementById('statusMessage');
  if (statusEl) {
    statusEl.textContent = 'Click any card to start! / اضغط على أي كرت للبداية';
    statusEl.className = 'text-muted';
  }
}

/**
 * Updates the progress bar
 * يحدّث شريط التقدم
 */
function updateProgress() {
  const percent = gameState.totalPairs > 0
    ? Math.round((gameState.matchedPairs / gameState.totalPairs) * 100)
    : 0;

  const bar = document.getElementById('progressBar');
  if (bar) {
    bar.style.setProperty('--progress', `${percent}%`);
    bar.setAttribute('aria-valuenow', percent);
  }
}
