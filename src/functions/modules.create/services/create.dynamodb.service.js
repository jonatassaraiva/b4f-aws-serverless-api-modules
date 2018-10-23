'use strict';

const AWS = require("aws-sdk");

const create = (deviceId, moduleId, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Item: {
      "deviceId": deviceId,
      "moduleId": moduleId,
      "settings": settings
    }
  };

  const documentClient = new AWS.DynamoDB.DocumentClient();
  return new Promise((resolve, reject) => {
    documentClient.put(params, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve({deviceId, moduleId, settings});
    });
  });
}

module.exports = {
  create
}