#!/bin/bash

stack_name="dreamgraph-$1"

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

cd frontend/app
aws s3 sync dist s3://$s3_bucket_name/
echo "--upload complete--"

# cloudfront invalidation
invalidation_id=$(
    aws cloudfront create-invalidation \
        --distribution-id $cloudfront_distribution_id \
        --paths "/*" \
        --query "Invalidation.Id" \
        --output text
    )

cloudfront_domain_name=$(
    aws cloudfront list-distributions \
        --query "DistributionList.Items[?Id=='$cloudfront_distribution_id'].DomainName" \
        --output text
    )

echo "Invalidation is being processed...wait until invalidation is complete ☕️"
echo "The app will be up on $cloudfront_domain_name"
