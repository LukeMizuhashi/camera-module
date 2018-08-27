export default function validateDeviceInfo(deviceInfo) {

  if (!deviceInfo.kind.toLowerCase() === 'all' ) {
    throw new Error(
      `Encountered device of unexpected kind:\n`
    + `    Device ID: ${deviceInfo.deviceId}\n`
    + `  Device Kind: ${deviceInfo.kind}`
    );
  }

  if (!this.device.hasOwnProperty(deviceInfo.kind)) {
    throw new Error(
      `Encountered device of unknown kind:\n`
    + `    Device ID: ${deviceInfo.deviceId}\n`
    + `  Device Kind: ${deviceInfo.kind}`
    );
  }
};

