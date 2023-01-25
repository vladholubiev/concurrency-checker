import AWS from 'aws-sdk';
import pMap from 'p-map';
import {REGIONS} from './aws-regions';

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

(async () => {
  await pMap(
    REGIONS,
    async region => {
      const sqs = new AWS.SQS({region});

      await pMap(
        Array.from({length: 100}),
        async () => {
          await sqs
            .sendMessage({
              QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
              MessageBody: JSON.stringify(payload),
            })
            .promise();
        },
        {concurrency: 100, stopOnError: false}
      );

      console.log(`${region}: dispatched`);
    },
    {concurrency: 10, stopOnError: false}
  );

  process.exit(0);
})();
