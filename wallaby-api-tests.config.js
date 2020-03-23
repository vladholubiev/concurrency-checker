module.exports = (wallaby) => {
  process.env.NODE_ENV = 'test';

  return {
    testFramework: 'jest',
    files: ['package.json', './common-mocks.js', 'api-tests/**/*.ts', '!api-tests/**/*.test.ts'],
    tests: ['api-tests/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      'api-tests/**/*.js': wallaby.compilers.babel(),
      '**/*.ts?(x)': wallaby.compilers.typeScript()
    },
    setup(wallaby) {
      wallaby.testFramework.configure(require('./package.json').jest);

      process.env.TZ = 'UTC';
      process.env.ENVIRONMENT = 'staging';
      process.env.API_HOST = 'api.gsstaging.net';
    },
    preprocessors: {
      '**/*.js': (file) =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path
        })
    }
  };
};
