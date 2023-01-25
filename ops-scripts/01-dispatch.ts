import pMap from 'p-map';
import {REGIONS} from './aws-regions';
import {dispatchPayloadToSQS} from './sqs-helpers';

const payload = {
  requestTarget: {
    url: `https://d285w2zwn30rpq.cloudfront.net/`,
    method: 'GET',
    headers: {
      'cache-control': 'max-age=0',
    },
  },
  repeatTimes: 100,
  concurrency: 100,
  circuitBreakerTimeout: 1000,
};

const PAYLOAD_MULTIPLIER = 100;

(async () => {
  await pMap(
    REGIONS,
    async region => {
      await pMap(
        Array.from({length: PAYLOAD_MULTIPLIER}),
        () => dispatchPayloadToSQS(region, payload),
        {
          concurrency: 100,
          stopOnError: false,
        }
      );

      console.log(`${region}: dispatched`);
    },
    {concurrency: 10, stopOnError: false}
  );

  process.exit(0);
})();
