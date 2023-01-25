import pMap from 'p-map';
import type {SQSPayload} from '../types';
import {REGIONS} from './aws-regions';
import {dispatchPayloadToSQS} from './sqs-helpers';

const payload: SQSPayload = {
  requestTarget: {
    url: `https://d285w2zwn30rpq.cloudfront.net/`,
    method: 'GET',
  },
  repeatTimes: 100,
  circuitBreakerTimeout: 1000,
};

const PAYLOAD_MULTIPLIER = 500;
let totalRequestsDispatched = 0;

(async () => {
  await pMap(
    REGIONS,
    async region => {
      await pMap(
        Array.from({length: PAYLOAD_MULTIPLIER / 10}),
        () => dispatchPayloadToSQS(region, payload),
        {
          concurrency: 100,
          stopOnError: false,
        }
      );

      totalRequestsDispatched += PAYLOAD_MULTIPLIER * payload.repeatTimes;

      console.log(`${region}: dispatched ${totalRequestsDispatched} requests to make`);
    },
    {concurrency: 10, stopOnError: false}
  );

  process.exit(0);
})();
