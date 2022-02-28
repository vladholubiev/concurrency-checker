# Create artifact.zip

rm -rf node_modules

y --prod

zip --quiet -r --exclude="node_modules/aws-sdk/\*" \
artifact.zip \
lib node_modules

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
