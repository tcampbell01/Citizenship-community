async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[id="post-content"]').value;

  if (title && post_content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
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

async function newTopicHandler(event) {
  event.preventDefault();

  const topic_id = document.querySelector('select[id="topic"]').value;

  if (topic_id) {
    const response2 = await fetch(`/api/posts/topic`, {
      method: 'POST',
      body: JSON.stringify({
        topic_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response2.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response2.statusText);
    }

  } else {
    alert("You must choose a topic!");
    return;
  }
}

document.querySelector('.new-topic-form').addEventListener('submit', newTopicHandler);