import CameraModule from 'camera-module-for-test';

const uut = document.body.querySelector('#uut');

window.cameraModule = new CameraModule();
uut.appendChild(cameraModule.getHtml());

cameraModule.start().then(() => {
  uut.addEventListener('click',() => {
    cameraModule.getNextVideoStream();
  });
});

