import * as THREE from 'three';

import {
  uApi,
  createTexture,
  createTextureFromTiff
} from './index.js'

function isValidChannel(channel) {
  return (
    uApi.getState() &&
    uApi.getState().channels.length > 0 &&
    channel >= 1 &&
    uApi.getState().channels[channel - 1] &&
    uApi.getState().channels[channel - 1].uniforms.contrast &&
    uApi.getState().channels[channel - 1].uniforms.brightness &&
    uApi.getState().channels[channel - 1].uniforms.color
  );
}

function updateUniformBrightness(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.brightness.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

function updateUniformContrast(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.contrast.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

function updateUniformWhitepoint(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.whitepoint.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

function updateUniformBlackpoint(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.blackpoint.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

function updateUniformOpacity(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.opacity.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

function updateUniformColor(value, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.uniforms.color.value = value;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

export function updateImage(file, channel) {
  let name = file.name;
  let blob = file.image;
  let texture = file.texture;

  if (texture === '') {
    if (file.type === 'image/tiff') {
      // texture = createTextureFromTiff(file.pages);
      // texture = createTexture(blob);
    } else {
      texture = createTexture(blob);
    }
  }
  const prevStateCh = uApi.getState().channels[channel - 1];

  if (
    prevStateCh.name !== name ||
    prevStateCh.imagepath !== blob ||
    prevStateCh.uniforms.image.value !== texture
  ) {
    updateUniformImage(texture, name, blob, channel);
  }
}

export function updateTexture(file, imageData) {
  let name = file.name;
  let blob = file.image;
  let texture = file.texture;
  let channel = 1;
  console.log("updateTexture", imageData, file)
  //   if (file.type === 'image/tiff') {
  //     console.log("updateImage")
      texture = createTextureFromTiff(imageData);
  //     // texture = createTexture(blob);
  //   } else {
  //     texture = createTexture(blob);
  //   }
  // }
  console.log("texture: ", texture)
  const prevStateCh = uApi.getState().channels[channel - 1];

  if (
    prevStateCh.name !== name ||
    prevStateCh.imagepath !== blob ||
    prevStateCh.uniforms.image.value !== texture
  ) {
    updateUniformImage(texture, name, blob, channel);
  }
}

export function updateUniformImage(texture, name, imagepath, channel) {
  uApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;

        newChannel.name = name;
        newChannel.imagepath = imagepath;
        newChannel.uniforms.image.value = texture;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

export function updateBrightness(value, channel) {
  if (isValidChannel(channel)) {
    if (
      value !== uApi.getState().channels[channel - 1].uniforms.brightness.value
    ) {
      updateUniformBrightness(value, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::UpdateBrighness() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}

export function updateContrast(value, channel) {
  if (isValidChannel(channel)) {
    if (
      value !== uApi.getState().channels[channel - 1].uniforms.contrast.value
    ) {
      updateUniformContrast(value, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::updateContrast() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}

export function updateWhitepoint(value, channel) {
  if (isValidChannel(channel)) {
    if (
      value !== uApi.getState().channels[channel - 1].uniforms.whitepoint.value
    ) {
      updateUniformWhitepoint(value, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::updateWhitepoint() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}

export function updateBlackpoint(value, channel) {
  if (isValidChannel(channel)) {
    if (
      value !== uApi.getState().channels[channel - 1].uniforms.blackpoint.value
    ) {
      updateUniformBlackpoint(value, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::updateBlackpoint() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}

export function updateOpacity(value, channel) {
  if (isValidChannel(channel)) {
    if (
      value !== uApi.getState().channels[channel - 1].uniforms.opacity.value
    ) {
      updateUniformOpacity(value, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::updateOpacity() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}

export function updateColor(value, channel) {
  var color = new THREE.Color(value.color);

  if (isValidChannel(channel)) {
    if (value !== uApi.getState().channels[channel - 1].uniforms.color.value) {
      updateUniformColor(color, channel);
    }
    return true;
  } else {
    console.log(
      'CanvasControl::updateColor() - null state',
      uApi.getState(),
      ' channel: ',
      channel,
      ' value: ',
      value
    );
  }
  return false;
}
