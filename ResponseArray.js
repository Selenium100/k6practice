import http from 'k6/http'


export default function(){

    var url='https://run.mocky.io/v3/418c1ae3-f888-435d-8cc2-f4a9101a4796';
  let response= http.get(url);

  let body=JSON.parse(response.body);

  body.forEach(element => {
    
    console.log(`Names are ${JSON.stringify(element.name)}`)

  });
}