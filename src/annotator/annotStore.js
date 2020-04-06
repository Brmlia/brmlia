import create from 'zustand';
import { settingsApi } from '../mainSettings.js';

export const initState = () => {
  return settingsApi.getState().dev ? devState : prodState;
};
export const prodState = {
  img_name: '',
  annotations: [],
};

export const devState = {};

export const [useAnnotStore, annotApi] = create(set => ({
  ...initState(),
}));
