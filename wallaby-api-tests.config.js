module.exports = () => {
  return {
    autoDetect: true,
    files: ['package.json', 'api-tests/**/*.ts', '!api-tests/**/*.test.ts'],
    tests: ['api-tests/**/*.test.ts'],
    env: {
      params: {
        env: 'TZ=UTC;ENVIRONMENT=staging;API_HOST=api.gsstaging.net',
      },
    },
  };
};
