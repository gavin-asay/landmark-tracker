async function loginFormHandler(event) {
	event.preventDefault();

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/users/login', {
			method: 'post',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await response.json();

		if (!data.message && !data.errors) {
			document.location.replace('/');
		} else if (data.message === 'Incorrect password!') {
			while (document.querySelector('.error')) document.querySelector('.error');
			const errMsg = document.createElement('p');
			errMsg.className = 'error';
			errMsg.textContent = 'Incorrect password!';
			document.querySelector('.login-form').appendChild(errMsg);
		} else if (data.message === 'No user with that email address!') {
			while (document.querySelector('.error')) document.querySelector('.error');
			const errMsg = document.createElement('p');
			errMsg.className = 'error';
			errMsg.textContent = 'No user found with this email address!';
			document.querySelector('.login-form').appendChild(errMsg);
		} else {
			alert(response.statusText);
		}
	}
}

async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && email && password) {
		if (password.length < 8) {
			while (document.querySelector('.error')) document.querySelector('.error');
			const errMsg = document.createElement('p');
			errMsg.className = 'error';
			errMsg.textContent = 'Password must be at least 8 characters';
			document.querySelector('.signup-form').appendChild(errMsg);
			return;
		}

		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({
				username,
				email,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await response.json();

		if (!data.message && !data.errors) {
			document.location.replace('/');
		} else if (data.errors[0].type === 'unique violation') {
			const errField = data.errors[0].path.split('.')[1];
			while (document.querySelector('.error')) document.querySelector('.error');
			const errMsg = document.createElement('p');
			errMsg.className = 'error';
			errMsg.textContent = `Error: ${errField} is already in use. Please enter a different ${errField}.`;
			document.querySelector('.signup-form').appendChild(errMsg);
			return;
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
