import http from 'k6/http';
import {
    check
}
    from 'k6';

    import {Rate} from 'k6/metrics';

    let errorRate=new Rate('error');

    export let options={

        thresholds:{
          
            error:['rate<0.1']
           
        },

        vus:5,
        duration:'5s'
    }


export default function () {

    var url = 'https://run.mocky.io/v3/46c3456e-b2d7-4147-8844-913972111c63';

    var headerParm = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.get(url, headerParm);

  const check1=  check(response, {
        'is status code 200:': r => r.status === 200
    });

    errorRate.add(!check1);

    //Let read response

    let body = JSON.parse(response.body);

    console.log(`response body is ${JSON.stringify(body)}`);
    console.log(`response message is ${body.Message}`);

   const check2= check(response,{
        'is response messgae correct:' : r=> JSON.parse(r.body).Message==='Data Fetched Successfully'
    });

    errorRate.add(!check2);




}