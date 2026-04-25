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
 * - Loads users from JSON file
 * - Listens for form submission
 * - Validates credentials
 * - Stores session data on success
 * - Shows error message on failure
 */
export async function initLoginHandler() {
    // Print credentials hint to console (rubric requirement)
  // نطبع تلميح كلمة السر في الكونسول (متطلب الـ rubric)
  console.log(
        '%c🔐 Login Hint: try username "hassan" or "player1" with password "lasagna"',
        'color:#6f42c1;font-weight:bold;font-size:14px;'
      );
    console.log(
          '%c💡 تلميح: استخدم اسم "hassan" أو "player1" وكلمة السر "lasagna"',
          'color:#fd7e14;font-weight:bold;'
        );

  // Get form elements / نجيب عناصر النموذج
  const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorAlert = document.getElementById('loginError');
    const errorText = document.getElementById('errorText');

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
          console.log(`✅ Loaded ${users.length} users / حُملت ${users.length} مستخدمين`);
    } catch (error) {
          console.error('❌ Failed to load users:', error);
          showError('Could not load user data. Try again later.');
          return;
    }

  /**
     * Shows error message in the alert box
     * يظهر رسالة الخطأ في الـ alert
     */
  function showError(message) {
        // Update error text and show alert / نحدث النص ونظهر التحذير
      if (errorText) errorText.textContent = message;
        if (errorAlert) errorAlert.classList.remove('d-none');

      // Hide after 4 seconds / نخفيها بعد 4 ثواني
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
        // Prevent default form submission / نمنع الإرسال الافتراضي
                            event.preventDefault();

                            // Hide any previous errors / نخفي أي خطأ قديم
                            hideError();

                            // Get input values / نجيب القيم المدخلة
                            const username = usernameInput.value.trim();
        const password = passwordInput.value;

                            // Bootstrap validation / تحقق Bootstrap
                            if (!username || !password) {
                                    form.classList.add('was-validated');
                                    return;
                            }

                            // Check credentials against users.json
                            // نتحقق من البيانات مقابل ملف users.json
                            const matchedUser = users.find(
                                    user => user.username.toLowerCase() === username.toLowerCase()
                                            && user.password === password
                                  );

                            if (matchedUser) {
                                    // SUCCESS - Save to sessionStorage and redirect
          // نجح - نحفظ في sessionStorage ونحوّل
          sessionStorage.setItem('isAuthN', 'true');
                                    sessionStorage.setItem('username', matchedUser.username);
                                    sessionStorage.setItem('loginTime', new Date().toISOString());

          console.log(`✅ Welcome ${matchedUser.username}! Redirecting...`);
                                    console.log(`👋 أهلاً ${matchedUser.username}! جاري التحويل...`);

          // Package login data as JSON and log it (rubric: form data as JSON)
          // نحزم بيانات الدخول كـ JSON ونطبعها (متطلب الـ rubric)
          const loginData = {
                    username: matchedUser.username,
                    timestamp: new Date().toISOString(),
                    action: 'login'
          };
                                    console.log('📦 Login data packaged as JSON:', JSON.stringify(loginData, null, 2));

          // Redirect to game page / نحوّل لصفحة اللعبة
          setTimeout(() => {
                    window.location.assign('game.html');
          }, 500);
                            } else {
                                    // FAILURE - Show error / فشل - نظهر الخطأ
          console.warn('⚠️ Invalid credentials / بيانات غير صحيحة');
                                    showError('Invalid username or password. Try again!');

          // Clear password field for security / نمسح كلمة السر
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
