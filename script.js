// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aquí iría tu lógica de autenticación
    console.log('Intento de login:', { email, password });

    // Simulación de login exitoso
    alert('¡Bienvenido a Alke Wallet! 🎉');
});

// Biometric login
function biometricLogin() {
    alert('Autenticación biométrica iniciada... 👆');
    // Aquí iría la lógica de autenticación biométrica
}

        // Sample transaction data
        const transactions = [
            {
                type: 'sent',
                name: 'María González',
                date: 'Hoy, 10:30 AM',
                amount: 150.00
            },
            {
                type: 'received',
                name: 'Juan Pérez',
                date: 'Hoy, 09:15 AM',
                amount: 75.50
            },
            {
                type: 'sent',
                name: 'Ana Martínez',
                date: 'Ayer, 05:45 PM',
                amount: 200.00
            },
            {
                type: 'received',
                name: 'Carlos Rodríguez',
                date: 'Ayer, 02:30 PM',
                amount: 320.00
            },
            {
                type: 'sent',
                name: 'Tienda Online XYZ',
                date: '10 Feb, 11:20 AM',
                amount: 89.99
            },
            {
                type: 'sent',
                name: 'Restaurante La Plaza',
                date: '09 Feb, 08:15 PM',
                amount: 45.00
            },
            {
                type: 'received',
                name: 'Laura Sánchez',
                date: '08 Feb, 03:45 PM',
                amount: 500.00
            },
            {
                type: 'sent',
                name: 'Supermercado Central',
                date: '07 Feb, 06:30 PM',
                amount: 125.50
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
            const fee = amount * 0.02; // 2% fee
            const total = amount + fee;
            
            document.getElementById('summaryAmount').textContent = `$${amount.toFixed(2)}`;
            document.getElementById('summaryFee').textContent = `$${fee.toFixed(2)}`;
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
        
        // Initialize
        loadTransactions();
        updateSummary();