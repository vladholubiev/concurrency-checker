(async () => {
  const REQ_COUNT = 1000;

  console.time(`Dispatched ${REQ_COUNT} Requests`);

  await Promise.all(
    Array.from({length: REQ_COUNT}).map(async (_, i) => {
      const resp = await fetch('https://d285w2zwn30rpq.cloudfront.net/');
      await resp.text();
      console.log(`Request ${i} done`);
    })
  );

  console.timeEnd(`Dispatched ${REQ_COUNT} Requests`);
})();

export {};
