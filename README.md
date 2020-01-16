# Create artifact.zip

```shell
yarn build

rm -rf node_modules

yarn --prod

zip --quiet -r --exclude="node_modules/aws-sdk/\*" \
artifact.zip \
lib node_modules

yarn
```

# Deploy

First, enable all the AWS regions here: https://console.aws.amazon.com/billing/home?#/account

```shell
cd infra
```

Create a `local.auto.tfvars` file inside the `infra` folder like this:

```hcl
access_key = "xxx"
secret_key = "yyy"
```

And finally deploy:

```shell
export GODEBUG=asyncpreemptoff=1;
terraform init
terraform apply
```

# Dispatch targets

Modify URLs in the `sqs-dispatch.ts` file. Then:

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node sqs-dispatch.ts
```

# Print stats for all regions

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node sqs-stats.ts
```

# Purge all queues

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node sqs-purge.ts
```

# Redeploy Lambda code changes

1. Repeat steps in `Create artifact.zip`
2. Repeat steps in `Deploy`
