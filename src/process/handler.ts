import {setTimeout} from 'timers/promises';
import pMap from 'p-map';
import type {SQSHandler} from 'aws-lambda';
import type {SQSPayload} from '../../types';

export const handler: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const {requestTarget, repeatTimes, concurrency, circuitBreakerTimeout}: any = JSON.parse(
    event.Records[0].body
  ) as SQSPayload;
  const requestTargets = Array.from({length: repeatTimes}, () => requestTarget);

  await pMap(
    requestTargets,
    async requestTarget => {
      await makeRequest(requestTarget, circuitBreakerTimeout);
    },
    {concurrency: concurrency, stopOnError: false}
  );
};

async function makeRequest(
  reqTarget: SQSPayload['requestTarget'],
  circuitBreakerTimeout: number
): Promise<void> {
  const resp = await fetch(reqTarget.url, {
    method: reqTarget.method,
    redirect: 'follow',
    ...(reqTarget.headers ? {headers: reqTarget.headers} : {}),
    ...(reqTarget.body ? {body: reqTarget.body} : {}),
  });

  await Promise.race([resp.text(), setTimeout(circuitBreakerTimeout)]);

  console.log(resp.status);
}
