'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION || 'eu-central-1'

const s3 = new AWS.S3()

const docClient = new AWS.DynamoDB.DocumentClient()

const ddbTable = process.env.DDBtable

// The Lambda handler
exports.handler = async (event) => {
  console.log (JSON.stringify(event, null, 2))
  console.log('Using DDB table: ', ddbTable)

  await Promise.all(
    event.Records.map(async (record) => {
      try {
        console.log('Incoming record: ', record)

        // Get original text from object in incoming event
        const originalText = await s3.getObject({
          Bucket: event.Records[0].s3.bucket.name,
          Key: event.Records[0].s3.object.key
        }).promise()

        // Upload JSON to DynamoDB
        const jsonData = JSON.parse(originalText.Body.toString('utf-8'))
        console.log('jsonData: ',jsonData);
        await ddbLoader(jsonData)
       

        //delete JSON file
        const deleteParams = {
          Bucket: event.Records[0].s3.bucket.name,
          Key: event.Records[0].s3.object.key
        }

        await deleteJsonFile(deleteParams);

      } catch (err) {
        console.error(err)
      }
    })
  )
}

// Load JSON data to DynamoDB table
const ddbLoader = async (data) => {
  // Separate into batches for upload
  let batches = []
  const BATCH_SIZE = 25

  while (data.length > 0) {
    batches.push(data.splice(0, BATCH_SIZE))
  }

  console.log(`Total batches: ${batches.length}`)

  let batchCount = 0
  let pkVal = 1;
  // Save each batch
  await Promise.all(
    batches.map(async (item_data) => {

      // Set up the params object for the DDB call
      const params = {
        RequestItems: {}
      }
      params.RequestItems[ddbTable] = []
  
     

      item_data.forEach(item => {
        for (let key of Object.keys(item)) {
          // An AttributeValue may not contain an empty string
          if (item[key] === '') 
            delete item[key]
        }
    
       //id:  AWS.util.uuid.v4(), use this one, if UUID is needed for pk
       pkVal = pkVal+1; //manually setting up PK in incrementing fashion in a basic way.
        // Build params
        params.RequestItems[ddbTable].push({
          PutRequest: {
            Item: {
              id:  pkVal.toString(),
              ...item
            }
          }
        })
      })

      // Push to DynamoDB in batches
      try {
        batchCount++
        console.log('Trying batch: ', batchCount)
        const result = await docClient.batchWrite(params).promise()
        console.log('Success: ', result)
      } catch (err) {
        console.error('Error: ', err)
      }
    })
  )
}


const deleteJsonFile = async(params)=>{
  await s3.deleteObject(params).promise()
  console.log(`${params.Key} file deleted Successfully`)
}
