import create from 'zustand';

export const zoomState = {
  views: [
    {
      name: "main",
      zoomPct: "1",
      zoomZppPct: "1",
      reset: "0"
    },
    {
      name: "xy",
      zoomPct: "1",
      zoomZppPct: "1",
      reset: "0"
    },
    {
      name: "yz",
      zoomPct: "1",
      zoomZppPct: "1",
      reset: "0"
    },
    {
      name: "xz",
      zoomPct: "1",
      zoomZppPct: "1",
      reset: "0"
    },
  ],
  last: "0"
}

export const [ useZoomStore, useZoomApi ] = create ( set => ({
  ...zoomState
}))