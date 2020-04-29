import create from 'zustand';

// 0, 1, 2: axes
// 3: main
// 4, 5, 6: channels
// 7: test
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
  ]
}

export const [useVolumeStore, volApi] = create(set => ({
  ...initState,
}))
