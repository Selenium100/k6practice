import { check } from 'k6';
import http from 'k6/http'
import {Rate} from 'k6/metrics'

let errorRate=new Rate('error');

export let options={

    thresholds:{
      
        error:['rate<0.1'],
        http_req_duration:['p(90)<200', 'p(95)<200']
        
    }
}

export default function(){

    let res=http.get('https://run.mocky.io/v3/b213d703-7af1-4d44-821a-078478c381fd');

 const check1=  check(res,{
        'is status code 200:' : r=>r.status===200
    })

    errorRate.add(!check1);

}