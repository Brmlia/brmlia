import CachedImageData from './cachedImageData.js';
import { registerWorker, saveFiles, getArrayBuffer } from '../cache/cache.js'

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
    this.sw = registerWorker()
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

  async insertImageData (imgdata, width, offsetx, offsety, offsetz) {

    // let _cube
    // if (offsetz === 0) {
    //   _cube = this.materialize()
    // }
    // else {
    //   _cube = await this.getCube()
    // }
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
        // _cube[
          (offsetx + x) + sizex * (offsety + y) + zadj
        ] = data32[ x + y * width ] & mask;
      }
    }

    _this.clean = false;

    // this.cacheCube(_cube)
    return this;
  }

  async slice (axis, index, invertV, copy = true) {
    let _this = this;

    let _cube
    if (this.cube) {
      _cube = this.cube
    }
    else {
      let _cached_cube = await this.getCube()
      _cube = new Uint8ClampedArray(_cached_cube)
    }
    if (index < 0 || index >= this.size[axis]) {
      throw new Error(index + ' is out of bounds.');
    }

    const xsize = _this.size.x,
      ysize = _this.size.y,
      zsize = _this.size.z;

    const xysize = xsize * ysize;

    let face = this.faces[axis];
    let ArrayType = this.arrayType();

    let square = new ArrayType(this.size[face[0]] * this.size[face[1]]);
    let byteoffset = index * xysize * this.bytes;

    // Note: order of loops is important for efficient memory access
    // and correct orientation of images. Consecutive x access is most efficient.

    let i = square.length - 1;
    if (invertV) {
      if (axis === 'z') {
        if (copy) {
          // let buf = _this.cube.buffer.slice(byteoffset, byteoffset + xysize * this.bytes);
          let buf = _cube.buffer.slice(byteoffset, byteoffset + xysize * this.bytes);
          return new ArrayType(buf);
        }
        else {
          let i = square.length - 1;
          const zoffset = xysize * index;
          for (let y = 0; y < ysize - 1; y++) {
            for (let x = xsize - 1; x >= 0; --x) {
              // square[i] = _this.cube[x + xsize * y + zoffset];
              square[i] = _cube[x + xsize * y + zoffset];
              --i;
            }
          }
        }
      }
      if (axis === 'x') {
        for (let z = 0; z < zsize - 1; z++) {
          for (let y = ysize - 1; y >= 0; --y) {
            // square[i] = _this.cube[index + xsize * y + xysize * z];
            square[i] = _cube[index + xsize * y + xysize * z];
            --i;
          }
        }
      }
      else if (axis === 'y') {
        // possible to make this more efficient with an array memcpy
        // as 256 x are consecutive, but no memcpy in browser.
        const yoffset = xsize * index;
        for (let z = 0; z < zsize - 1; z++) {
          for (let x = xsize - 1; x >= 0; --x) {
            // square[i] = _this.cube[x + yoffset + xysize * z];
            square[i] = _cube[x + yoffset + xysize * z];
            --i;
          }
        }
      }
    }
    else {
      if (axis === 'z') {
        // return new ArrayType(_this.cube.buffer, byteoffset, xysize);
        return new ArrayType(_cube.buffer, byteoffset, xysize);
      }
      if (axis === 'x') {
        for (let z = zsize - 1; z >= 0 ; --z) {
          for (let y = ysize - 1; y >= 0; --y) {
            // square[i] = _this.cube[index + xsize * y + xysize * z];
            square[i] = _cube[index + xsize * y + xysize * z];
            --i;
          }
        }
      }
      else if (axis === 'y') {
        // possible to make this more efficient with an array memcpy
        // as 256 x are consecutive, but no memcpy in browser.
        const yoffset = xsize * index;
          for (let z = zsize - 1; z >= 0 ; --z) {
          for (let x = xsize - 1; x >= 0; --x) {
            // square[i] = _this.cube[x + yoffset + xysize * z];
            square[i] = _cube[x + yoffset + xysize * z];
            --i;
          }
        }
      }
    }
    return square;
  }

  async grayImageSlice (axis, index, invertV, transparency=false, copy=true) {

    let square = await this.slice(axis, index, invertV, /*copy=*/false);

    let sizes = await this.faceDimensions(axis);

    let imgdata = copy
      ? await this.canvas_context.createImageData(sizes[0], sizes[1])
      : await this.cached_imgdata.getImageData(sizes[0], sizes[1]);

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

  async getImageData() {
    let sizes = await this.faceDimensions('z');
    return await this.cached_imgdata.getImageData(sizes[0], sizes[1]);
  }

  async cacheCube() {
    let buf
    if (this.cube.buffer) {
      buf = this.cube.buffer
    }
    else {
      buf = this.cube
    }
    await saveFiles(this.sw, "samplecube-1.buf", buf)
    this.cube = null
  }

  async getCube() {
    let content
    await getArrayBuffer("samplecube-1.buf").then((ctnt) => {
      content = ctnt
    })
    return content
  }
}

export default DataCube
