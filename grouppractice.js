import http from 'k6/http'
import { check, group } from 'k6'
import { Rate,Trend } from 'k6/metrics'

let errorRate = new Rate('error');

let groupDuration=Trend('groupDuration');

export let options = {
    threshold: {
        error: ['rate<0.1'],
        'groupDuration{groupName:status check group}': ['avg<200'],
        'groupDuration{groupName:group for check response is there or not}': ['avg<300']

    },
    vus: 5,
    duration: '5s'

}

function groupWithMetrics(nameOfGroup,groupFunction){

    //start timing
    let start=new Date();
    group(nameOfGroup,groupFunction);

    let end=new Date();

    groupDuration.add(end-start, {groupName:nameOfGroup});

}

export default function () {

    groupWithMetrics('status check group', function () {

        let response = http.get('https://run.mocky.io/v3/fdabe88b-19e5-4b47-aba0-84f18879fe9e');
        const check1 = check(response, {
            'is status code 200:': r => r.status == 200
        });

        errorRate.add(!check1);

    })

    groupWithMetrics('group for check response is there or not', function () {

        let response = http.get('https://run.mocky.io/v3/fdabe88b-19e5-4b47-aba0-84f18879fe9e');
        const check2 = check(response, {
            'is response is there or not:': r => r.body.length > 1
        });

        errorRate.add(!check2);

    })

    

}