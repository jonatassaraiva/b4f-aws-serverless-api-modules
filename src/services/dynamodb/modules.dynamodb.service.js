'use strict';

const AWS = require("aws-sdk");
const { logger } = require('b4f-common');

const documentClient = new AWS.DynamoDB.DocumentClient();

const create = (device, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Item: {
      "device": device,
      "settings": settings
    }
  };

  return new Promise((resolve, reject) => {
    documentClient.put(params, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve({device, settings});
    });
  });
}

const update = (device, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Key: device,
    UpdateExpression: 'set settings = :s',
    ExpressionAttributeValues: {
      ':s': settings
    },
    ReturnValues: 'UPDATED_NEW'
  };

  return new Promise((resolve, reject) => {
    documentClient.update(params, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

const remove = (device, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Key: device
  };

  return new Promise((resolve, reject) => {
    documentClient.delete(params, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

const get = (device, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Key: device
  };

  return new Promise((resolve, reject) => {
    documentClient.get(params, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

const getAll = () => {
  const params = {
    TableName: "B4F_MODULES"
  };

  return new Promise((resolve, reject) => {
    documentClient.scan(params, function (err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

module.exports = {
  create,
  update,
  remove,
  get,
  getAll
};