
export class Volume {
  constructor (args) {
    this.channel = args.channel; // a data cube
    this.segmentation = args.segmentation; // a segmentation cube

    this.segments = {};
    this.requests = [];
  }

  renderChannelSlice (ctx, axis, slice) {
    let _this = this;

    let pixels = _this.channel.grayImageSlice(axis, slice, /*transparency=*/false, /*copy=*/false);
    let slice32 = new Uint32Array(pixels.data.buffer); // creates a view, not an array

    for (let i = slice32.length - 1; i >= 0; i--) {
      slice32[i] = ((slice32[i] & 0x00ffff00) && slice32[i]);
    }

    ctx.putImageData(pixels, 0, 0);
    _this.channel.cacheImgData(axis);
    return this;
  }
  load (context, buffer, width) {
    this.loadVolume(context, this.channel, buffer, width)
  }
  loadVolume (context, cube, buffer, width) {
    cube.insertImageData(buffer, width, 0, 0, 0)
  }
}