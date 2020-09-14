module.exports = () => {
  return {
    autoDetect: true,
    files: ['package.json', 'src/**/*.ts', '!src/**/*.test.ts', './common-mocks.js'],
    tests: ['src/**/*.test.ts'],
    env: {
      params: {
        env: 'TZ=UTC'
      }
    }
  };
};
