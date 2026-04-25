// ============================================
// auth.js - Authentication Module
// ملف تسجيل الدخول والخروج
// ============================================

// This module handles user login state using sessionStorage
// هذا الموديول يدير حالة تسجيل دخول اليوزر باستخدام sessionStorage

/**
 * Checks if the user is currently authenticated
 * تشيك إذا اليوزر مسجل دخول حالياً
 * 
 * @returns {boolean} true if logged in, false if not
 */
export function isAuthN() {
  // Read the auth flag from sessionStorage and compare to "true"
  // نجيب قيمة isAuthN من sessionStorage ونقارنها بـ "true"
  return sessionStorage.getItem('isAuthN') === 'true';
}

/**
 * Redirects to login page if user is not authenticated
 * لو اليوزر مش مسجل دخول، نحوله لصفحة الـ login
 * 
 * Call this at the top of protected pages (game.html, leaderboard.html)
 * نستدعيها في بداية الصفحات المحمية (لعبة، ليدربورد)
 */
export function requireAuthN() {
  // If not authenticated, redirect to login
  // لو مش مسجل، نوديه لصفحة تسجيل الدخول
  if (!isAuthN()) {
    window.location.assign('./login.html');
  }
}

/**
 * Logs the user out by clearing all session data
 * يطلع اليوزر برا - يمسح كل البيانات
 */
export function logout() {
  // Clear all sessionStorage data (auth flag, username, etc.)
  // نمسح كل البيانات في sessionStorage
  sessionStorage.clear();
  
  // Send user back to home page
  // نرجعه للصفحة الرئيسية
  window.location.assign('../index.html');
}
