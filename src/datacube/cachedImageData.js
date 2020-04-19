
class CachedImageData {
    constructor (context) {
        this.context = context;
        this.cache = null;
        this.axes = {
            'x': null,
            'y':null,
            'z':null };
    }

    getImageData(width, height) {
        if (!this.cache || this.cache.width !== width || this.cache.height !== height) {
            this.cache = this.context.createImageData(width, height);
        }
        // returns up to 1023 for y and x why??
        // ImageData {data: Uint8ClampedArray}
        return this.cache;
    }

    cacheImageData(imageData, axis) {
        if (!this.axes[axis]) {
            this.axes[axis] = imageData;
        }
    }

    getCachedImageData(axis, width, height) {
        if (!this.axes[axis]) {
            this.axes[axis] = this.context.createImageData(width, height);
            console.log("cacheImageData::getCachedImageData - creating new ")
        }
        console.log("cacheImageData::getCachedImageData - returning old")
        return this.axes[axis];
    }
}

export default CachedImageData