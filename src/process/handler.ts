import {setTimeout} from 'timers/promises';
import type {SQSHandler} from 'aws-lambda';
import type {SQSPayload} from '../../types';

export const handler: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const sqsPayload = event.Records[0].body;
  const {requestTarget, repeatTimes, circuitBreakerTimeout} = JSON.parse(sqsPayload) as SQSPayload;

  const requestTargets = Array.from({length: repeatTimes}, () => requestTarget);

  await Promise.race([
    setTimeout(context.getRemainingTimeInMillis() - 1000), // Prevents Lambda from timing out
    Promise.all(
      requestTargets.map(async requestTarget => {
        try {
          await Promise.race([makeRequest(requestTarget), setTimeout(circuitBreakerTimeout)]);
        } catch (error) {
          console.error(error);
        }
      })
    ),
  ]);
};

async function makeRequest(reqTarget: SQSPayload['requestTarget']): Promise<void> {
  const resp = await fetch(reqTarget.url, {
    method: reqTarget.method,
    redirect: 'follow',
    ...(reqTarget.headers ? {headers: reqTarget.headers} : {}),
    ...(reqTarget.body ? {body: reqTarget.body} : {}),
  });

  await resp.text();

  console.log(resp.status);
}
