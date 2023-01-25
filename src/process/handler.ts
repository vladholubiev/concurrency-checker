import {setTimeout} from 'timers/promises';
import fetch from 'node-fetch';
import pMap from 'p-map';
import type {SQSHandler} from 'aws-lambda';

export const handler: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const {requestTarget, repeatTimes, concurrency, circuitBreakerTimeout}: any = JSON.parse(
    event.Records[0].body
  );
  const requestTargets = Array.from({length: repeatTimes}, () => requestTarget);

  await pMap(
    requestTargets,
    async requestTarget => {
      await makeRequest(requestTarget, circuitBreakerTimeout);
    },
    {concurrency: concurrency, stopOnError: false}
  );
};

async function makeRequest(item: any, circuitBreakerTimeout: number): Promise<void> {
  const req: any = {
    method: item.method,
    redirect: 'follow',
  };

  if (item.body) {
    req.body = item.body;
  }

  if (item.headers) {
    req.headers = item.headers;
  }

  const resp = await fetch(item.url, req);

  await Promise.race([resp.text(), setTimeout(circuitBreakerTimeout)]);

  console.log(resp.status);
}
