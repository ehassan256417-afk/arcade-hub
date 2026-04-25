// ============================================
// leaderboard-controller.js - Leaderboard Page Controller
// متحكم صفحة الليدربورد
// ============================================
// Loads, renders, and displays leaderboard data
// يحمّل ويعرض بيانات الليدربورد

import { loadLeaderboard, sortByScore } from '../modules/leaderboard.js';

// Store all entries globally for filtering later
// نحفظ كل النتائج عالمياً عشان الفلترة لاحقاً
let allEntries = [];

/**
 * Initializes the leaderboard page
 * يهيئ صفحة الليدربورد
 */
async function initLeaderboardPage() {
  console.log('%c🏆 Leaderboard page loading...',
    'color:#6f42c1;font-weight:bold;font-size:14px;');

  try {
    // Fetch leaderboard data from JSON / نجيب البيانات من الـ JSON
    allEntries = await loadLeaderboard();

    console.log(`✅ Loaded ${allEntries.length} entries from JSON`);
    console.log(`✅ تم تحميل ${allEntries.length} نتيجة من الـ JSON`);

    // Sort by score (highest first) / نرتب الأعلى أول
    const sorted = sortByScore(allEntries);

    // Render the table / نعرض الجدول
    renderLeaderboard(sorted);

    // Update statistics / نحدّث الإحصائيات
    updateStatistics(allEntries);
  } catch (error) {
    console.error('❌ Failed to load leaderboard:', error);
    showErrorMessage('Could not load leaderboard data');
  }
}

/**
 * Renders entries in the leaderboard table
 * يعرض النتائج في الجدول
 *
 * @param {Array} entries - Sorted leaderboard entries
 */
function renderLeaderboard(entries) {
  const tbody = document.getElementById('leaderboardBody');
  if (!tbody) {
    console.error('❌ Leaderboard tbody not found');
    return;
  }

  // Clear existing rows / نمسح الصفوف القديمة
  tbody.innerHTML = '';

  // If no entries, show empty message / لو ما فيه نتائج
  if (entries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4">
          <i class="bi bi-inbox display-6"></i>
          <p class="mt-2 mb-0">No scores yet — be the first! / ما فيه نقاط - كن الأول!</p>
        </td>
      </tr>
    `;
    return;
  }

  // Create a row for each entry / نسوي صف لكل نتيجة
  entries.forEach((entry, index) => {
    const row = document.createElement('tr');

    // Get medal emoji for top 3 / نضيف ميدالية للأول 3
    const medal = getMedalForRank(index);

    // Get badge color for difficulty / لون الصعوبة
    const difficultyBadge = getDifficultyBadge(entry.difficulty);

    // Format the date / نهيّئ التاريخ
    const formattedDate = formatDate(entry.timestamp);

    row.innerHTML = `
      <td class="fw-bold">${medal} ${index + 1}</td>
      <td>
        <i class="bi bi-person-circle text-primary"></i>
        ${escapeHtml(entry.player)}
      </td>
      <td>
        <span class="badge bg-success fs-6">${entry.score}</span>
      </td>
      <td>${difficultyBadge}</td>
      <td class="text-muted small">${formattedDate}</td>
    `;

    tbody.appendChild(row);
  });
}

/**
 * Updates the statistics cards
 * يحدّث كروت الإحصائيات
 *
 * @param {Array} entries - All leaderboard entries
 */
function updateStatistics(entries) {
  // Total Players / إجمالي اللاعبين
  const totalEl = document.getElementById('totalPlayers');
  if (totalEl) totalEl.textContent = entries.length;

  // Highest Score / أعلى نتيجة
  if (entries.length > 0) {
    const scores = entries.map(e => e.score);
    const highest = Math.max(...scores);
    const highestEl = document.getElementById('highestScore');
    if (highestEl) highestEl.textContent = highest;

    // Average Score / المعدل
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / scores.length);
    const avgEl = document.getElementById('averageScore');
    if (avgEl) avgEl.textContent = average;

    console.log(`📊 Stats: ${entries.length} players, highest: ${highest}, avg: ${average}`);
  } else {
    // No entries - reset to zero / صفّر لو ما فيه نتائج
    const highestEl = document.getElementById('highestScore');
    const avgEl = document.getElementById('averageScore');
    if (highestEl) highestEl.textContent = 0;
    if (avgEl) avgEl.textContent = 0;
  }
}

/**
 * Returns medal emoji for top 3 ranks
 * يرجع ميدالية للأول 3
 */
function getMedalForRank(index) {
  if (index === 0) return '🥇';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  return '';
}

/**
 * Returns Bootstrap badge HTML for difficulty
 * يرجع badge للصعوبة
 */
function getDifficultyBadge(difficulty) {
  const badges = {
    easy: '<span class="badge bg-info">Easy</span>',
    medium: '<span class="badge bg-warning text-dark">Medium</span>',
    hard: '<span class="badge bg-danger">Hard</span>'
  };
  return badges[difficulty] || '<span class="badge bg-secondary">Unknown</span>';
}

/**
 * Formats ISO date to readable format
 * يهيّئ التاريخ لشكل مقروء
 */
function formatDate(isoDate) {
  if (!isoDate) return 'Unknown';

  try {
    const date = new Date(isoDate);
    // Format: "Apr 24, 2026" / تاريخ مختصر
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoDate;
  }
}

/**
 * Escapes HTML to prevent XSS attacks
 * نحمي من XSS باستبدال الرموز الخطرة
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Shows error message in the table
 * يظهر رسالة خطأ
 */
function showErrorMessage(message) {
  const tbody = document.getElementById('leaderboardBody');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger py-4">
          <i class="bi bi-exclamation-triangle display-6"></i>
          <p class="mt-2 mb-0">${message}</p>
        </td>
      </tr>
    `;
  }
}

// Auto-initialize when DOM ready / يشتغل تلقائياً
document.addEventListener('DOMContentLoaded', initLeaderboardPage);
