
'use strict';

const { helpers } = require('b4f-common');
const dynamodb = require('../services/dynamodb/modules.dynamodb.service');

module.exports = (req, context) => {
  const { moduleId, deviceId, settings } = JSON.parse(req.body);
  return dynamodb.create(deviceId, moduleId, settings)
    .then(data => {
      return helpers.response.success(data, context, 201);
    })
    .catch(err => {
      return helpers.response.error(err, context);
    });
}