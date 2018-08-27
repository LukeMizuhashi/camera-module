import CameraModule from 'camera-module-for-test';

const uut = document.body.querySelector('#uut');

const options = {
  getStreamOnStart: true,
};
window.cameraModule = new CameraModule(options);
uut.appendChild(cameraModule.getHtml());

cameraModule.start().then(() => {
  uut.addEventListener('click',() => {
    cameraModule.getNextVideoStream();
  });
});

