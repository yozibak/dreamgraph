#!/bin/bash

stack_name="dreamgraph-$1"

user_pool_client_id=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" \
        --output text
    )

user_pool_id=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" \
        --output text
    )

api_endpoint=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
        --output text
    )

cd frontend/app
pnpm i
rm .env && touch .env

echo "USER_POOL_CLIENT_ID=$user_pool_client_id" >> .env
echo "USER_POOL_ID=$user_pool_id" >> .env
echo "API_ENDPOINT=$api_endpoint" >> .env
pnpm build

echo "--build complete--"