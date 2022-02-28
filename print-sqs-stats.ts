import AWS from 'aws-sdk';

const regions = ['us-east-1'];

(async () => {
  for (const region of regions) {
    const sqs = new AWS.SQS({region});

    const resp: any = await sqs
      .getQueueAttributes({
        AttributeNames: ['ApproximateNumberOfMessages'],
        QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
      })
      .promise();

    console.log(`${region}: ${resp.Attributes.ApproximateNumberOfMessages}`);
  }
})();
