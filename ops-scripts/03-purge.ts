import pMap from 'p-map';
import {REGIONS} from './aws-regions';
import {getQueueAttributes, purgeQueue} from './sqs-helpers';

(async () => {
  await pMap(
    REGIONS,
    async region => {
      await purgeQueue(region);

      const resp = await getQueueAttributes(region);

      console.log(`${region}: ${resp.Attributes?.ApproximateNumberOfMessages}`);
    },
    {concurrency: 10, stopOnError: false}
  );
})();
