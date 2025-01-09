document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    togglePassword?.addEventListener('click', function () {
        // Toggle the type attribute of the password input field
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;

        // Toggle the eye icon
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈'; // Change the icon
    });

    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        signupUser(); // Call the signupUser function
    });
});

function signupUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('telephone').value.trim();
    const country = document.getElementById('country').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !telephone || !country || !password) {
        alert('All fields are required!');
        return;
    }

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, telephone, country, password }),
    })
    .then(response => response.json().then(data => ({ status: response.ok, message: data })))
    .then(({ status, message }) => {
        if (status) {
            alert(message.message);
            window.location.href = '/login'; // Redirect to login page after successful signup
        } else {
            alert(`Error: ${message.message}`);
        }
    })
    .catch(error => {
        alert('An error occurred during signup. Please try again.');
        console.error(error);
    });
}
