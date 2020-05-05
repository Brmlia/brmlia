import React from 'react';
import create from 'zustand';
import AxesViewer from './../axesViewer.js';
import ChannelViewer from './../channelViewer.js';

export const sideBarState = {
  sidebar: [
    <AxesViewer />,
    <ChannelViewer />
  ],
  axisSideBarOpen: false,
  channelSideBarOpen: false,
};

export const [useSideBarStore, sideBarApi] = create(set => ({
  ...sideBarState,
}));

