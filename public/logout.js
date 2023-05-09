// Define an asynchronous function for logging out
const logout = async () => {
  // Send a POST request to the logout route
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the response is successful
  if (response.ok) {
    // Redirect to the homepage after successful logout
    document.location.replace('/');
  } else {
    // Display an alert if logout fails
    alert('Failed to log out.');
  }
};

// Attach the click event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);

// Set the idle threshold (in milliseconds)
const idleThreshold = 30000;

// Declare a variable to hold the idle timer
let idleTimer;

// Function to reset the idle timer
function resetIdleTimer() {
  // Clear the previous idle timer
  clearTimeout(idleTimer);
  // Set a new idle timer
  idleTimer = setTimeout(logout, idleThreshold);
}

// Attach the event listeners to detect user activity (mousemove and keydown) and reset the idle timer
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
