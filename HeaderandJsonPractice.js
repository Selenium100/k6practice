import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'


let errorRate=new Rate('error');

export let headerParm={

    Headers:{
        'Content-Type':'application/json'
    }
}


export let options={

    thresholds:{
        error:['rate<0.1']
    },

    vus:5,
    duration:'5s'
}


export default function(){

    var url='https://run.mocky.io/v3/f8b42cb7-308b-4577-92b0-c3079173a411';
  let response= http.get(url,headerParm);

 const check1= check(response, {

        'is status code 200:' : r => r.status===200
    });

    errorRate.add(!check1);


    var body=JSON.parse(response.body);

    console.log(`Response body is ${JSON.stringify(body)}`);
    console.log(`Response message is ${body.Message}`);

  const check2= check(response, {
        'is response message correct' : r => JSON.parse(r.body).Message==='Data is successfully transferred'
    });

    errorRate.add(!check2);
    
}