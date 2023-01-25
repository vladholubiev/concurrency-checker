# Check AWS Concurrent Lambdas Quotas across all regions

```sh
regions=("us-east-1" "us-east-2" "us-west-1" "us-west-2" "af-south-1" "ap-east-1" "ap-south-2" "ap-southeast-3" "ap-southeast-4" "ap-southeast-1" "ap-southeast-2" "ap-south-1" "ap-northeast-3" "ap-northeast-2" "ap-northeast-1" "ca-central-1" "eu-central-1" "eu-west-1" "eu-west-2" "eu-west-3" "eu-south-1" "eu-north-1" "eu-south-2" "eu-central-2" "me-south-1" "me-central-1" "sa-east-1")

for region in "${regions[@]}"
do
    echo "$region"
    AWS_PAGER="" aws lambda get-account-settings --query 'AccountLimit.ConcurrentExecutions' --profile vlad --region "$region"
done
```

# Create artifact.zip

```shell
yarn build

rm -rf node_modules
rm artifact.zip

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

Modify URLs in the `ops-scripts/sqs-dispatch.ts` file. Then:

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node ops-scripts/sqs-dispatch.ts
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
