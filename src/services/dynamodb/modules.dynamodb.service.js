'use strict';

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const create = (deviceId, moduleId, settings) => {
  const params = {
    TableName: 'B4F_MODULES',
    Item: {
      'deviceId': deviceId,
      'moduleId': moduleId,
      'settings': settings
    }
  };

  return new Promise((resolve, reject) => {
    documentClient.put(params, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve({ deviceId, moduleId, settings });
    });
  });
}

const update = (deviceId, moduleId, settings) => {
  const params = {
    TableName: "B4F_MODULES",
    Key: {
      'deviceId': deviceId,
      'moduleId': moduleId,
    },
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

const remove = (deviceId, moduleId) => {
  const params = {
    TableName: "B4F_MODULES",
    Key: {
      deviceId,
      moduleId
    }
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

const getByDeviceId = (deviceId) => {
  const params = {
    TableName: 'B4F_MODULES',
    KeyConditionExpression: 'deviceId = :m',
    ExpressionAttributeValues: {
      ':m': deviceId
    }
  };

  return new Promise((resolve, reject) => {
    documentClient.query(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.Items.length === 0) {
        return reject({ httpStatusCode: 404, message: 'Device note found'});
      }

      return resolve(data.Items);
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
  getByDeviceId,
  getAll
};