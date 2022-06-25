import http from 'k6/http'





export default function () {
    var url = 'https://run.mocky.io/v3/b0369209-cea1-40d2-b57d-4413249f9b61';

    var parm = {

        Headers: {
            'Content-Type': 'application/json'
        }
    }

    var payload = JSON.stringify({
        "email": "nitya@gmail.com",
        "password": "nitya@123"
    })

    let response = http.post(url, parm, payload);

    console.log(`body is ${JSON.stringify(response.body)}`);


}