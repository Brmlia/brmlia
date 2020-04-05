import React from 'react';
import { fApi, uApi } from '../utils/index.js'

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

export function updateUniformImage(texture, name, channel) {
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
    console.log("null state", uApi.getState(), " channel: " , channel, " value: ", value)
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
    console.log("null state", uApi.getState(), " channel: " , channel, " value: ", value)
  }
  return false;
}
