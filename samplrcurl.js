import http from 'k6/http';
import check from 'k6';
import Rate from 'k6/metrics';


let errorRate=new Rate('error');

export let options={

    thresholds:{
        error: ['rate<0.1']
    }

}



export default function(){

 let res= http.get('https://reqres.in/api/users?page=2');

 const check1=check(res, {

    'is status code 200 ' : r => r.status===200
 });

 errorRate.add(!check1);





}