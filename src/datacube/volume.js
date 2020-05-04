
export class Volume {
  constructor (args) {
    console.debug("Volume() - args:", args)
    this.channel = args.channel;
  }

  async renderChannelSlice (ctx, axis, slice, invertV) {
    let _this = this;

    let pixels = await _this.channel.grayImageSlice(axis, slice, invertV, /*transparency=*/false, /*copy=*/false);
    let slice32 = await new Uint32Array(pixels.data.buffer); // creates a view, not an array

    for (let i = slice32.length - 1; i >= 0; i--) {
      slice32[i] = ((slice32[i] & 0x00ffff00) && slice32[i]);
    }

    await ctx.putImageData(pixels, 0, 0);
    return this;
  }
  async load (buffer, width, slice) {
    await this.loadVolume(this.channel, buffer, width, slice)
  }
  async loadVolume (cube, buffer, width, slice) {
    await cube.insertImageData(buffer, width, 0, 0, slice)
}

  async getImageData() {
    return await this.channel.getImageData()
  }
}
