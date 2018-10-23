'use strict';
const { configs } = require('b4f-common');
configs.xRay.init();

const functionCreateModules = require('./functions/modules.create.function');
const createModules = async (event, context) => {
  return functionCreateModules(event, context);
};

const functionModulesByDevice = require('./functions/modules.by.device.function');
const getModulesByDeviceId = async (event, context) => {
  return functionModulesByDevice(event, context);
};

const functionModulesContentByDevice = require('./functions/modules.contents.by.device.function');
const getModulesContentsByDevice = async (event, context) => {
  return functionModulesContentByDevice(event, context);
};

module.exports = {
  createModules,
  getModulesByDeviceId,
  getModulesContentsByDevice
};