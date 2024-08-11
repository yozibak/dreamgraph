
# backend/api

## test lambda locally

TODO: run this on git push somehow

```
docker run -d -p 8000:8000 amazon/dynamodb-local

aws dynamodb create-table --table-name LocalTable --attribute-definitions AttributeName=createdAt,AttributeType=S --key-schema AttributeName=createdAt,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://127.0.0.1:8000

pnpm test:lambda
```
