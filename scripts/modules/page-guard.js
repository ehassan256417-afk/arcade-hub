// ============================================
// page-guard.js - Page Protection & Logout
// حماية الصفحات وتسجيل الخروج
// ============================================
// Used in protected pages (game.html, leaderboard.html)
// يستخدم في الصفحات المحمية (لعبة، ليدربورد)

import { isAuthN, requireAuthN, logout } from './auth.js';

/**
 * Initializes page protection - redirects to login if not authenticated
 * يهيئ حماية الصفحة - يحوّل لصفحة الدخول لو مش مسجل
 *
 * Also displays username in navbar and wires up logout button
 * كذلك يعرض اسم اليوزر ويربط زر تسجيل الخروج
 */
export function initPageGuard() {
  // First, check authentication / أول شي نشيك المصادقة
  if (!isAuthN()) {
    console.warn('⚠️ Not authenticated - redirecting to login');
    console.warn('⚠️ مش مسجل دخول - جاري التحويل');
    requireAuthN();
    return;
  }

  // Get username from sessionStorage / نجيب اسم اليوزر
  const username = sessionStorage.getItem('username') || 'Guest';

  // Welcome message in console / رسالة ترحيب
  console.log(
    `%c👋 Welcome back, ${username}!`,
    'color:#6f42c1;font-weight:bold;font-size:14px;'
  );

  // Display username in navbar (if element exists)
  // نعرض اسم اليوزر في الـ navbar
  displayUsername(username);

  // Wire up logout button (if exists)
  // نربط زر تسجيل الخروج
  setupLogoutButton();
}

/**
 * Updates the username display in the navbar
 * يحدّث عرض اسم اليوزر في الـ navbar
 *
 * @param {string} username - The user's name to display
 */
function displayUsername(username) {
  // Find the username element / ندور على عنصر اليوزر
  const userEl = document.getElementById('currentUser');

  // Update text if element exists / نحدّث النص لو موجود
  if (userEl) {
    userEl.textContent = username;
  }
}

/**
 * Sets up the logout button click handler
 * يجهز زر تسجيل الخروج
 */
function setupLogoutButton() {
  // Find the logout button / ندور على زر الخروج
  const logoutBtn = document.getElementById('logoutBtn');

  // Make sure it exists / نتأكد إنه موجود
  if (!logoutBtn) {
    console.warn('⚠️ Logout button not found on this page');
    return;
  }

  // Add click event handler / نضيف معالج النقر
  logoutBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Get username before logout for the message
    // نجيب الاسم قبل الخروج للرسالة
    const username = sessionStorage.getItem('username') || 'User';

    // Confirm with user / نتأكد من اليوزر
    const confirmed = confirm(
      `Logout, ${username}? / تسجيل خروج، ${username}؟`
    );

    if (confirmed) {
      console.log(`👋 Goodbye, ${username}!`);
      console.log(`👋 مع السلامة، ${username}!`);

      // Package logout data as JSON for rubric requirement
      // نحزم بيانات الخروج كـ JSON
      const logoutData = {
        username: username,
        timestamp: new Date().toISOString(),
        action: 'logout',
        sessionDuration: getSessionDuration()
      };
      console.log('📦 Logout data packaged as JSON:', JSON.stringify(logoutData, null, 2));

      // Call logout function from auth.js / نستدعي logout
      logout();
    }
  });
}

/**
 * Calculates how long the user was logged in
 * يحسب كم مدة الجلسة
 *
 * @returns {string} Duration in human-readable format
 */
function getSessionDuration() {
  // Get login time from sessionStorage / نجيب وقت الدخول
  const loginTime = sessionStorage.getItem('loginTime');

  if (!loginTime) return 'unknown';

  // Calculate difference in seconds / نحسب الفرق بالثواني
  const loginDate = new Date(loginTime);
  const now = new Date();
  const diffSeconds = Math.floor((now - loginDate) / 1000);

  // Format the duration / نهيّئ الوقت
  if (diffSeconds < 60) {
    return `${diffSeconds} seconds`;
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)} minutes`;
  } else {
    return `${Math.floor(diffSeconds / 3600)} hours`;
  }
}

// Auto-initialize when page loads / يشتغل تلقائياً
document.addEventListener('DOMContentLoaded', initPageGuard);
