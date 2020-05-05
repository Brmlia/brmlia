import create from 'zustand';

export const sideBarState = {
  axisSideBarOpen: false,
  channelSideBarOpen: false,
  mainSideBarOpen: false,
};

export const [useSideBarStore, sideBarApi] = create(set => ({
  ...sideBarState,
}));
