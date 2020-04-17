import { annotApi, cachedAnnotApi } from './annotationStore.js';

export function addAnnotation(group, label, classLabel) {
  const default_class = 'class1';
  annotApi.setState(prevState => ({
    ...prevState,
    annotations: [
      ...prevState.annotations,
      {
        group: group,
        label: label,
        class: classLabel || default_class,
      },
    ],
  }));
}

export function addCachedAnnotation(group, label, classLabel) {
  cachedAnnotApi.setState(prevState => ({
    ...prevState,
    cachedAnnots: [
      ...prevState.cachedAnnots,
      {
        group: group,
        label: label,
        class: classLabel,
      },
    ],
  }));
}

export function deleteAnnotation(index) {
  annotApi.setState(prevState => {
    return prevState.annotations.splice(index, 1);
  });
}

export function deleteCachedAnnotation(index) {
  cachedAnnotApi.setState(prevState => {
    return prevState.cachedAnnots.splice(index, 1);
  });
}

export function undoAnnotation() {
  const index = annotApi.getState().annotations.length - 1;
  const annotation = annotApi.getState().annotations[index];
  deleteAnnotation(index);
  addCachedAnnotation(annotation.group, annotation.label, annotation.class);
}

export function getLastAnnotIdx() {
  return annotApi.getState().annotations.length - 1;
}

export function getLastCachedAnnot() {
  return cachedAnnotApi.getState().cachedAnnots[
    cachedAnnotApi.getState().cachedAnnots.length - 1
  ];
}

export function getLastCachedAnnotIdx() {
  return cachedAnnotApi.getState().cachedAnnots.length - 1;
}

export function updateAnnotationLabel(oldLabel, label) {
  annotApi.setState(prevState => {
    const annotations = prevState.annotations.map((annot, j) => {
      if (annot.label === oldLabel) {
        var newAnnot = annot;
        newAnnot.label = label;
        return newAnnot;
      } else {
        return annot;
      }
    });
    return {
      annotations,
    };
  });
}

export function updateAnnotClassLabel(oldLabel, label) {
  annotApi.setState(prevState => {
    const annotations = prevState.annotations.map((annot, j) => {
      if (annot.class === oldLabel) {
        var newAnnot = annot;
        newAnnot.class = label;
        return newAnnot;
      } else {
        return annot;
      }
    });
    return {
      annotations,
    };
  });
}

export function getAnnotationClasses() {
  var classes = [];
  const annotations = annotApi.getState().annotations;
  for (var i = 0; i < annotations.length; i++) {
    classes.push(annotations[i].class);
  }
  return classes;
}
