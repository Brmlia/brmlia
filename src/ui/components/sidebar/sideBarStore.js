import React from 'react';
import create from 'zustand';
import AxisSideBar from './axisSideBar.js';
import AxesViewer from './../axesViewer.js';

export const sideBarState = {
  sidebar: [
    <AxesViewer />,
  ],
  axisSideBarOpen: false,
};

export const [useSideBarStore, sideBarApi] = create(set => ({
  ...sideBarState,
}));

