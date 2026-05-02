// ============================================
// app-controller.js - Main Application Controller
// المتحكم الرئيسي للتطبيق
// ============================================
// Entry point for the home page (index.html)
// نقطة الدخول الرئيسية لصفحة الـ index

import { isAuthN, logout } from '../modules/auth.js';

/**
 * Initializes the home page when DOM is ready
 * يهيئ الصفحة الرئيسية لما الـ DOM يكون جاهز
 */
function initHomePage() {
  console.log(
    '%c🎮 Arcade Hub loaded! Type unlockSecret() for a surprise!',
    'color:#6f42c1;font-weight:bold;font-size:14px;'
  );

  updateNavbarForAuthState();
  setupLogoutButton();
}

/**
 * Toggles navbar elements based on whether the user is logged in.
 * يبدّل عناصر شريط التنقل حسب إذا كان اليوزر مسجل أو لا.
 */
function updateNavbarForAuthState() {
  const playItem      = document.getElementById('navPlayItem');
  const loginItem     = document.getElementById('navLoginItem');
  const userItem      = document.getElementById('navUserItem');
  const logoutItem    = document.getElementById('navLogoutItem');
  const heroLoginBtn  = document.getElementById('heroLoginBtn');
  const heroPlayBtn   = document.getElementById('heroPlayBtn');
  const currentUserEl = document.getElementById('currentUser');

  if (isAuthN()) {
    // LOGGED IN / مسجل دخول
    const username = sessionStorage.getItem('username') || 'Guest';

    if (playItem)      playItem.classList.remove('d-none');
    if (userItem)      userItem.classList.remove('d-none');
    if (logoutItem)    logoutItem.classList.remove('d-none');
    if (loginItem)     loginItem.classList.add('d-none');
    if (heroLoginBtn)  heroLoginBtn.classList.add('d-none');
    if (heroPlayBtn)   heroPlayBtn.classList.remove('d-none');
    if (currentUserEl) currentUserEl.textContent = username;

    console.log('AuthN session value:', sessionStorage.getItem('isAuthN'));
    console.log('isAuthN() result:', isAuthN());
    console.log(`👋 Welcome back, ${username}!`);

  } else {
    // LOGGED OUT / مش مسجل
    if (playItem)     playItem.classList.add('d-none');
    if (userItem)     userItem.classList.add('d-none');
    if (logoutItem)   logoutItem.classList.add('d-none');
    if (loginItem)    loginItem.classList.remove('d-none');
    if (heroLoginBtn) heroLoginBtn.classList.remove('d-none');
    if (heroPlayBtn)  heroPlayBtn.classList.add('d-none');
  }
}

/**
 * Wires up the logout button on the home page.
 * يربط زر تسجيل الخروج في الصفحة الرئيسية.
 */
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const username = sessionStorage.getItem('username') || 'User';

    const confirmed = confirm(
      `Logout, ${username}? / تسجيل خروج، ${username}؟`
    );
    if (!confirmed) return;

    console.log(`👋 Goodbye, ${username}!`);
    console.log(`👋 مع السلامة، ${username}!`);

    const logoutData = {
      username:        username,
      timestamp:       new Date().toISOString(),
      action:          'logout',
      sessionDuration: getSessionDuration()
    };

    console.log(
      '📦 Logout data packaged as JSON:',
      JSON.stringify(logoutData, null, 2)
    );

    logout();
  });
}

/**
 * Calculates how long the user has been logged in.
 * يحسب كم مدة الجلسة الحالية.
 */
function getSessionDuration() {
  const loginTime = sessionStorage.getItem('loginTime');
  if (!loginTime) return 'unknown';

  const diffSeconds = Math.floor(
    (new Date() - new Date(loginTime)) / 1000
  );

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds`;
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)} minutes`;
  } else {
    return `${Math.floor(diffSeconds / 3600)} hours`;
  }
}

/**
 * Easter egg function - exposed globally for console access
 * فنكشن المفاجأة - متاحة عالمياً من الكونسول
 */
window.unlockSecret = function () {
  document.body.classList.toggle('theme-rainbow');
  console.log('%c🌈 Rainbow theme toggled!', 'color:#fd7e14;font-weight:bold;');
};

document.addEventListener('DOMContentLoaded', initHomePage);
