export type SQSPayload = {
  requestTarget: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: string;
  };
  repeatTimes: number;
  concurrency: number;
  circuitBreakerTimeout: number;
};
