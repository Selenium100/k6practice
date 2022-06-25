import http from 'k6/http'
import { check } from 'k6'

import { Rate } from 'k6/metrics'

let errorRate = new Rate('error');

export let options = {

    thresholds: {

        error: ['rate<0.1']
    },



    vus: 5,
    duration: '10s'
}


export default function () {



    let response = http.get('https://run.mocky.io/v3/257adaf7-9019-4a03-83a0-4a4a64b1e501');

    const check1 = check(response, {
        'is status code 200:': r => r.status === 200
    });

    errorRate.add(!check1);

    const check2 = check(response, {
        'is response body exists:': r => r.body.length > 0
    });

    errorRate.add(!check2);
}