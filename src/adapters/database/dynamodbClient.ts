import {awsConfig} from "../../configuration/awsConfig";
import AWS from "aws-sdk";

const dynamoDBClient = new AWS.DynamoDB({
    region: awsConfig.region,
    // @ts-ignore
    endpoint: awsConfig.endpoint,
})

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    service: dynamoDBClient
})

export {dynamoDB};