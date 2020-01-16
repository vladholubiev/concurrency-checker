jest.mock('@middy/ssm', () => () => ({before: () => Promise.resolve()}));
