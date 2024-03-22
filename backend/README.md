# backend

## local testing

```sh
# run local dynamodb
docker run -p 8000:8000 amazon/dynamodb-local

# check tables before you test
aws dynamodb list-tables --endpoint-url http://localhost:8000

# create if missing
aws dynamodb create-table --table-name LocalTable --attribute-definitions AttributeName=createdAt,AttributeType=S --key-schema AttributeName=createdAt,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://127.0.0.1:8000

# run locally overriding the endpoint
sam local start-api --env-vars local/env.json
```