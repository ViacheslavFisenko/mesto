export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse);
    }

    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse);
    }

    getInitialData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse);
    }

    updateProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
            .then(this._checkResponse);
    }

    updateAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        })
            .then(this._checkResponse);
    }
    // Другие методы для работы с API могут быть добавлены здесь
}
