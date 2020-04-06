import create from 'zustand';
import { settingsApi } from '../mainSettings.js';

export const initState = () => {
  return settingsApi.getState().dev ? devState : prodState;
};

export const prodState = {
  file: [],
  size: 0,
  selected: 0,
};

export const devState = {
  file: [
    {
      name: 'brom.jpeg',
      image: require('./../ui/assets/images/brom.jpeg'),
      style: {
        display: 'block',
        width: 'auto',
        height: '100%',
      },
      type: 'image/png',
    },
  ],
  size: 1,
  selected: 0,
};

export const [useFileStore, fileApi] = create(set => ({
  ...initState(),
}));
