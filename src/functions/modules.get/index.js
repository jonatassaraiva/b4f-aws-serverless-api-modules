'use strict';

const { helpers } = require('b4f-common');

const dynamodb = require('./services/get.dynamodb.service');

module.exports = (req, context) => {
  const { deviceId } = req.pathParameters;

  return dynamodb.get(deviceId)
    .then(data => {
      if (data.length === 0) {
        return helpers.response.error({ httpStatusCode: 404, message: 'Device not found' }, context);
      }

      return helpers.response.success(data, context);
    })
    .catch(err => {
      return helpers.response.error(err, context);
    });
}