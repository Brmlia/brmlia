export class Volume {
  constructor(args) {
    this.channel = args.channel; // a data cube
    this.segmentation = args.segmentation; // a segmentation cube

    this.segments = {};
    this.requests = [];
  }

  async renderChannelSlice(ctx, axis, slice) {
    let _this = this;

    let pixels = await _this.channel.grayImageSlice(
      axis,
      slice,
      /*transparency=*/ false,
      /*copy=*/ false
    );
    // let pixels = _this.channel.imageSlice(axis, slice, /*copy=*/false);
    let slice32 = await new Uint32Array(pixels.data.buffer); // creates a view, not an array

    for (let i = slice32.length - 1; i >= 0; i--) {
      slice32[i] = slice32[i] & 0x00ffff00 && slice32[i];
    }

    await ctx.putImageData(pixels, 0, 0);
    return this;
  }
  async load(buffer, width, slice) {
    await this.loadVolume(this.channel, buffer, width, slice);
  }
  async loadVolume(cube, buffer, width, slice) {
    await cube.insertImageData(buffer, width, 0, 0, slice);
  }
}
