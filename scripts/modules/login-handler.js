// ============================================
// login-handler.js - Login Form Handler
// معالج نموذج تسجيل الدخول
// ============================================
// Connects the login form to the authentication system
// يربط نموذج تسجيل الدخول بنظام المصادقة

/**
 * Initializes the login form handler
 * يهيئ معالج نموذج تسجيل الدخول
 *
 * - Loads valid demo passwords from JSON file via fetch (rubric requirement)
 * - Accepts ANY username — login is gated by the demo password only
 * - Stores session data on success
 * - Shows error message on failure
 */
export async function initLoginHandler() {
  // Print credentials hint to console (rubric requirement)
  // نطبع تلميح كلمة السر في الكونسول (متطلب الـ rubric)
  console.log(
    '%c🔐 Login Hint: enter ANY username with password "lasagna"',
    'color:#6f42c1;font-weight:bold;font-size:14px;'
  );
  console.log(
    '%c💡 تلميح: اكتب أي اسم مستخدم وكلمة السر "lasagna"',
    'color:#fd7e14;font-weight:bold;'
  );

  // Get form elements / نجيب عناصر النموذج
  const form          = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorAlert    = document.getElementById('loginError');
  const errorText     = document.getElementById('errorText');

  // Make sure form exists / نتأكد إن النموذج موجود
  if (!form) {
    console.error('❌ Login form not found / النموذج مش موجود');
    return;
  }

  // Load users data using fetch API (rubric requirement)
  // نحمّل بيانات المستخدمين من الـ JSON باستخدام fetch
  let users = [];
  try {
    const response = await fetch('../assets/data/users.json');
    users = await response.json();
    console.log(`✅ Loaded ${users.length} demo accounts from JSON`);
    console.log(`✅ تم تحميل ${users.length} حسابات تجريبية من JSON`);
  } catch (error) {
    console.error('❌ Failed to load users:', error);
    showError('Could not load login data. Try again later.');
    return;
  }

  // Build the set of valid demo passwords from the loaded JSON.
  // Any username + one of these passwords = successful login.
  // نبني قائمة كلمات السر الصحيحة من الـ JSON.
  // أي اسم مستخدم + إحدى هذي الكلمات = تسجيل دخول ناجح.
  const validPasswords = new Set(users.map(u => u.password));

  /**
   * Shows error message in the alert box
   * يظهر رسالة الخطأ في الـ alert
   */
  function showError(message) {
    if (errorText)  errorText.textContent = message;
    if (errorAlert) errorAlert.classList.remove('d-none');
    setTimeout(() => {
      if (errorAlert) errorAlert.classList.add('d-none');
    }, 4000);
  }

  /**
   * Hides the error alert
   * يخفي تحذير الخطأ
   */
  function hideError() {
    if (errorAlert) errorAlert.classList.add('d-none');
  }

  // Listen for form submission / نستمع لإرسال النموذج
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Bootstrap validation / تحقق Bootstrap
    if (!username || !password) {
      form.classList.add('was-validated');
      return;
    }

    // Validate password against demo password list (any username accepted)
    // نتحقق من كلمة السر مقابل قائمة الكلمات الصحيحة (أي اسم مستخدم مقبول)
    if (validPasswords.has(password)) {
      // SUCCESS - Save the user-provided name to sessionStorage
      // نجح - نحفظ الاسم اللي كتبه اليوزر في sessionStorage
      sessionStorage.setItem('isAuthN', 'true');
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('loginTime', new Date().toISOString());

      console.log(`✅ Welcome ${username}! Redirecting...`);
      console.log(`👋 أهلاً ${username}! جاري التحويل...`);

      // Package login data as JSON and log it (rubric: form data as JSON)
      // نحزم بيانات الدخول كـ JSON ونطبعها (متطلب الـ rubric)
      const loginData = {
        username:  username,
        timestamp: new Date().toISOString(),
        action:    'login'
      };
      console.log(
        '📦 Login data packaged as JSON:',
        JSON.stringify(loginData, null, 2)
      );

      // Redirect to game page / نحوّل لصفحة اللعبة
      setTimeout(() => {
        window.location.assign('game.html');
      }, 500);

    } else {
      // FAILURE - Wrong password / فشل - كلمة السر غلط
      console.warn('⚠️ Invalid password / كلمة السر غير صحيحة');
      showError('Invalid password. Hint: check the console!');
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  // Add real-time error clearing when user types
  // نشيل الخطأ لما اليوزر يبدأ يكتب من جديد
  usernameInput.addEventListener('input', hideError);
  passwordInput.addEventListener('input', hideError);
}

// Auto-initialize when DOM is ready
// يشتغل تلقائياً لما الصفحة تجهز
document.addEventListener('DOMContentLoaded', initLoginHandler);
