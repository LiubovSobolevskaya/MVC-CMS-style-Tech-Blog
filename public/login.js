// Define an asynchronous function for handling the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get the username and password from the login form inputs
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the login route with the username and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard after successful login
      document.location.replace('/dashboard');
    } else {
      // Display an alert if login fails
      alert('Failed to log in.');
    }
  }
};

// Define an asynchronous function for handling the signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get the username and password from the signup form inputs
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(username);
  console.log(password);

  if (username && password) {
    // Send a POST request to the users route to create a new user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard after successful signup
      document.location.replace('/dashboard');
    } else {
      // Display an alert if signup fails
      alert('Failed to sign up.');
    }
  }
};

// Attach the submit event listener to the login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Attach the submit event listener to the signup form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
