import http from 'k6/http'
import { Trend } from 'k6/metrics'

var getAPItrend=new Trend('getAPI');
var getGoogleAPItrend=new Trend('getGoogleAPI');

export default function(){
    var url='https://run.mocky.io/v3/46c3456e-b2d7-4147-8844-913972111c63'
   let response= http.get(url);
    getAPItrend.add(response.timings.duration);
    getAPItrend.add(response.timings.waiting);

    let response1= http.get('http://www.google.com');
    getGoogleAPItrend.add(response1.timings.duration);
    getGoogleAPItrend.add(response1.timings.waiting);



}
