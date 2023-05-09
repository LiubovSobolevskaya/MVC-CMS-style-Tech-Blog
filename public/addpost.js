// Define an asynchronous function for handling the form submission
async function newFormHandler(event) {
  event.preventDefault();
  console.log('I am here inside post.js');

  // Get the values from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // Send a POST request to create a new post
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response is successful
  if (response.ok) {
    // Redirect to the dashboard page
    document.location.replace('/dashboard');
  } else {
    // Display an alert with the error message
    alert(response.statusText);
  }
}

// Attach the form submit event listener to the new-post form
document.querySelector('#new-post').addEventListener('submit', newFormHandler);
