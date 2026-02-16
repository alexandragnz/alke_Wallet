// ===================================
// TRANSACTIONS.JS - Últimos Movimientos
// ===================================

// PROTECCIÓN: Verificar si el usuario está logueado
if (!sessionStorage.getItem('isLoggedIn')) {
    alert('⚠️ Debes iniciar sesión primero');
    window.location.href = 'login-updated.html';
}

// Obtener saldo actual
function getCurrentBalance() {
    return parseFloat(localStorage.getItem('accountBalance')) || 2450.00;
}

// Mostrar saldo actual
function displayBalance() {
    const balance = getCurrentBalance();
    const balanceElement = document.getElementById('currentBalance');
    if (balanceElement) {
        balanceElement.textContent = `$${balance.toFixed(2)}`;
    }
}

// Datos de transacciones
const transactions = [
    {
        type: 'sent',
        description: 'Compra en línea',
        amount: 50.00,
        date: 'Hoy, 10:30 AM'
    },
    {
        type: 'deposit',
        description: 'Depósito',
        amount: 100.00,
        date: 'Hoy, 09:15 AM'
    },
    {
        type: 'received',
        description: 'Transferencia recibida',
        amount: 75.00,
        date: 'Ayer, 05:45 PM'
    },
    {
        type: 'sent',
        description: 'Compra en línea',
        amount: 5550.00,
        date: 'Ayer, 02:30 PM'
    },
    {
        type: 'deposit',
        description: 'Depósito misma cuenta',
        amount: 10500.00,
        date: '10 Feb, 11:20 AM'
    },
    {
        type: 'received',
        description: 'Transferencia recibida',
        amount: 7575.00,
        date: '09 Feb, 08:15 PM'
    },
    {
        type: 'sent',
        description: 'Pago de servicios',
        amount: 150.00,
        date: '08 Feb, 03:45 PM'
    },
    {
        type: 'received',
        description: 'Reembolso',
        amount: 320.00,
        date: '07 Feb, 06:30 PM'
    }
];

// Cargar transacciones en la lista
function loadTransactions() {
    const listContainer = document.getElementById('transactionList');
    const emptyState = document.getElementById('emptyState');

    if (transactions.length === 0) {
        listContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    listContainer.innerHTML = transactions.map(tx => {
        let typeClass = '';
        let amountClass = '';
        let icon = '';
        let sign = '';

        if (tx.type === 'sent') {
            typeClass = 'transaction-sent';
            amountClass = 'amount-sent';
            icon = 'arrow-up-circle';
            sign = '-';
        } else if (tx.type === 'received') {
            typeClass = 'transaction-received';
            amountClass = 'amount-received';
            icon = 'arrow-down-circle';
            sign = '+';
        } else if (tx.type === 'deposit') {
            typeClass = 'transaction-deposit';
            amountClass = 'amount-deposit';
            icon = 'cash-coin';
            sign = '+';
        }

        return `
            <li class="list-group-item d-flex justify-content-between align-items-center ${typeClass}">
                <div>
                    <i class="bi bi-${icon} me-2"></i>
                    <strong>${tx.description}</strong>
                    <br>
                    <small class="text-muted">${tx.date}</small>
                </div>
                <span class="${amountClass}">${sign}$${tx.amount.toFixed(2)}</span>
            </li>
        `;
    }).join('');
}

// Cargar historial en la tarjeta de la derecha (formato compacto)
function loadTransactionHistory() {
    const historyContainer = document.getElementById('transactionHistory');
    
    if (transactions.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history">
                <i class="bi bi-inbox"></i>
                <p>No hay transacciones recientes</p>
            </div>
        `;
        return;
    }

    // Mostrar solo las últimas 6 transacciones
    const recentTransactions = transactions.slice(0, 6);

    historyContainer.innerHTML = recentTransactions.map(tx => {
        let typeClass = '';
        let icon = '';
        let sign = '';

        if (tx.type === 'sent') {
            typeClass = 'sent';
            icon = 'arrow-up-circle';
            sign = '-';
        } else if (tx.type === 'received') {
            typeClass = 'received';
            icon = 'arrow-down-circle';
            sign = '+';
        } else if (tx.type === 'deposit') {
            typeClass = 'received'; // Usar estilo verde para depósitos
            icon = 'cash-coin';
            sign = '+';
        }

        return `
            <div class="transaction-item">
                <div class="transaction-icon ${typeClass}">
                    <i class="bi bi-${icon}"></i>
                </div>
                <div class="transaction-details">
                    <p class="transaction-name">${tx.description}</p>
                    <p class="transaction-date">${tx.date}</p>
                </div>
                <div class="transaction-amount ${typeClass}">
                    ${sign}$${tx.amount.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
}

// Inicializar
displayBalance();
loadTransactions();
loadTransactionHistory();