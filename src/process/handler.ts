import type {SQSHandler} from 'aws-lambda';

export const handler: SQSHandler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(event);
};
