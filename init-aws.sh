#!/bin/bash

awslocal dynamodb create-table \
    --table-name todo-list-table-development \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

echo "Tables created successfully!"
