class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_checkStatusResponse(res, method) {
		return res.ok ? res.json() : Promise.reject(`Ошибка в ${method}: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'getInitialCards');
		});
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'getUserInfo');
		});
	}

	setUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({
				name: name,
				about: about,
			}),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setUserInfo');
		});
	}

	setAvatar(avatarUrl) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({
				avatar: avatarUrl,
			}),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setAvatar');
		});
	}

	changeLikeCardStatus(id, status) {
		if (status) {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'DELETE',
				headers: this._headers,
			}).then((res) => {
				return this._checkStatusResponse(res, 'removeLike');
			});
		} else {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'PUT',
				headers: this._headers,
			}).then((res) => {
				return this._checkStatusResponse(res, 'addLike');
			});
		}
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'addLike');
		});
	}

	removeLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'removeLike');
		});
	}

	addCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify(card),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setUserInfo');
		});
	}

	removeCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'removeLike');
		});
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
	headers: {
		authorization: 'cf6c74e7-9078-4e9e-a5a2-23814b988d36', // токен
		'Content-Type': 'application/json',
	},
});
