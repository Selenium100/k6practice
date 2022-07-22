import http from 'k6/http';
import { check } from 'k6';


   export default class Influx{
    constructor(hostname,endpoint,query){
         this.hostname=hostname;
         this.endpoint=endpoint;
         this.query=query;
    }

     checkstatuscode(){
       const res= http.post(`${this.hostname}${this.endpoint}${this.query}`);
        check(res,{
            'is status code 200?' : r => r.status === 200,
        });
     }
}
