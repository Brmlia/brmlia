
export class Volume {
  constructor (args) {
    console.debug("Volume() - args:", args)
    this.channel = args.channel;
  }

  async renderChannelSlice (ctx, axis, slice, invertV) {
    let pixels = await this.channel.grayImageSlice(axis, slice, invertV, /*transparency=*/false, /*copy=*/false);
    return pixels;
  }

  async drawImage(ctx, pixels) {
    await ctx.putImageData(pixels, 0, 0);
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
