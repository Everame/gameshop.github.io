export default class FetchHttpClient {
    constructor(headers){
        this.headers = headers;
    }
     

    async get(url){
        return await fetch(url, { method: "GET", headers: this.headers})
            .then(response => {
                //Если ответ успешно получен возвращаю его
                if (response.ok) {
                    return response.json();
                }

                return response.json().then(error => {
                    const e = new Error('Что-то пошло не так')
                    e.data = error
                    throw e
                })
            })
    }

    async fetch(url, body){
        await fetch(url, { method: "POST", body: body, headers: this.headers})
            .then(response => {
                //Если ответ успешно получен возвращаю его
                if (response.ok) {
                    return  response.json()
                }

                return response.json().then(error => {
                    const e = new Error('Что-то пошло не так')
                    e.data = error
                    throw e
                })     
            })
    }
}
