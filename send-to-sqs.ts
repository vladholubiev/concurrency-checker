import AWS from 'aws-sdk';
import pMap from 'p-map';
import {times} from 'lodash';

const sqs = new AWS.SQS({region: 'us-east-1'});

const payload = {
  url: `https://my.crb-dnr.ru/rich/auth`,
  method: 'GET',
};

(async () => {
  await pMap(
    times(1000),
    async () => {
      await sqs
        .sendMessage({
          QueueUrl: 'https://sqs.us-east-1.amazonaws.com/494014222317/requests',
          MessageBody: JSON.stringify(payload),
        })
        .promise();
    },
    {concurrency: 100, stopOnError: false}
  );

  process.exit(0);
})();
