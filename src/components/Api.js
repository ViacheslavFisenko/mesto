export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Error: ${response.status}`);
    }

    getInitialData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    updateProfileInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers['Content-Type'],
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
            .then(this._checkResponse);
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers['Content-Type'],
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        })
            .then(this._checkResponse);
    }
    // Другие методы для работы с API могут быть добавлены здесь
}
