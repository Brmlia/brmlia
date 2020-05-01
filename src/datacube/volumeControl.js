import {volApi} from './volumeStore.js'

export function getVolume(index) {
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


