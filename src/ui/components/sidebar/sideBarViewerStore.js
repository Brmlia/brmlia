import React from 'react';
import create from 'zustand';
import AxesViewer from './../axesViewer.js';
import ChannelViewer from './../channelViewer.js';
import MainViewer from './../mainViewer.js';

export const sideBarViewerState = {
  sidebar: [
    <AxesViewer />,
    <ChannelViewer />,
    <MainViewer />,
  ],
};

export const [useSideBarViewerStore, sideBarViewerApi] = create(set => ({
  ...sideBarViewerState,
}));
