export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
}

export function login(email, password) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
}

export const loginWithToken = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	}).then(getResponse);
};

const getResponse = (res) => {
	if (!res.ok) {
		return Promise.reject(`Ошибка : ${res.status}`);
	}
	return res.json();
};
