import Options from './options/constructor.js';

export default class CameraModule {

  constructor(options) {
    
    this.options = new Options(options);

    this.supportedConstraints = {};

    this.videoEl = document.createElement('video');
    this.videoEl.setAttribute('playsinline','');
    this.videoEl.setAttribute('autoplay','');
  }

  start() {
    this.supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  }

  switchVideoStream() {
    let facingMode = undefined;
    switch(this.facingMode) {
      case 'environment':
        facingMode = 'user';
        break;
      case 'user':
        facingMode = 'environment';
        break;
      case 'left':
        facingMode = 'right';
        break;
      case 'right':
        facingMode = 'left';
        break;
      default:
        console.warn(
          `Encountered unhandled video track facing mode: ${trackSettings}`,
          trackSettings 
        );
        break;
    }
    return this.getVideoStream(facingMode);
  }

  getVideoStream(facingMode) {
    const options = {
      audio: true,
      video: {
        facingMode: facingMode || 'environment'
      },
    };
    return navigator.mediaDevices.getUserMedia(options)

      .then((mediaStream) => {
        const promises = [];
        this.facingMode = options.video.facingMode;

        mediaStream.getAudioTracks().forEach((track) => {
          const capabilities = track.getCapabilities();
          const constraints = {};
          track.enabled = false;

          if (this.supportedConstraints.sampleRate
          && capabilities.sampleRate
          && capabilities.sampleRate.max) {
            constraints.sampleRate = capabilities.sampleRate.max;
          }

          const promise = track.applyConstraints(constraints)
            .catch((error) => {
              console.warn(
                'Encountered error while requesting constraint on track',
                error,
                constraints
              );
            })
          ;
          promises.push(promise);
        });

        mediaStream.getVideoTracks().forEach((track) => {
          const capabilities = track.getCapabilities();
          const constraints = {};

          if (this.supportedConstraints.frameRate
          && capabilities.frameRate
          && capabilities.frameRate.max) {
            constraints.frameRate = capabilities.frameRate.max;
          }

          if (this.supportedConstraints.width
          && capabilities.width
          && capabilities.width.max) {
            constraints.width = capabilities.width.max;
          }

          const promise = track.applyConstraints(constraints)
            .catch((error) => {
              console.warn(
                'Encountered error while requesting constraint on track',
                error,
                constraints
              );
            })
          ;
          promises.push(promise);
        });

        this.videoEl.srcObject = mediaStream;
        return Promise.all(promises);

      }).then(() => {
        return this.videoEl;
      }).catch((error) => {
        this.facingMode = null;
        console.warn(
          'Encountered error while attempting to get user media',
          error,
          options
        );

      })
    ; 
  }

}

