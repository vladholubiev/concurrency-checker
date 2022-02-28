import type {SQSHandler} from 'aws-lambda';
import fetch from 'node-fetch';
import pMap from 'p-map';

export const handler: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data: {url: string; method: string}[] = JSON.parse(event.Records[0].body);
  console.log(data);

  for (let i = 0; i < 1000; i++) {
    await pMap(
      data,
      async item => {
        const resp = await fetch(item.url, {
          method: item.method,
          redirect: 'follow',
        });

        await Promise.race([resp.text(), delay(4000)]);

        console.log(resp.status);
      },
      {concurrency: 500, stopOnError: false}
    );
  }
};

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
