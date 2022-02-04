jest.mock('@middy/ssm', () => () => {
  return {before: () => Promise.resolve()};
});
