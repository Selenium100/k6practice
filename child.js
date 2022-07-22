import { default as influx } from './parent.js'




export default function testsuit(){
    const hostname='https://run.mocky.io/';
    const endpoint='v3/';
    const query='e5838274-29b8-4030-b2b2-a1869fba4d0d';

    
    
    
    let inf=new influx(hostname,endpoint,query);
    inf.checkstatuscode();
}




