import Options from './options/constructor.js';
import validateDeviceInfo from './validateDeviceInfo.js';
import organizeDeviceInfo from './organizeDeviceInfo.js';
import setIdListPointers from './setIdListPointers.js';

export default class CameraModule {

  constructor(options) {
    
    this.options = new Options(options);

    this.device = {
      videoinput: {},
      audioinput: {},
      audiooutput: {},
      all: {},
    };

    this.deviceIdList = {
      videoinput: [],
      audioinput: [],
      audiooutput: [],
      all: [],
    };

    this.currentVideoinputDevice = undefined; 
    this.currentAudioinputDevice = undefined;
    this.currentAudiooutputDevice = undefined;

    this.videoEl = document.createElement('video');
    this.videoEl.setAttribute('playsinline','');
    this.videoEl.setAttribute('autoplay','');
  }

  getNumberOfVideoInputDevices() {
    return this.deviceIdList.videoinput.length;
  }

  start() {
    let result = navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfoList) => {
        deviceInfoList.forEach((thisDevice) => {
          validateDeviceInfo.call(this,thisDevice);
          organizeDeviceInfo.call(this,thisDevice);
        });
        setIdListPointers.call(this);
      })
    ;
    if (this.options.getStreamOnStart) {
      result.then(() => {
        return this.getCurrentVideoStream();  
      });
    }
    return result;
  }

  getHtml() {
    return this.videoEl;
  }

  getNextVideoStream() {
    this.currentVideoinputDevice++;
    if (this.currentVideoinputDevice == this.deviceIdList.videoinput.length) {
      this.currentVideoinputDevice = 0;
    }
    return this.getCurrentVideoStream();
  }

  getCurrentVideoStream() {
    const options = {
      audio: true,
      video: {
        deviceId: {
          exact: this.deviceIdList.videoinput[this.currentVideoinputDevice]
        }
      }
    };
    return navigator.mediaDevices.getUserMedia(options).then((mediaStream) => {
      mediaStream.getAudioTracks().forEach((audioTrack) => {
        audioTrack.enabled = false
      });
      this.videoEl.srcObject = mediaStream;
      this.videoEl.play();
      return mediaStream;
    });
  }

}

