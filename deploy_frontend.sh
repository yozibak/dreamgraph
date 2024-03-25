#!/bin/bash

# get the output values
stack_name="serverless-chat"

api_gateway_endpoint=$(
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

cloudfront_distribution_id=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
        --output text
    )

s3_bucket_name=$(
    aws cloudformation describe-stacks \
        --stack-name "$stack_name" \
        --query "Stacks[0].Outputs[?OutputKey=='WebS3BucketName'].OutputValue" \
        --output text
    )

echo "API Gateway URL: $api_gateway_endpoint"
echo "CloudFront Distribution ID: $cloudfront_distribution_id"
echo "S3 Bucket Name: $s3_bucket_name"

# build & deploy
cd frontend/app && pnpm i
rm .env && touch .env
echo "VITE_API_ENDPOINT=$api_gateway_endpoint" >> .env
echo "VITE_API_KEY=$api_key" >> .env
pnpm build && cd dist
aws s3 sync . s3://$s3_bucket_name/
echo "--upload complete--"

# cloudfront invalidation
invalidation_id=$(
    aws cloudfront create-invalidation \
        --distribution-id $cloudfront_distribution_id \
        --paths "/*" \
        --query "Invalidation.Id" \
        --output text
    )

aws cloudfront wait invalidation-completed \
    --distribution-id $cloudfront_distribution_id \
    --id $invalidation_id

cloudfront_domain_name=$(
    aws cloudfront list-distributions \
        --query "DistributionList.Items[?Id=='$cloudfront_distribution_id'].DomainName" \
        --output text
    )

echo "Invalidation is complete🎉 Visit $cloudfront_domain_name"
