
export default class GenerateFrameNumberConfigFactory {

  static createGenerateFrameNumberConfig(start, skip, count) {
    let frameNumbers = [];
    for (let i = start; i < count * skip; i = i + skip) {
      frameNumbers.push(i);
    }

    return { frames: frameNumbers };
  }
}
