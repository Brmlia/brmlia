import React, { Component } from "react";

import { useFileStore, fileApi } from "../fileuploader/fileStore.js"
import { useUniformStore, uniApi } from "../imagecanvas/imageStore.js"

export const fApi = fileApi;
export const uApi = uniApi;

export const withFileStore = (Component: any) => {
  return (props: any) => {
    return <Component api={fApi} {...props}/>;
  };
};

export const withUniformStore = (Component: any) => {
  return (props: any) => {
    return <Component api={uApi} {...props}/>;
  };
};




