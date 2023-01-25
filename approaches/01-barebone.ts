(async () => {
  const REQ_COUNT = 100;

  console.time(`Dispatched ${REQ_COUNT} Requests`);

  for (let i = 0; i < REQ_COUNT; i++) {
    const resp = await fetch('https://d285w2zwn30rpq.cloudfront.net/');
    await resp.text();
    console.log(`Request ${i} done`);
  }

  console.timeEnd(`Dispatched ${REQ_COUNT} Requests`);
})();

export {};
