import AWS from 'aws-sdk';

const REGIONS = ['us-east-1'];

(async () => {
  for (const region of REGIONS) {
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
  }
})();
