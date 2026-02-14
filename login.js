// ===================================
// LOGIN.JS - Autenticación y Redirección
// ===================================

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
}

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validación básica
    if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Simulación de credenciales (en producción esto vendría del backend)
    const validUsers = [
        { email: 'demo@alkewallet.com', password: 'demo123' },
        { email: 'usuario@email.com', password: '1234' }
    ];
    
    const user = validUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login exitoso - Guardar sesión
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirigir a menu principal
        window.location.href = 'menu.html';
    } else {
        // Login fallido
        alert('❌ Credenciales incorrectas\n\nPrueba con:\nEmail: demo@alkewallet.com\nPassword: demo123');
    }
});