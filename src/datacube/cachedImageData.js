class CachedImageData {
  constructor(context) {
    this.context = context;
    this.cache = null;
  }

  getImageData(width, height) {
    if (
      !this.cache ||
      this.cache.width !== width ||
      this.cache.height !== height
    ) {
      this.cache = this.context.createImageData(width, height);
    }

    return this.cache;
  }
}

export default CachedImageData;
