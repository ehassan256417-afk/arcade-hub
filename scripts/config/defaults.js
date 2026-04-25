// ============================================
// defaults.js - Default Configuration
// الإعدادات الافتراضية للتطبيق
// ============================================

// All app-wide default values are stored here
// كل القيم الافتراضية للتطبيق تتحط هنا

/**
 * Default settings used across the app
 * الإعدادات الافتراضية المستخدمة في التطبيق
 */
export const DEFAULTS = {
  // Default game difficulty level
  // مستوى الصعوبة الافتراضي
  difficulty: 'medium',
  
  // Default visual theme (light/dark)
  // الثيم الافتراضي (فاتح/غامق)
  theme: 'light',
  
  // Maximum number of leaderboard entries to display
  // أقصى عدد من النتائج يظهر في الليدربورد
  maxLeaderboardEntries: 10,
  
  // Animation speed in milliseconds
  // سرعة الأنميشن بالملي ثانية
  animationSpeed: 300
};

/**
 * Difficulty levels with their settings
 * مستويات الصعوبة وإعداداتها
 */
export const DIFFICULTY_LEVELS = {
  easy: { pairs: 4, multiplier: 1 },
  medium: { pairs: 8, multiplier: 2 },
  hard: { pairs: 12, multiplier: 3 }
};
