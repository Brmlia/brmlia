import { useZoomApi } from "./zoomSettings.js";

export function updateZoom(value, idx, reset) {
  const currZoom = useZoomApi.getState().views[idx].zoomPct;

  if ((currZoom !== value) || reset ) {
    useZoomApi.setState( prevState => {
      const views = prevState.views.map((vw, j) => {
        if (j === parseInt(idx)) {
          var newView = vw;
          var newReset = 0;
          if(reset) {
            newReset = 1;
          }
          newView.zoomPct = value
          newView.reset = newReset
          return newView;
        }
        else {
          return vw
        }
      })
      return {
        views
      }
    })

    useZoomApi.setState( prevState => ({
      ...prevState,
      last: idx
    }))
  }
}

export function updateZppZoom(value, idx) {
  const currZoom = useZoomApi.getState().views[idx].zoomZppPct;

  if (currZoom !== value) {
    useZoomApi.setState( prevState => {
      const views = prevState.views.map((vw, j) => {
        if (j === parseInt(idx)) {
          var newView = vw;
          newView.zoomZppPct = value
          return newView;
        }
        else {
          return vw
        }
      })
      return {
        views
      }
    })
  }
}
