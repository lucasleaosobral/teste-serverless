import * as dotenv from "dotenv";
dotenv.config();

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,

}
if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    awsConfig.endpoint = process.env.DYNAMODB_ENDPOINT
}

export {awsConfig};