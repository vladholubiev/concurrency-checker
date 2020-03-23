/* eslint-disable @typescript-eslint/no-var-requires */
const {getAccountId} = require('@shelf/aws-sdk-helpers/lib/clients/sts');
const {getKeyIdByAlias} = require('@shelf/aws-sdk-helpers/lib/kms');

module.exports.MAIN_KMS_KEY_ID = () => {
  const stage = process.env.ENVIRONMENT;

  return getKeyIdByAlias(`gs/${stage}`);
};

module.exports.getLambdaAuthorizerARN = () => {
  const stage = process.env.ENVIRONMENT;

  return getAccountId().then((accountId) => {
    return `arn:aws:lambda:us-east-1:${accountId}:function:shelf-auth-${stage}-authorizeByToken`;
  });
};

module.exports.snsPrefix = () => {
  const stage = process.env.ENVIRONMENT;

  return getAccountId().then((id) => `arn:aws:sns:us-east-1:${id}:${stage}`);
};
