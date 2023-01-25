import {randomUUID} from 'crypto';
import AWS from 'aws-sdk';
import type {SQS} from 'aws-sdk';
import {REGIONS} from './aws-regions';

const sqsPerRegion = REGIONS.reduce((acc: Record<string, AWS.SQS>, region) => {
  acc[region] = new AWS.SQS({region});

  return acc;
}, {});

export async function dispatchPayloadToSQS(region: string, payload: any): Promise<void> {
  const sqs = sqsPerRegion[region];

  try {
    await sqs
      .sendMessageBatch({
        QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
        Entries: Array.from({length: 10}).map(() => {
          return {
            Id: randomUUID(),
            MessageBody: JSON.stringify(payload),
          };
        }),
      })
      .promise();
  } catch (error) {
    console.error(error, region, payload);
  }
}

export function getQueueAttributes(region: string): Promise<SQS.Types.GetQueueAttributesResult> {
  const sqs = sqsPerRegion[region];

  return sqs
    .getQueueAttributes({
      AttributeNames: ['ApproximateNumberOfMessages', 'ApproximateNumberOfMessagesNotVisible'],
      QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
    })
    .promise();
}

export function purgeQueue(region: string) {
  const sqs = sqsPerRegion[region];

  return sqs
    .purgeQueue({
      QueueUrl: `https://sqs.${region}.amazonaws.com/${process.env.AWS_ACC_ID}/requests`,
    })
    .promise();
}
