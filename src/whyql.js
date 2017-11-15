require('es6-promise').polyfill();
require('isomorphic-fetch');

class Whyql {

    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }

    async _request(options) {

        try {
            const response = await fetch(this.serverUrl, options);
            const result = await response;

            return result;
        } catch (error) {
            return error;
        }
    }

}

var w = new Whyql('http://localhost:8000/a.json')

var _headers = new Headers();

var options = { 
    method: 'GET',
    headers: _headers,
    mode: 'no-cors',
    cache: 'default'
    };

w._request(options)
.then(result => {
    console.log(result);
});
