// ui.js - DOM manipulation helpers
export function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}
