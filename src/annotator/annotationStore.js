import create from 'zustand';

const initState = {
  annotations: [],
};

const cachedState = {
  cachedAnnots: [],
};

export const [useAnnotStore, annotApi] = create(set => ({
  ...initState,
}));

export const [useCacheStore, cachedAnnotApi] = create(set => ({
  ...cachedState,
}));
