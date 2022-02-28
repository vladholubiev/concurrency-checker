import AWS from 'aws-sdk';

const sqs = new AWS.SQS({region: 'us-east-1'});

(async () => {
  for (let i = 0; i < 10; i++) {
    await sqs
      .sendMessage({
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/494014222317/requests',
        MessageBody: JSON.stringify([
          {
            url: 'https://my.crb-dnr.ru/rich/auth',
            method: 'GET',
          },
        ]),
      })
      .promise();
  }

  process.exit(0);
})();
