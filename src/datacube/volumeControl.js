import {volApi} from './volumeStore.js'
import {fileApi} from '../fileuploader/fileStore.js'

export function getVolume(index) {
  console.debug("getVolume - index: %d, all volumes: {", index, volApi.getState().volumes, "}")
  return volApi.getState().volumes[index]
}

export function addVolume(index, volume) {
  volApi.setState(prevState => ({
    ...prevState,
    volumes: [
      ...prevState.volumes,
      volume
    ],
  }));
}

export function updateVolume(index, volume) {
  volApi.setState(prevState => {
    const volumes = prevState.volumes.map((vol, j) => {
      if (j === index) {
        return volume;
      } else {
        return vol;
      }
    });
    return {
      volumes,
    };
  });
}

export function saveVolume(index, volume) {
  updateVolume(index, volume)
}

export function updateSliceIndex(channel, idx) {
  volApi.setState(prevState => {
    const sliceIndices = prevState.sliceIndices.map((sliceIdx, j) => {
      if (j === channel) {
        return idx;
      } else {
        return sliceIdx;
      }
    });
    return {
      sliceIndices,
    };
  });
}

export function updateSliceLength(channel, length) {
  volApi.setState(prevState => {
    const lengths = prevState.lengths.map((len, j) => {
      if (j === channel) {
        return length;
      } else {
        return len;
      }
    });
    return {
      lengths,
    };
  });
}

export function updateType(type) {
  volApi.setState(prevState => ({
    ...prevState,
    type: type
  }))
}

export function getType() {
  return volApi.getState().type
}

export function updateImageProps(order, channels, slices) {
  const valid = validateProps(channels, slices)

  if (valid === 0) {
    console.log("updateImageProps: ", order, channels, slices)
    volApi.setState(prevState => ({
      ...prevState,
      order: order,
      channels: channels,
      slices: slices
    }))
    getImageProps()
  }
  return valid
}

function validateProps(channels, slices) {
  if (fileApi.getState().file.length === 0) {
    return 1
  }
  else if (volApi.getState().stackSize !== (channels * slices)) {
    return 2
  }
  else if ((channels <= 0) || (channels > 10)) {
    return 3
  }
  else if ((slices <= 0)) {
    return 4
  }
  return 0
}

export function getImageProps() {
  const {order, channels, slices, stackSize} = volApi.getState()
  console.log("this.length getImageProps", order, channels, slices, stackSize)
  return {order, channels, slices, stackSize}
}

export function setStackSize(stackSize) {
  volApi.setState(prevState => ({
    ...prevState,
    stackSize: stackSize
  }))
  console.log("stacksize: ", stackSize)
}
