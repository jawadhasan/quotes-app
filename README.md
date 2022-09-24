# Quotes App

A simple application utilizaing basic AWS Services

- S3 for input (JSON file with quotes data)
- S3 events when new file is uploaded
- AWS Lambda for file processing
- DynamoDB for persistence
- S3 static website (quoteapp.awsclouddemos.com)
- API for quotes data from dynamodb to display on website.

## create bucket for App artifacts
aws s3 mb s3://quoteapp-artifacts-sam


## SAM package
aws cloudformation package `
--template-file sam-template.yaml `
--s3-bucket quoteapp-artifacts-sam `
--output-template-file sam-output-template.yaml

## SAM Deploy
aws cloudformation deploy `
--template-file sam-output-template.yaml `
--stack-name quoteapp-sam `
--capabilities CAPABILITY_IAM

## SAM Delete
aws cloudformation delete-stack `
--stack-name quoteapp-sam


## Cloudformation - Static Website
aws cloudformation create-stack  `
 --stack-name quoteapp-web  `
 --template-body file://demo-s3.yaml

## Build and Deploy
npm run build from web folder
..>dist folder

aws s3 sync . s3://quoteapp.awsclouddemos.com --acl public-read
