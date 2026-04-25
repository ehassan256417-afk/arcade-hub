// ============================================
// ui.js - DOM Manipulation Helpers
// دوال مساعدة للتعامل مع الـ DOM
// ============================================

/**
 * Sets the text content of an element by its ID
 * يغير النص في عنصر معين عن طريق الـ ID
 * 
 * @param {string} elementId - The HTML element's id
 * @param {string} text - The text to display
 */
export function setText(elementId, text) {
  // Find the element in the page by its ID
  // ندور على العنصر في الصفحة بالـ ID
  const el = document.getElementById(elementId);
  
  // If element exists, update its text
  // لو العنصر موجود، نغير نصه
  if (el) el.textContent = text;
}

/**
 * Shows or hides an element by toggling a CSS class
 * يظهر أو يخفي عنصر بإضافة/إزالة كلاس
 * 
 * @param {string} elementId - The element's id
 * @param {boolean} show - true to show, false to hide
 */
export function toggleVisibility(elementId, show) {
  // Get the element from DOM
  // نجيب العنصر من الـ DOM
  const el = document.getElementById(elementId);
  
  // Add or remove the 'd-none' Bootstrap class
  // نضيف أو نشيل كلاس d-none من Bootstrap
  if (el) {
    if (show) {
      el.classList.remove('d-none');
    } else {
      el.classList.add('d-none');
    }
  }
}
