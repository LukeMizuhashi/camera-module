export default class Options {
  constructor(userInput) {
    // Defaults
    this.getStreamOnStart = false;

    // Copy user settings / override defaults
    if (userInput) {
      Object.keys(userInput).forEach( key => this[key] = userInput[key] );
    }
  }
};

