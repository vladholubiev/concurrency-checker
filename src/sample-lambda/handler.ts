import {APIGatewayProxyResult} from 'aws-lambda';
import middy from '@middy/core';
import {APIGatewayProxyEventWithAuthorizer, getMiddyBaseHTTPMiddlewares} from '@shelf/middy-base';

const listGemsLinkedToObjectHandler = async (
  event: APIGatewayProxyEventWithAuthorizer
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({works: true, pathParameters: event.pathParameters}),
  };
};

export const handler = middy(listGemsLinkedToObjectHandler).use(
  getMiddyBaseHTTPMiddlewares<APIGatewayProxyEventWithAuthorizer>()
);