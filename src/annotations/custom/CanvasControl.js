import { uApi } from '../../components/utils.js'
import { createTexture, createTextureFromTiff } from './ImageStore.js'

function isValidChannel (channel) {
  return (uApi.getState() && (uApi.getState().channels.length > 0) && (channel >= 1) && uApi.getState().channels[channel-1] && uApi.getState().channels[channel-1].uniforms.contrast && uApi.getState().channels[channel-1].uniforms.brightness )
}

function updateUniformBrightness(value, channel) {
  uApi.setState( prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel-1) {
        var newChannel = ch;
        newChannel.uniforms.brightness.value = value
        return newChannel;
      }
      else {
        return ch
      }
    })
    return {
      channels
    }
  })
}

function updateUniformContrast(value, channel) {
  uApi.setState( prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel-1) {
        var newChannel = ch;
        newChannel.uniforms.contrast.value = value
        return newChannel;
      }
      else {
        return ch
      }
    })
    return {
      channels
    }
  })
}

function updateUniformWhitepoint(value, channel) {
  uApi.setState( prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel-1) {
        var newChannel = ch;
        newChannel.uniforms.whitepoint.value = value
        return newChannel;
      }
      else {
        return ch
      }
    })
    return {
      channels
    }
  })
}

function updateUniformBlackpoint(value, channel) {
  uApi.setState( prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel-1) {
        var newChannel = ch;
        newChannel.uniforms.blackpoint.value = value
        return newChannel;
      }
      else {
        return ch
      }
    })
    return {
      channels
    }
  })
}

export function updateImage(file) {

  let name = file.name;
  let blob = file.image;
  let texture = file.texture;

  if (texture === "") {
    if (file.type === "image/tiff") {
      texture = createTextureFromTiff(blob);
    }
    else {
      texture = createTexture(blob);
    }
  }

  if (uApi.getState().name !== name
    || uApi.getState().image !== blob
    || uApi.getState().uniforms.image.value !== texture
    ) {

    updateImageData(name, blob)
    updateUniformImage(texture, name)
  }
}

export function updateUniformImage(texture, name) {
  uApi.setState( prevState => ({
    ...prevState,
    uniforms: {
      ...prevState.uniforms,
      image: {
        ...prevState.uniforms.image,
        value: texture
      },
    }
  }))
}

export function updateImageData(name, imagepath) {
  uApi.setState( prevState => ({
    ...prevState,
    image: imagepath,
    name: name
  }))
}

export function updateUniformImage2(texture, name, channel) {
  uApi.setState( prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel-1) {
        var newChannel = ch;

        newChannel.name = name;
        newChannel.uniforms.image.value = texture
        return newChannel;
      }
      else {
        return ch
      }
    })
    return {
      channels
    }
  })
}

export function updateBrightness(value, channel) {
  if (isValidChannel(channel)) {
    if (value !== uApi.getState().channels[channel-1].uniforms.brightness.value){
      updateUniformBrightness(value, channel)
    }
    return true;
  }
  else {
    console.log("CanvasControl::UpdateBrighness() - null state", uApi.getState(), " channel: " , channel, " value: ", value)
  }
  return false;
}

export function updateContrast(value, channel) {
  if (isValidChannel(channel)) {
    if (value !== uApi.getState().channels[channel-1].uniforms.contrast.value){
      updateUniformContrast(value, channel)
    }
    return true;
  }
  else {
    console.log("CanvasControl::updateContrast() - null state", uApi.getState(), " channel: " , channel, " value: ", value)
  }
  return false;
}

export function updateWhitepoint(value, channel) {
  if (isValidChannel(channel)) {
    if (value !== uApi.getState().channels[channel-1].uniforms.whitepoint.value){
      updateUniformWhitepoint(value, channel)
    }
    return true;
  }
  else {
    console.log("CanvasControl::updateWhitepoint() - null state", uApi.getState(), " channel: " , channel, " value: ", value)
  }
  return false;
}

export function updateBlackpoint(value, channel) {
  if (isValidChannel(channel)) {
    if (value !== uApi.getState().channels[channel-1].uniforms.blackpoint.value){
      updateUniformBlackpoint(value, channel)
    }
    return true;
  }
  else {
    console.log("CanvasControl::updateBlackpoint() - null state", uApi.getState(), " channel: " , channel, " value: ", value)
  }
  return false;
}
