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
terraform init
terraform apply
```

# Dispatch targets

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node send-to-sqs.ts
```

# Print stats for all regions

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node print-sqs-stats.ts
```

# Purge all queues

```shell
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=yyy
export AWS_ACC_ID=111

ts-node purge-all-sqs.ts
```
