export default function organizeDeviceInfo(thisDevice) {
  this.device.all[thisDevice.deviceId] = thisDevice;
  this.device[thisDevice.kind][thisDevice.deviceId] = thisDevice;

  this.deviceIdList.all.push(thisDevice.deviceId);
  this.deviceIdList[thisDevice.kind].push(thisDevice.deviceId);
}

