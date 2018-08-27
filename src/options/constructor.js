export default class Options {
  constructor(userInput) {
    // Defaults
    this.playsinline = true;
    this.autoplay = true;

    // Copy user settings / override defaults
    if (userInput) {
      Object.keys(userInput).forEach( key => this[key] = userInput[key] );
    }
  }
};

