async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const topic = window.location.toString().split('/')[
    window.location.toString().split('/').length - 2
  ];
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const content = document.querySelector('textarea[id="post-content"]').value;

  if (content && title) {
    const response = await fetch(`/api/posts/${topic}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }

  } else {
    alert("You must enter a title and content!");
    return;
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);