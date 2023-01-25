import AWS from 'aws-sdk';
import pMap from 'p-map';

const REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-2',
  'ap-southeast-3',
  'ap-southeast-4',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-south-1',
  'eu-north-1',
  'eu-south-2',
  'eu-central-2',
  'me-south-1',
  'me-central-1',
  'sa-east-1',
];

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
