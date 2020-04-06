import React from 'react';

import { fileApi } from '../fileuploader/fileStore.js';
import { uniApi } from '../imagecanvas/ImageStore.js';

export const fApi = fileApi;
export const uApi = uniApi;

export const withFileStore = (Component: any) => {
  return (props: any) => {
    return <Component api={fApi} {...props} />;
  };
};

export const withUniformStore = (Component: any) => {
  return (props: any) => {
    return <Component api={uApi} {...props} />;
  };
};

export const withStore = (Component: any) => {
  return (props: any) => {
    return <Component uApi={uApi} fApi={fApi} {...props} />;
  };
};
