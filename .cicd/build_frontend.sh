#!/bin/bash

stack_name="dreamgraph-$1"

# leave these operations to see if the role works
api_endpoint=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
        --output text
    )

$user_pool_id=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" \
        --output text
    )

$user_pool_client_id=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" \
        --output text
    )

cd frontend/app
pnpm i
rm .env && touch .env
echo "VITE_API_ENDPOINT=$api_endpoint" >> .env
echo "VITE_USER_POOL_ID=$user_pool_id" >> .env
echo "VITE_USER_POOL_CLIENT_ID=$user_pool_client_id" >> .env

pnpm build

echo "--build complete--"
