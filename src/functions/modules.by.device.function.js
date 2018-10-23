'use strict';

const { helpers } = require('b4f-common');
const modulesDynamoDB = require('../services/dynamodb/modules.dynamodb.service');

module.exports = (req, context) => {
  const { deviceId } = req.pathParameters;

  return modulesDynamoDB.getByDeviceId(deviceId)
    .then(data => {
      return helpers.response.success(data, context);
    })
    .catch(err => {
      return helpers.response.error(err, context);
    });
}