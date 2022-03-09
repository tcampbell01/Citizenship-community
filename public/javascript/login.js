async function signupFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector('#inputFirst').value.trim();
  const last_name = document.querySelector('#inputLast').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();
  const zipCode = document.querySelector('#inputZip').value.trim();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  if (first_name && last_name && email && password && zipCode) {
    if (password.length < 4 || !validateEmail(email)) {
      alert("Email must be valid and password must be at least four characters long.");
      return;
    } else {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          zipCode
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // check the response status
      if (response.ok) {
        console.log('success');
      } else {
        alert(response.statusText);
      }
    }
  }
}

document.querySelector('.sign-up-form').addEventListener('submit', signupFormHandler);

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/forum');
    } else {
      alert(response.statusText + " / Incorrect Login / User not registered.");
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);