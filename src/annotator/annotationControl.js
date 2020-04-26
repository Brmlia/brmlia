import { annotApi, cachedAnnotApi, drawRect, getCanvas } from './index.js';

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
        top: group.top,
        left: group.left,
        width: group.width,
        height: group.height,
      },
    ],
  }));
}

function _isAnnotValid(annotation) {
  return (
    annotation &&
    annotation.rect.left > 0 &&
    annotation.rect.left < 1000 &&
    annotation.rect.top > 0 &&
    annotation.rect.top < 1000 &&
    annotation.rect.width > 0 &&
    annotation.rect.width < 1000 &&
    annotation.rect.height > 0 &&
    annotation.rect.height < 1000 &&
    annotation.label.length > 0
  );
}

export function addAnnotationFromJson(json) {
  for (var i = 0; i < json.length; i++) {
    if (_isAnnotValid(json[i])) {
      const rect = drawRect(getCanvas(), json[i].rect, json[i].label);
      addAnnotation(rect, json[i].label, json[i].class);
    }
  }
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
        top: group.top,
        left: group.left,
        width: group.width,
        height: group.height,
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

export function updateAnnotation(
  group,
  label,
  classLabel,
  top,
  left,
  width,
  height
) {
  const default_class = 'class1';

  annotApi.setState(prevState => ({
    ...prevState,
    annotations: [
      ...prevState.annotations,
      {
        group: group,
        label: label,
        class: classLabel || default_class,
        top: top,
        left: left,
        width: width,
        height: height,
      },
    ],
  }));
}

export function undoAnnotation() {
  const index = annotApi.getState().annotations.length - 1;
  const annotation = annotApi.getState().annotations[index];
  deleteAnnotation(index);
  addCachedAnnotation(annotation.group, annotation.label, annotation.class);
}

export function redoAnnotation(index) {
  const annotation = cachedAnnotApi.getState().cachedAnnots[index];
  deleteCachedAnnotation(index);
  addAnnotation(annotation.group, annotation.label, annotation.class);
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
