var AWS = require('aws-sdk');

AWS.config.region = process.env.AWS_REGION

// AWS.config.update({  
//     region: process.env.region,
//     endpoint: process.env.endpoint,
// });
const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;