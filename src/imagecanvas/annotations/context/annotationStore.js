import create from 'zustand';

const initState = {
  annotations:
  [
    {
      x: '0',
      y: '0',
      width: '0',
      height: '0',
      strokeStyle: 'rgb(70, 70, 150)',
      lineWidth: 1
    }
  ],
  ctx: null
}

const fabricRectState = {
  rects: []
}

export const [useAnnotStore, annotApi] = create ( set => ( {
  // ...initState
  ...fabricRectState
}))