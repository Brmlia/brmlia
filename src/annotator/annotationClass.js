import create from 'zustand';

import { getAnnotationClasses } from './index.js';

const initState = {
  classes: [
    {
      name: 'Annotation Class 1',
      enabled: false,
    },
  ],
  lastSel: 'class1',
};

function addClass(classLabel) {
  const default_class = 'class1';
  annotClassApi.setState(prevState => ({
    ...prevState,
    classes: [
      ...prevState.classes,
      {
        name: classLabel || default_class,
        enabled: false,
      },
    ],
  }));
}

export const [useAnnotClass, annotClassApi] = create(set => ({
  ...initState,
}));

export function updateClasses() {
  const classes = getAnnotationClasses();
  for (var i = 0; i < classes.length; i++) {
    const cls = classes[i];
    if (cls && !isDuplicateClass(cls)) {
      addClass(cls);
      enableClass(cls);
    }
  }
}

export function enableClass(label) {
  annotClassApi.setState(prevState => {
    const classes = prevState.classes.map((cls, j) => {
      if (cls.name === label) {
        var newCls = cls;
        newCls.enabled = true;
        return newCls;
      } else {
        return cls;
      }
    });
    return {
      classes,
    };
  });
}

export function toggleClassEnable(num) {
  annotClassApi.setState(prevState => {
    const classes = prevState.classes.map((cls, j) => {
      if (j === num) {
        var newCls = cls;
        newCls.enabled = !cls.enabled;
        return newCls;
      } else {
        return cls;
      }
    });
    return {
      classes,
    };
  });
  const cls = annotClassApi.getState().classes[num];
  if (cls.enabled) {
    annotClassApi.setState(prevState => ({
      ...prevState,
      lastSel: cls.name,
    }));
  }
}

export function isDuplicateClass(name) {
  const classes = annotClassApi.getState().classes;
  if (classes) {
    const x = classes.filter(cls => cls.name === name);
    if (x.length !== 0) {
      return true;
    }
  }
  return false;
}

export function getClasses() {
  return annotClassApi.getState().classes;
}

export function getDisabledClasses() {
  var enabledClasses = [];
  const classes = annotClassApi.getState().classes;
  if (classes) {
    for (var i = 0; i < classes.length; i++) {
      const cls = classes[i];
      if (!cls.enabled) {
        enabledClasses.push(cls.name);
      }
    }
  }
  return enabledClasses;
}

export function getLastSelectedClass() {
  return annotClassApi.getState().lastSel;
}
