function determineType(fileLength, pageLength, channelLength) {
  var tType = 0

  if      ( (fileLength === 1) && (channelLength === 3) && (pageLength >   1) ) tType = 1
  else if ( (fileLength === 3) && (channelLength === 1) && (pageLength >   1) ) tType = 2
  else if ( (fileLength >   1)                          && (pageLength === 3) ) tType = 3
  else if ( (fileLength >   1)                          && (pageLength === 1) ) tType = 4

  console.log("determineType() - type, file, page, channel lengths: ", tType, fileLength, pageLength, channelLength)
  return tType
}

export function parseMetadata(file, metadata) {
  const {
    // images,
    channels,
    // slices,
  } = metadata

  const fileLength = file.length
  const pageLength = file[0].pages.length
  const channelLength = parseInt(channels || 1)
  // Case 1: (60 z planes, 3 channels, 1)
  //   images = 180
  //   channels = 3
  //   slices = 60
  //   hyperstack = true
  //   pages = 180
  // Case 2: (60 z planes, 1 channel, 3)
  //   images = 60
  //   channels = n/a
  //   slices = 60
  //   hyperstack = n/a
  //   pages = 60
  // Case 3: (1 z planes, 3 channels, 60)
  //   images = 3
  //   channels = n/a
  //   slices = 3
  //   hyperstack = n/a
  //   pages = 3
  // Case 4: (1 z planes, 1 channel, 180)
  //   pages = 1
  //   n/a

  return determineType(fileLength, pageLength, channelLength)
}

export function filesNeedUpdate(state, length) {
  return (
    state
    && (state.file.length > 0)
    && (state.file.length !== length)
    && (state.total === state.size)
  )
}

export function areFilesValid(files, idx, length) {
  return (
    (files.length > 0) &&
    (files[idx]) &&
    (files[idx].pages) &&
    (files[idx].pages.length > 0) &&
    (files.length !== length)
  )
}
