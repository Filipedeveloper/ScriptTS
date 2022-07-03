

var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';

let requestToken: any;
let username: string;
let password: string;
let sessionId;
let listId = '7101979';

let loginButton = document.getElementById('login-button');
console.log(loginButton);
if(loginButton){
    loginButton.addEventListener('click', async () => {
        console.log('123456');
        await criarRequestToken();
        console.log(criarRequestToken);
        await logar();
        await criarSessao();
      })
}

async function criarSessao() {
    let result = await HttpClient.get(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
      "GET"
    )
    sessionId = result;
  }

async function criarRequestToken () {
    let result = await HttpClient.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
      "GET"
    )
    
    requestToken = result;
  }

  async function logar() {
    await HttpClient.get(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
      "POST",
      {
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`
      }
    )
  }

  class HttpClient {
    static async get(url: string, method: string, body?: any) {
      return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url, true);
  
        request.onload = () => {
          if (request.status >= 200 && request.status < 300) {
            resolve(JSON.parse(request.responseText));
          } else {
            reject({
              status: request.status,
              statusText: request.statusText
            })
          }
        }
        request.onerror = () => {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
  
        if (body) {
          request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          body = JSON.stringify(body);
        }
        request.send(body);
      })
    }
  }

 