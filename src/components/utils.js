import React from "react";

import { uniApi } from "../annotations/custom/ImageStore.js"

export const uApi = uniApi;

export const withUniformStore = (Component: any) => {
  return (props: any) => {
    return <Component api={uApi} {...props}/>;
  };
};




