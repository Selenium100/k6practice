import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'


export let errorRate = new Rate('error');

export let options = {

  thresholds: {

    error: ['rate<0.1']


  },

  vus:1,
  duration:"1s"

}

export default function () {


  let response = http.get('https://run.mocky.io/v3/05bd2acc-5283-4f8f-82aa-d1ac21110658');
    const len=response.length;
  const check1 = check(response, {

    'is status code 200:': r => r.status === 200

  })

  errorRate.add(!check1);

  const check2 = check( response,{

    'is response body is greater than one': len > 1

  })

  errorRate.add(!check2);



}
