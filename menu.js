// ===================================
// MENU.JS - Página Principal
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
    localStorage.setItem('accountBalance', '245000');
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
    
    target.textContent = targetName;
    modal.style.display = 'flex';
    
    // Redirigir después de 1 segundo
    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

// Logout function
function logout() {
    const confirmed = confirm('¿Estás seguro que deseas cerrar sesión?');
    if (confirmed) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Inicializar al cargar la página
displayBalance();

// Actualizar saldo cada vez que se vuelve a la página (detecta cambios)
window.addEventListener('focus', displayBalance);