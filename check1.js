import http from 'k6/http'
import { check } from 'k6'

import { Rate } from 'k6/metrics'

let errorRate = new Rate('error');

export let options = {

    thresholds: {

        error: ['rate<0.1']
    }






}


export default function () {



    let response = http.get('https://reqres.in/api/users?page=2');


      console.log(response.body);

    const check1 = check(response, {
        'is status code 200:': r => r.status === 200
    });

    errorRate.add(!check1);

    const check2 = check(response, {
        'is response body exists:': r => r.body.length > 0
    });

    errorRate.add(!check2);
}