
import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

var errorRate = new Rate('error');

export let options = {

    thresholds: {
        'error': ['rate<0.1']
    },
    vus: 10,
    duration: '10s'
}

export default function () {
    let response = http.get('https://run.mocky.io/v3/0aa87f2e-6d99-40a6-a419-639eebd890b1');

  const check1=  check(response, {

        'is status code 200:': r => r.status === 200
    });

    errorRate.add(!check1);

    const check2=  check(response, {

        'is response body aviliabe:': r => r.body.length>1
    });

    errorRate.add(!check2);

}




