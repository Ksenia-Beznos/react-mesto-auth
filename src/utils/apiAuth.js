export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => {
			if (res.status === 201) {
				return res.json();
			} else {
        return false;
      }
		})
		.catch((err) => console.log(err));
}

export function login(email, password) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => {
			if (res.status === 200) {
				return res.json();
			} else {
				return false;
			}
		})
		.catch((err) => console.log(err));
}

export const loginWithToken = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
		.then((res) => {
			if (res.status === 200) {
				return res.json();
			} else {
        return res;
      }
		})
		.catch((err) => console.log(err));
};