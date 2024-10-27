document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        const messageDiv = document.getElementById('message');

        if (data.message) {
            messageDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            messageDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        }
    });
});
