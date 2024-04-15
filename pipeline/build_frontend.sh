#!/bin/bash

stack_name="serverless-chat-$1"

api_endpoint=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='GraphQLApiEndpoint'].OutputValue" \
        --output text
    )

api_key=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='GraphQLApiKey'].OutputValue" \
        --output text
    )

cd frontend/app
pnpm i
rm .env && touch .env
echo "VITE_API_ENDPOINT=$api_endpoint" >> .env
echo "VITE_API_KEY=$api_key" >> .env
pnpm build

echo "--build complete--"