// ===================================
// MENU.JS - Página Principal con Navegación
// ===================================

// PROTECCIÓN: Verificar si el usuario está logueado
if (!sessionStorage.getItem('isLoggedIn')) {
    alert('⚠️ Debes iniciar sesión primero');
    window.location.href = 'login.html';
}

// Obtener y mostrar el email del usuario
const userEmail = sessionStorage.getItem('userEmail');
if (userEmail) {
    const emailDisplay = document.getElementById('userEmailDisplay');
    if (emailDisplay) {
        emailDisplay.innerHTML = `<i class="bi bi-person-circle me-1"></i>${userEmail}`;
    }
}

// Inicializar saldo si no existe
if (!localStorage.getItem('accountBalance')) {
    localStorage.setItem('accountBalance', '2450.00');
}

// Mostrar saldo actual
function displayBalance() {
    const balance = parseFloat(localStorage.getItem('accountBalance')) || 0;
    const balanceElement = document.getElementById('currentBalance');
    if (balanceElement) {
        balanceElement.textContent = `$${balance.toFixed(2)}`;
    }
}

// Función de navegación con mensaje de redirección
function navigateTo(page, targetName) {
    const modal = document.getElementById('redirectModal');
    const target = document.getElementById('redirectTarget');
    
    if (modal && target) {
        target.textContent = targetName;
        modal.style.display = 'flex';
        
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = page;
        }, 1000);
    } else {
        // Si no hay modal, redirigir directamente
        window.location.href = page;
    }
}

// Navegación directa (sin modal)
function goTo(page) {
    window.location.href = page;
}

// Logout function
function logout() {
    const confirmed = confirm('¿Estás seguro que deseas cerrar sesión?');
    if (confirmed) {
        // Limpiar sesión
        sessionStorage.clear();
        
        // Opcional: Mantener el saldo guardado
        // No limpiamos localStorage para conservar el saldo
        
        // Redirigir al login
        window.location.href = 'login.html';
    }
}

// Actualizar saldo cuando la página vuelve a tener foco
// Esto detecta cuando el usuario regresa de otra página
window.addEventListener('focus', function() {
    displayBalance();
});

// Actualizar saldo cuando la página se carga
window.addEventListener('load', function() {
    displayBalance();
});

// Función para verificar el estado de sesión periódicamente
function checkSession() {
    if (!sessionStorage.getItem('isLoggedIn')) {
        alert('⚠️ Tu sesión ha expirado');
        window.location.href = 'login.html';
    }
}

// Verificar sesión cada 30 segundos
setInterval(checkSession, 30000);

// Inicializar al cargar la página
displayBalance();

// Mostrar mensaje de bienvenida solo la primera vez
const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
if (!hasShownWelcome) {
    setTimeout(() => {
        console.log('¡Bienvenido a Alke Wallet!');
        sessionStorage.setItem('hasShownWelcome', 'true');
    }, 500);
}

// Debug: Mostrar info en consola
console.log('===== ALKE WALLET - MENU =====');
console.log('Usuario:', userEmail);
console.log('Saldo:', localStorage.getItem('accountBalance'));
console.log('Sesión activa:', sessionStorage.getItem('isLoggedIn'));
console.log('==============================');