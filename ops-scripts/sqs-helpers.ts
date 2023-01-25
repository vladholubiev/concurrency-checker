import AWS from 'aws-sdk';
import {REGIONS} from './aws-regions';

const sqsPerRegion = REGIONS.reduce((acc: Record<string, AWS.SQS>, region) => {
  acc[region] = new AWS.SQS({region});

  return acc;
}, {});

export async function dispatchPayloadToSQS(region: string, payload: any): Promise<void> {
  const sqs = sqsPerRegion[region];

  await sqs
    .sendMessage({
      QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
      MessageBody: JSON.stringify(payload),
    })
    .promise();
}
