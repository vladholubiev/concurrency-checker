import AWS from 'aws-sdk';
import pMap from 'p-map';
import {times} from 'lodash';

const REGIONS = ['us-east-1'];

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
