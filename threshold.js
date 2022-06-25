import http from 'k6/http'
import {Rate} from 'k6/metrics'

var errorRate=new Rate('error');

export let options={

    thresholds:{
        'error':['rate<0.1'],
        'http_req_duration':['p(90)<200','p(95)<200']
    }
}


export default function(){
    var url='https://run.mocky.io/v3/ee6fd61f-d346-40c7-afaa-9574c5ae4d46'
  let response=  http.get(url);

    errorRate.add(response.status!==200);
}

