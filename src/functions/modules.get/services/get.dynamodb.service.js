'use strict';

const AWS = require("aws-sdk");

const get = (deviceId) => {
  const params = {
    TableName: 'B4F_MODULES',
    KeyConditionExpression: 'deviceId = :m',
    ExpressionAttributeValues: {
      ':m': deviceId
    }
  };

  const documentClient = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    documentClient.query(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data.Items);
    });
  });
}

module.exports = {
  get
}