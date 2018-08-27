export default function setIdListPointers() {

  if (this.deviceIdList.videoinput.length) {
    this.currentVideoinputDevice = 0; 
  } else {
    this.currentVideoinputDevice = null; 
  }

  if (this.deviceIdList.audioinput.length) {
    this.currentAudioinputDevice = 0;
  } else {
    this.currentAudioinputDevice = null;
  }

  if (this.deviceIdList.audiooutput.length) {
    this.currentAudiooutputDevice = 0;
  } else {
    this.currentAudiooutputDevice = null;
  }

}

