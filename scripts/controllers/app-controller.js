// ============================================
// app-controller.js - Main Application Controller
// المتحكم الرئيسي للتطبيق
// ============================================

// Entry point for the home page (index.html)
// نقطة الدخول الرئيسية لصفحة الـ index

// Import authentication module
// نستورد موديول المصادقة
import { isAuthN } from '../modules/auth.js';

/**
 * Initializes the home page when DOM is ready
 * يهيئ الصفحة الرئيسية لما الـ DOM يكون جاهز
 */
function initHomePage() {
  // Welcome message in console (Easter Egg hint)
  // رسالة ترحيب في الكونسول (تلميح للمفاجأة)
  console.log(
    '%c🎮 Arcade Hub loaded! Type unlockSecret() for a surprise!',
    'color:#6f42c1;font-weight:bold;font-size:14px;'
  );
  
  // Check if user is already logged in
  // نشيك إذا اليوزر مسجل دخول
  if (isAuthN()) {
    // Show welcome back message
    // نعرض رسالة "أهلاً بعودتك"
    const username = sessionStorage.getItem('username');
    console.log(`👋 Welcome back, ${username}!`);
  }
}

/**
 * Easter egg function - exposed globally for console access
 * فنكشن المفاجأة - متاحة عالمياً من الكونسول
 */
window.unlockSecret = function() {
  // Toggle a fun rainbow theme on body
  // نضيف/نشيل ثيم قوس قزح من الـ body
  document.body.classList.toggle('theme-rainbow');
  console.log('%c🌈 Rainbow theme toggled!', 'color:#fd7e14;font-weight:bold;');
};

// Run initialization when page loads
// نشغل دالة التهيئة لما الصفحة تفتح
document.addEventListener('DOMContentLoaded', initHomePage);
