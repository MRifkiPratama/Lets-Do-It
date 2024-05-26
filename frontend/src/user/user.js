document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        const formData = new FormData(loginForm);
        const formDataJSON = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            window.location.href = '/dashboard.html'; // Redirect to dashboard on successful login
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});
