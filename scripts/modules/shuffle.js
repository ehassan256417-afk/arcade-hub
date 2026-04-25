// ============================================
// shuffle.js - Fisher-Yates Shuffle Algorithm
// خوارزمية فيشر-ييتس لخلط المصفوفات
// ============================================

/**
 * Shuffles array elements randomly using Fisher-Yates algorithm
 * يخلط عناصر المصفوفة بشكل عشوائي
 * 
 * Why Fisher-Yates? It's the fairest shuffle - every order has equal chance
 * ليش فيشر-ييتس؟ لأنها أعدل خوارزمية - كل ترتيب له نفس الاحتمال
 * 
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled array (original is not modified)
 */
export function shuffle(array) {
  // Make a copy so we don't modify the original array
  // ننسخ المصفوفة عشان ما نعدل الأصلية
  const arr = [...array];
  
  // Loop from the last element to the second
  // نلف من آخر عنصر للثاني
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index between 0 and i (inclusive)
    // نختار رقم عشوائي بين 0 و i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at positions i and j using destructuring
    // نبدل العنصرين في الموقع i و j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  
  return arr;
}
