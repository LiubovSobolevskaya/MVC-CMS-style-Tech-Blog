// Define an asynchronous function for handling the comment form submission
async function commentFormHandler(event) {
  event.preventDefault();

  // Get the value from the comment textarea
  const comment_text = document
    .querySelector('textarea[name="comment-text"]')
    .value.trim();

  // Get the post_id from the current URL
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Check if the comment_text is not empty
  if (comment_text) {
    // Send a POST request to create a new comment
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Reload the page to show the new comment
      document.location.reload();
    } else {
      // Display an alert with the error message
      alert(response.statusText);
    }
  }
}

// Attach the submit event listener to the comment form
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
