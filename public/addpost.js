async function newFormHandler(event) {
  event.preventDefault();
  console.log('I am here inside post.js');
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

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

  if (response.ok) {

    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#new-post').addEventListener('submit', newFormHandler);
