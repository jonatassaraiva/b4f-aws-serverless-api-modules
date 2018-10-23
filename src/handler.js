'use strict';
const { configs } = require('b4f-common');
configs.xRay.init();

const functionCreateModules = require('./functions/modules.create');
const createModules = async (event, context) => {
  return functionCreateModules(event, context);
};

const functionModulesByDevice = require('./functions/modules.get');
const getModulesByDeviceId = async (event, context) => {
  return functionModulesByDevice(event, context);
};

module.exports = {
  createModules,
  getModulesByDeviceId
};