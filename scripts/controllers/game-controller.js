// ============================================
// game-controller.js - Game Page Controller
// متحكم صفحة اللعبة
// ============================================
// Coordinates the game UI with the game engine
// يربط واجهة اللعبة بمحرك اللعبة

import { startGame } from '../modules/game-engine.js';

/**
 * Initializes the game page
 * يهيئ صفحة اللعبة
 */
function initGamePage() {
  console.log('%c🎮 Game page loaded',
    'color:#6f42c1;font-weight:bold;font-size:14px;');

  // Get UI elements / نجيب عناصر الواجهة
  const resetBtn = document.getElementById('resetBtn');
  const difficultySelect = document.getElementById('difficultySelect');

  // Make sure elements exist / نتأكد إنهم موجودين
  if (!resetBtn || !difficultySelect) {
    console.error('❌ Game UI elements missing / عناصر الواجهة مش موجودة');
    return;
  }

  // Start initial game with default difficulty / نبدأ اللعبة الأولى
  startGame(difficultySelect.value);

  // Handle "New Game" button click / نعالج زر اللعبة الجديدة
  resetBtn.addEventListener('click', function () {
    const difficulty = difficultySelect.value;
    console.log(`🔄 New game starting (${difficulty})...`);
    startGame(difficulty);
  });

  // Handle difficulty change / نعالج تغيير الصعوبة
  difficultySelect.addEventListener('change', function () {
    const newDifficulty = difficultySelect.value;
    console.log(`⚙️ Difficulty changed to: ${newDifficulty}`);

    // Confirm before restarting / نتأكد قبل إعادة البداية
    const confirmed = confirm(
      `Switch to ${newDifficulty} difficulty? / تغيير للصعوبة ${newDifficulty}؟\n\nThis will restart the current game / هذا راح يعيد اللعبة الحالية`
    );

    if (confirmed) {
      startGame(newDifficulty);
    } else {
      // Revert the select / نرجع الاختيار
      difficultySelect.value = difficultySelect.dataset.previous || 'medium';
    }
  });

  // Save current difficulty for revert / نحفظ الصعوبة الحالية
  difficultySelect.dataset.previous = difficultySelect.value;
}

// Auto-initialize when DOM ready / يشتغل تلقائياً
document.addEventListener('DOMContentLoaded', initGamePage);
