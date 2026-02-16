// ===================================
// SENDMONEY.JS 
// ===================================

// Verificar si el usuario está logueado
if (!sessionStorage.getItem('isLoggedIn')) {
    alert('⚠️ Debes iniciar sesión primero');
    window.location.href = 'login.html';
}

// Mostrar email del usuario logueado (opcional)
const userEmail = sessionStorage.getItem('userEmail');
if (userEmail) {
    console.log('Usuario logueado:', userEmail);
    // Podrías mostrarlo en el navbar si quieres
}

// Sample transaction data
const transactions = [
    {
        type: 'sent',
        name: 'María González',
        date: 'Hoy, 10:30 AM',
        amount: 15000
    },
    {
        type: 'received',
        name: 'Juan Pérez',
        date: 'Hoy, 09:15 AM',
        amount: 7550
    },
    {
        type: 'sent',
        name: 'Ana Martínez',
        date: 'Ayer, 05:45 PM',
        amount: 20000
    },
    {
        type: 'received',
        name: 'Carlos Rodríguez',
        date: 'Ayer, 02:30 PM',
        amount: 32000
    },
    {
        type: 'sent',
        name: 'Tienda Online XYZ',
        date: '10 Feb, 11:20 AM',
        amount: 8990
    },
    {
        type: 'sent',
        name: 'Restaurante La Plaza',
        date: '09 Feb, 08:15 PM',
        amount: 4500
    },
    {
        type: 'received',
        name: 'Laura Sánchez',
        date: '08 Feb, 03:45 PM',
        amount: 50000
    },
    {
        type: 'sent',
        name: 'Supermercado Central',
        date: '07 Feb, 06:30 PM',
        amount: 12550
    }
];

// Load transaction history
function loadTransactions() {
    const container = document.getElementById('transactionHistory');
    
    if (transactions.length === 0) {
        container.innerHTML = `
            <div class="empty-history">
                <i class="bi bi-inbox"></i>
                <p>No hay transacciones recientes</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = transactions.map(tx => `
        <div class="transaction-item">
            <div class="transaction-icon ${tx.type}">
                <i class="bi bi-arrow-${tx.type === 'sent' ? 'up' : 'down'}-circle"></i>
            </div>
            <div class="transaction-details">
                <p class="transaction-name">${tx.name}</p>
                <p class="transaction-date">${tx.date}</p>
            </div>
            <div class="transaction-amount ${tx.type}">
                ${tx.type === 'sent' ? '-' : '+'}$${tx.amount.toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Quick amount buttons
document.querySelectorAll('.quick-amount').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.quick-amount').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const amount = this.dataset.amount;
        document.getElementById('amount').value = amount;
        updateSummary();
    });
});

// Update summary
function updateSummary() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;

    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
}

// Amount input listener
document.getElementById('amount').addEventListener('input', updateSummary);

// Form validation and submission
document.getElementById('sendMoneyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Remove previous validation states
    this.classList.remove('was-validated');
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    let isValid = true;
    
    // Validate recipient
    const recipient = document.getElementById('recipient');
    if (!recipient.value) {
        recipient.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate amount
    const amount = document.getElementById('amount');
    const amountValue = parseFloat(amount.value);
    if (!amount.value || amountValue <= 0 || amountValue > 2450) {
        amount.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate PIN
    const pin = document.getElementById('pin');
    if (!pin.value || pin.value.length !== 4 || !/^\d{4}$/.test(pin.value)) {
        pin.classList.add('is-invalid');
        isValid = false;
    }
    
    if (isValid) {
        // Success - simulate transaction
        const recipientText = recipient.options[recipient.selectedIndex].text;
        const concept = document.getElementById('concept').value;
        const total = parseFloat(document.getElementById('summaryTotal').textContent.replace('$', ''));
        
        alert(`✅ ¡Transacción exitosa!\n\nDestinatario: ${recipientText}\nMonto total: $${total.toFixed(2)}\n${concept ? 'Concepto: ' + concept : ''}`);
        
        // Add to transaction history
        transactions.unshift({
            type: 'sent',
            name: recipientText.split(' - ')[0],
            date: 'Ahora',
            amount: amountValue
        });
        loadTransactions();
        
        // Reset form
        resetForm();
    }
});

// Reset form
function resetForm() {
    document.getElementById('sendMoneyForm').reset();
    document.querySelectorAll('.quick-amount').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    updateSummary();
}

// Logout function
function logout() {
    const confirmed = confirm('¿Estás seguro que deseas cerrar sesión?');
    if (confirmed) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Initialize
loadTransactions();
updateSummary();