import create from 'zustand';
import React from 'react';
import Viewer from './viewer/index.js';
import { mainImg } from './style.js';

export const initState = {
  channels: [
    {
      selected: false,
    },
    {
      selected: false,
    },
    {
      selected: false,
    },
  ],
  lastSelected: 1,
  dev: 0,
};

export const [useMainSettings, settingsApi] = create(set => ({
  ...initState,
}));

export function updateChannelSel(channel) {
  settingsApi.setState(prevState => {
    const channels = prevState.channels.map((ch, j) => {
      if (j === channel - 1) {
        var newChannel = ch;
        newChannel.selected = !prevState.channels[j].selected;
        return newChannel;
      } else {
        return ch;
      }
    });
    return {
      channels,
    };
  });
}

export function updateLastSel(channel) {
  settingsApi.setState(prevState => ({
    ...prevState,
    lastSelected: channel,
  }));
}
