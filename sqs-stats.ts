import AWS from 'aws-sdk';

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

(async () => {
  for (const region of REGIONS) {
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
