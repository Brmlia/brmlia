import create from 'zustand';

const initState = {
  annotations: [],
};

const redoState = {
  redoAnnotations: [],
};

const undoState = {
  undoAnnotations: [],
};

export const [useAnnotStore, annotApi] = create(set => ({
  ...initState,
}));

export const [useRedoStore, redoApi] = create(set => ({
  ...redoState,
}));

export const [useCacheStore, undoApi] = create(set => ({
  ...undoState,
}));
