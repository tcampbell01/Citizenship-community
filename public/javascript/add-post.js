async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[id="post-content"]').value;
  const topic = document.getElementById('topic').value;

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        topic
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }

  } else {
    alert("You must enter a title and content!");
    return;
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);