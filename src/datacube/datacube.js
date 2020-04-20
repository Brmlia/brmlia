
import CachedImageData from './cachedImageData.js'

class DataCube {
  constructor (args) {
    this.bytes = args.bytes || 1;
    this.size = args.size || { x: 256, y: 256, z: 256 };
    this.canvas_context = args.context;
    this.cube = this.materialize();

    // this.canvas_context = this.createImageContext();
    this.cached_imgdata = new CachedImageData(this.canvas_context);
    this.clean = true;
    this.loaded = false;

    this.faces = {
      x: [ 'y', 'z' ],
      y: [ 'x', 'z' ],
      z: [ 'x', 'y' ],
    };
  }

  faceDimensions (axis) {
    let face = this.faces[axis];
    return [
      this.size[face[0]],
      this.size[face[1]]
    ];
  }

  materialize () {
    let ArrayType = this.arrayType();

    let size = this.size;

    return new ArrayType(size.x * size.y * size.z);
  }

  insertImageData (imgdata, width, offsetx, offsety, offsetz) {
    let _this = this;

    // let pixels = imgdata.data; // Uint8ClampedArray
    let pixels = imgdata;

    // This viewing of the Uint8 as a Uint32 allows for
    // a memory stride of 4x larger, making reading and writing cheaper
    // as RAM is the slow thing here.
    let data32 = new Uint32Array(pixels.buffer); // creates a view, not an array

    // Note: on little endian machine, data32 is 0xaabbggrr, so it's already flipped
    // from the Uint8 RGBA

    let masks = {
      true: {
        1: 0x000000ff,
        2: 0x0000ffff,
        4: 0xffffffff,
      },
      false: {
        1: 0xff000000,
        2: 0xffff0000,
        4: 0xffffffff,
      },
    };

    const mask = masks[this.isLittleEndian()][this.bytes];

    let x = 0, y = 0;

    const sizex = _this.size.x | 0,
        zadj = (offsetz * _this.size.x * _this.size.y) | 0;

    for (y = width - 1; y >= 0; y--) {
      for (x = width - 1; x >= 0; x--) {

        _this.cube[
          (offsetx + x) + sizex * (offsety + y) + zadj
        ] = data32[ x + y * width ] & mask;
      }
    }

    _this.clean = false;

    return this;
  }

  slice (axis, index, copy = true) {
    let _this = this;

    if (index < 0 || index >= this.size[axis]) {
      throw new Error(index + ' is out of bounds.');
    }

    const xsize = _this.size.x,
      ysize = _this.size.y,
      zsize = _this.size.z;

    const xysize = xsize * ysize;

    let face = this.faces[axis];
    let ArrayType = this.arrayType();

    if (axis === 'z') {
      let byteoffset = index * xysize * this.bytes;

      if (copy) {
        let buf = _this.cube.buffer.slice(byteoffset, byteoffset + xysize * this.bytes);
        return new ArrayType(buf);
      }
      else {
        return new ArrayType(_this.cube.buffer, byteoffset, xysize);
      }
    }

    let square = new ArrayType(this.size[face[0]] * this.size[face[1]]);

    // Note: order of loops is important for efficient memory access
    // and correct orientation of images. Consecutive x access is most efficient.

    let i = square.length - 1;
    if (axis === 'x') {
      for (let z = zsize - 1; z >= 0; --z) {
        for (let y = ysize - 1; y >= 0; --y) {
          square[i] = _this.cube[index + xsize * y + xysize * z];
          --i;
        }
      }
    }
    else if (axis === 'y') {
      // possible to make this more efficient with an array memcpy
      // as 256 x are consecutive, but no memcpy in browser.
      const yoffset = xsize * index;
      for (let z = zsize - 1; z >= 0; --z) {
        for (let x = xsize - 1; x >= 0; --x) {
          square[i] = _this.cube[x + yoffset + xysize * z];
          --i;
        }
      }
    }

    return square;
  }

  grayImageSlice (axis, index, transparency=false, copy=true) {

    let square = this.slice(axis, index, /*copy=*/false);

    let sizes = this.faceDimensions(axis);

    let imgdata = copy
      ? this.canvas_context.createImageData(sizes[0], sizes[1])
      : this.cached_imgdata.getImageData(sizes[0], sizes[1]);

    let data32 = new Uint32Array(imgdata.data.buffer);

    const alpha = this.isLittleEndian()
      ? 0xff000000
      : 0x000000ff;

    let i = 0;

    if (transparency) {
      for (i = square.length - 1; i >= 0; i--) {
        data32[i] = (square[i] | (square[i] << 8) | (square[i] << 16) | (square[i] && alpha));
      }
    }
    else {
      for (i = square.length - 1; i >= 0; i--) {
        data32[i] = (square[i] | (square[i] << 8) | (square[i] << 16) | alpha);
      }
    }

    return imgdata;
  }

  // http://stackoverflow.com/questions/504030/javascript-endian-encoding
  isLittleEndian () {
    var arr32 = new Uint32Array(1);
    var arr8 = new Uint8Array(arr32.buffer);
    arr32[0] = 255;

    let islittle = (arr8[0] === 255);

    this.isLittleEndian = () => islittle;

    return islittle;
  }

  // For internal use, return the right bitmask for rgba image slicing
  // depending on CPU endianess.
  getRenderMaskSet () {
    let bitmasks = {
      true: { // little endian, most architectures
        r: 0x000000ff,
        g: 0x0000ff00,
        b: 0x00ff0000,
        a: 0xff000000,
      },
      false: { // big endian, mostly ARM and some specialized equipment
        r: 0xff000000,
        g: 0x00ff0000,
        b: 0x0000ff00,
        a: 0x000000ff,
      },
    };

    return bitmasks[this.isLittleEndian()];
  }
  arrayType () {
    let choices = {
      1: Uint8ClampedArray,
      2: Uint16Array,
      4: Uint32Array,
    };

    let ArrayType = choices[this.bytes];

    if (ArrayType === undefined) {
      throw new Error(this.bytes + ' is not a valid typed array byte count.');
    }

    return ArrayType;
  }
}

export default DataCube