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
tf init
tf apply
```

# Dispatch targets

```shell
ts-node send-to-sqs.ts
```
