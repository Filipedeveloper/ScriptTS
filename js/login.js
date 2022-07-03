"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken;
let username;
let password;
let sessionId;
let listId = '7101979';
let loginButton = document.getElementById('login-button');
console.log(loginButton);
if (loginButton) {
    loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('123456');
        yield criarRequestToken();
        console.log(criarRequestToken);
        yield logar();
        yield criarSessao();
    }));
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`, "GET");
        sessionId = result;
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`, "GET");
        requestToken = result;
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, "POST", {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        });
    });
}
class HttpClient {
    static get(url, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = JSON.stringify(body);
                }
                request.send(body);
            });
        });
    }
}
