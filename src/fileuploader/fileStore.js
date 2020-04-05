import create from 'zustand';

export const initState = {
  file:
    [
      {
        name: "brom.jpeg",
        image: require('./../ui/assets/images/brom.jpeg'),
        style: {
          display: 'block',
          width: 'auto',
          height: '100%'
        },
        type: "image/png"
      }
    ],
  size: 1,
  selected: 0
}

export const [useFileStore, fileApi] = create ( set => ({
  ...initState,
}))