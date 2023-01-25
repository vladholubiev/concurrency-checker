import AWS from 'aws-sdk';
import pMap from 'p-map';
import {REGIONS} from './aws-regions';

(async () => {
  await pMap(
    REGIONS,
    async region => {
      const sqs = new AWS.SQS({region});

      await sqs
        .purgeQueue({
          QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
        })
        .promise();

      const resp: any = await sqs
        .getQueueAttributes({
          AttributeNames: ['ApproximateNumberOfMessages'],
          QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
        })
        .promise();

      console.log(`${region}: ${resp.Attributes.ApproximateNumberOfMessages}`);
    },
    {concurrency: 10, stopOnError: false}
  );
})();
