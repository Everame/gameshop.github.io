import { useNavigate } from "react-router";

export default class FetchHttpClient {
    constructor(headers){
        this.headers = headers;
    }
     

    async get(url){
        try {
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
        } catch (error) {
        }
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
