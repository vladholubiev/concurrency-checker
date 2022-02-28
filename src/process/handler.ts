import type {SQSHandler} from 'aws-lambda';
import fetch from 'node-fetch';
import pMap from 'p-map';
import {times} from 'lodash';

export const handler: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const info: {url: string; method: string; body?: string} = JSON.parse(event.Records[0].body);
  const data = times(10000, () => info);

  await pMap(data, makeRequest, {concurrency: 500, stopOnError: false});
};

async function makeRequest(item: any): Promise<void> {
  const req: any = {
    method: item.method,
    redirect: 'follow',
  };

  if (item.body) {
    req.body = item.body;
  }

  const resp = await fetch(item.url, req);

  await Promise.race([resp.text(), delay(4000)]);

  console.log(resp.status);
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
