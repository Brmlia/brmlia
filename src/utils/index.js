import React from "react";

import { uniApi } from "../imagecanvas/ImageStore.js"
import { fileApi } from "../fileuploader/fileStore.js"

export const fApi = fileApi;
export const uApi = uniApi;

export const withUniformStore = (Component: any) => {
  return (props: any) => {
    return <Component api={uApi} {...props}/>;
  };
};




