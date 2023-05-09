// Define an asynchronous function for handling the delete post form submission
async function deleteFormHandler(event) {
  event.preventDefault();

  // Get the post_id from the current URL
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Send a DELETE request to delete the specified post
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the response is successful
  if (response.ok) {
    // Redirect to the dashboard after deleting the post
    document.location.replace('/dashboard/');
  } else {
    // Display an alert with the error message
    alert(response.statusText);
  }
}

// Attach the click event listener to the delete post button
document
  .querySelector('#deletepost-btn')
  .addEventListener('click', deleteFormHandler);
