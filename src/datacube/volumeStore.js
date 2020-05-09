import create from 'zustand';

// 0, 1, 2: axes
// 3: main
// 4, 5, 6: channels
// 7: test
// possible to share the same volumea cross views?
const initState = {

  volumes: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  sliceIndices: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ],
  lengths: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ],
  type: 1,
  order: 0,
  channels: 0,
  slices: 0,
  stackSize: 0,
}

export const [useVolumeStore, volApi] = create(set => ({
  ...initState,
}))
