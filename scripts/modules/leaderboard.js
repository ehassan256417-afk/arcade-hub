// ============================================
// leaderboard.js - Leaderboard Module
// موديول الليدربورد (لوحة المتصدرين)
// ============================================

// Loads, displays, and manages the leaderboard data
// يحمّل ويعرض ويدير بيانات الليدربورد

/**
 * Fetches leaderboard data from JSON file
 * يجيب بيانات الليدربورد من ملف JSON
 * 
 * @returns {Promise<Array>} Array of player score objects
 */
export async function loadLeaderboard() {
  // Use fetch API to load the JSON file
  // نستخدم fetch API عشان نحمل ملف الـ JSON
  const response = await fetch('../assets/data/leaderboard.json');
  
  // Convert the response to JavaScript object
  // نحول الـ response لـ JavaScript object
  return await response.json();
}

/**
 * Sorts leaderboard entries by score (highest first)
 * يرتب الليدربورد حسب النقاط (الأعلى أول)
 * 
 * @param {Array} entries - Leaderboard entries
 * @returns {Array} Sorted entries
 */
export function sortByScore(entries) {
  // Create a copy and sort it (don't modify original)
  // ننسخ المصفوفة ونرتبها بدون ما نعدل الأصلية
  return [...entries].sort((a, b) => b.score - a.score);
}

/**
 * Filters entries by difficulty level
 * يفلتر النتائج حسب مستوى الصعوبة
 * 
 * @param {Array} entries - All entries
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array} Filtered entries
 */
export function filterByDifficulty(entries, difficulty) {
  // If 'all' selected, return everything
  // لو "all" مختار، نرجع كل شي
  if (difficulty === 'all') return entries;
  
  // Otherwise filter by difficulty
  // غير كذا نفلتر حسب الصعوبة
  return entries.filter(entry => entry.difficulty === difficulty);
}

/**
 * Searches entries by player name
 * يبحث عن اللاعب بالاسم
 * 
 * @param {Array} entries - All entries
 * @param {string} searchTerm - Player name to search for
 * @returns {Array} Matching entries
 */
export function searchByPlayer(entries, searchTerm) {
  // Convert search term to lowercase for case-insensitive search
  // نحول كلمة البحث لـ lowercase عشان البحث ما يفرق بين الكابتل والصغير
  const term = searchTerm.toLowerCase().trim();
  
  // If empty search, return all
  // لو البحث فاضي، نرجع كل شي
  if (!term) return entries;
  
  // Filter entries where player name contains search term
  // نفلتر النتائج اللي اسم اللاعب فيها يحتوي على كلمة البحث
  return entries.filter(entry => 
    entry.player.toLowerCase().includes(term)
  );
}
