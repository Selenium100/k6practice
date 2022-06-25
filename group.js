import http from 'k6/http'
import {check, group} from 'k6'
import {Rate} from 'k6/metrics'

let errorRate=new Rate('error');

 export let options={

    thresholds:{
        error:['rate<0.1']
    },
    vus:5,
    duration:'5s'
 }


export default function(){

    group('status code check grpoup' , function(){

        let response1=  http.get('https://run.mocky.io/v3/fdabe88b-19e5-4b47-aba0-84f18879fe9e');
       const check1= check(response1, {
          'is status code 200:' : r => r.status===200
        });

        errorRate.add(!check1);
      
      })

      group('is response body' , function(){

        let response2=  http.get('https://run.mocky.io/v3/fdabe88b-19e5-4b47-aba0-84f18879fe9e');
       const check2= check(response2, {
          'is status code 200:' : r => r.body.length>1
        });

        errorRate.add(!check2);
      
      })

      

}

 

