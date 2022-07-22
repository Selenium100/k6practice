import http from 'k6/http'
import {check} from 'k6'


export default function(){

 let response= http.post('https://run.mocky.io/v3/e5838274-29b8-4030-b2b2-a1869fba4d0d');

 const JsonBody=JSON.parse(response.body);
 console.log(`The body length of the response is ${response.body.length}`);
 console.log(`The body length of the response is ${JsonBody.results[0].statement_id}`);

 check(response, {

    'is response code is 200 :' : r => r.status===200,
    'is response body is greater than one bytes:' : JsonBody.results[0].statement_id === 0,
    'is name of build is build?' : JsonBody.results[0].series[0].name === 'build',
    'is version value is 1.8?' : JsonBody.results[0].series[0].values[0][1] === ''.
    
   
    

 });
}