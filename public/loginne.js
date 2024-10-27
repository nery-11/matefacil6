document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');

    if (data.token) {
        messageDiv.innerHTML = `<p style="color: green;">Inicio de sesión exitoso</p>`;
        // Redirigir a otra página si es necesario
        setTimeout(() => {
            window.location.href = 'MATEFACIL.html';
        }, 2000);
    } else {
        messageDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        
    }
});

// Redirigir a registrone.html cuando se hace clic en el botón "Registrar"
document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'registrone.html';
});
