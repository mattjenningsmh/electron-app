const osUtils = require('node-os-utils');
const fs = require('fs');
const os = require('os');

const POLLING_INTERVAL = 500;

function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const usedMemoryPercentage = getMemoryUsage().usedMemoryPercentage; 
    console.log({ cpuUsage, usedMemoryPercentage}); 
  }, POLLING_INTERVAL);
}

function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(os.totalmem() / 1024 / 1024 / 1024); // Convert bytes to GB

  return { totalStorage, cpuModel, totalMemoryGB };
}

function getMemoryUsage() {
    
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const usedMemoryPercentage = (usedMemory/ totalMemory) * 100; 

    return {
        usedMemoryPercentage: usedMemoryPercentage.toFixed(2),
    }; 
}

async function getCpuUsage() {
  return osUtils.cpu.usage(); 
}



module.exports = { pollResources, }; 
