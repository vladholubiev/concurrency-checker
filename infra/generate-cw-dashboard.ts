import {REGIONS} from '../ops-scripts/aws-regions';

export const CURRENT: any = {
  widgets: [
    {
      type: 'metric',
      x: 0,
      y: 0,
      width: 6,
      height: 6,
      properties: {
        metrics: getInvocationsMetrics(),
        view: 'timeSeries',
        stacked: false,
        region: 'us-east-1',
        stat: 'Sum',
        period: 300,
        legend: {position: 'hidden'},
        title: 'Invocations',
      },
    },
    {
      type: 'metric',
      x: 6,
      y: 0,
      width: 6,
      height: 6,
      properties: {
        metrics: getConcurrentInvocationsMetrics(),
        view: 'timeSeries',
        stacked: false,
        region: 'us-east-1',
        stat: 'Maximum',
        period: 300,
        legend: {position: 'hidden'},
        title: 'Concurrent Invocations',
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 6,
      width: 6,
      height: 6,
      properties: {
        metrics: getDurationMetrics(),
        view: 'timeSeries',
        stacked: false,
        region: 'us-east-1',
        stat: 'Average',
        period: 300,
        legend: {position: 'hidden'},
        title: 'Duration Average',
      },
    },
    {
      type: 'metric',
      x: 6,
      y: 6,
      width: 6,
      height: 6,
      properties: {
        metrics: getErrorsMetrics(),
        view: 'timeSeries',
        stacked: false,
        region: 'us-east-1',
        stat: 'Sum',
        period: 300,
        legend: {position: 'hidden'},
        title: 'Errors',
      },
    },
  ],
};

console.log(JSON.stringify(CURRENT));

function getInvocationsMetrics() {
  const metrics: any[] = [[{expression: 'SUM(METRICS())', label: 'Invocations', id: 'e1'}]];

  const [firstRegion, ...restRegions] = REGIONS;

  metrics.push([
    'AWS/Lambda',
    'Invocations',
    'FunctionName',
    'process',
    {region: firstRegion, id: 'm1', visible: false},
  ]);

  for (let i = 0; i < restRegions.length; i++) {
    const region = restRegions[i];
    metrics.push(['...', {region, id: `m${i + 2}`, visible: false}]);
  }

  return metrics;
}

function getConcurrentInvocationsMetrics() {
  const metrics: any[] = [
    [
      {
        expression: 'SUM(METRICS())',
        label: 'Concurrent Invocations',
        id: 'e1',
        region: 'us-east-1',
        color: '#2ca02c',
      },
    ],
  ];

  const [firstRegion, ...restRegions] = REGIONS;

  metrics.push([
    'AWS/Lambda',
    'ConcurrentExecutions',
    'FunctionName',
    'process',
    {region: firstRegion, id: 'm1', visible: false},
  ]);

  for (let i = 0; i < restRegions.length; i++) {
    const region = restRegions[i];
    metrics.push(['...', {region, id: `m${i + 2}`, visible: false}]);
  }

  return metrics;
}

function getDurationMetrics() {
  const metrics: any[] = [
    [
      {
        expression: 'AVG(METRICS())',
        label: 'Duration Average',
        id: 'e1',
        region: 'us-east-1',
        color: '#9467bd',
      },
    ],
  ];

  const [firstRegion, ...restRegions] = REGIONS;

  metrics.push([
    'AWS/Lambda',
    'Duration',
    'FunctionName',
    'process',
    {region: firstRegion, id: 'm1', visible: false},
  ]);

  for (let i = 0; i < restRegions.length; i++) {
    const region = restRegions[i];
    metrics.push(['...', {region, id: `m${i + 2}`, visible: false}]);
  }

  return metrics;
}

function getErrorsMetrics() {
  const metrics: any[] = [
    [
      {
        expression: 'SUM(METRICS())',
        label: 'Errors',
        id: 'e1',
        region: 'us-east-1',
        color: '#d62728',
      },
    ],
  ];

  const [firstRegion, ...restRegions] = REGIONS;

  metrics.push([
    'AWS/Lambda',
    'Errors',
    'FunctionName',
    'process',
    {region: firstRegion, id: 'm1', visible: false},
  ]);

  for (let i = 0; i < restRegions.length; i++) {
    const region = restRegions[i];
    metrics.push(['...', {region, id: `m${i + 2}`, visible: false}]);
  }

  return metrics;
}
