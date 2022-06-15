import http from 'k6/http'
import {check} from 'k6'


export default function(){

 let response= http.get('https://run.mocky.io/v3/05bd2acc-5283-4f8f-82aa-d1ac21110658');

 console.log(`The body length of the response is ${response.body.length}`);

 check(response, {

    'is response code is 200 :' : r => r.status===200,
    'is response body is greater than one bytes:' : r => r.body.length>1

 });
}