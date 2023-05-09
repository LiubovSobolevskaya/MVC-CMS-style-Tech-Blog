// Define an asynchronous function for handling the edit post form submission
async function editFormHandler(event) {
  event.preventDefault();

  // Get the updated title and post text from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // Get the post_id from the current URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Send a PUT request to update the specified post
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
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
    // Redirect to the dashboard after updating the post
    document.location.replace('/dashboard/');
  } else {
    // Display an alert with the error message
    alert(response.statusText);
  }
}

// Attach the submit event listener to the edit post form
document
  .querySelector('#editpost-form')
  .addEventListener('submit', editFormHandler);
