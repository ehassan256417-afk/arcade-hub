// auth.js - login/logout + sessionStorage
// Will be ported from CIS-376-MID-TERM-PROJECT

export function isAuthN() {
  return sessionStorage.getItem('isAuthN') === 'true';
}

export function requireAuthN() {
  if (!isAuthN()) {
    window.location.assign('./login.html');
  }
}

export function logout() {
  sessionStorage.clear();
  window.location.assign('../index.html');
}
