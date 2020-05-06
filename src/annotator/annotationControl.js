import {
  annotApi,
  undoApi,
  redoApi,
  drawRect,
  getCanvas,
  fabricApi,
} from './index.js';

export function createAnnotation(group, label, classLabel, rect, id) {
  const default_class = 'class1';
  return {
    id: id,
    group: group,
    label: label,
    class: classLabel || default_class,
    rect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      scaleX: group.scaleX,
      scaleY: group.scaleY,
    },
  };
}

export function createDummyAnnotation(id) {
  return { id: id };
}

export function addAnnotation(annotation) {
  annotApi.setState(prevState => ({
    ...prevState,
    annotations: [...prevState.annotations, annotation],
  }));
}

export function addAnnotationFromJson(json) {
  for (var i = 0; i < json.length; i++) {
    if (_isAnnotValid(json[i])) {
      const rect = drawRect(
        getCanvas(),
        json[i].rect,
        json[i].label,
        json[i].class
      );
      let nextId = fabricApi.getState().nextId;
      addDummyUndoAnnotation(createDummyAnnotation(nextId));
      addAnnotation(
        createAnnotation(
          rect,
          json[i].label,
          json[i].class,
          json[i].rect,
          nextId
        )
      );

      fabricApi.setState(prevState => ({
        ...prevState,
        nextId: nextId + 1,
      }));
    }
  }
  console.log(annotApi.getState().annotations);
}

export function addDummyUndoAnnotation(annotation) {
  addAnnotationToUndoState(annotation);
}

export function addAnnotationToUndoState(annotation) {
  undoApi.setState(prevState => ({
    ...prevState,
    undoAnnotations: [...prevState.undoAnnotations, annotation],
  }));
}

export function addAnnotationToRedoState(annotation) {
  redoApi.setState(prevState => ({
    ...prevState,
    redoAnnotations: [...prevState.redoAnnotations, annotation],
  }));
}

export function deleteAnnotation(index) {
  annotApi.setState(prevState => {
    return prevState.annotations.splice(index, 1);
  });
}

export function deleteUndoAnnotation(index) {
  undoApi.setState(prevState => {
    return prevState.undoAnnotations.splice(index, 1);
  });
}

export function deleteRedoAnnotation(index) {
  redoApi.setState(prevState => {
    return prevState.redoAnnotations.splice(index, 1);
  });
}

export function undoAnnotation(index) {
  const annotation = annotApi.getState().annotations[index];
  addAnnotationToRedoState(annotation);
  deleteAnnotation(index);

  const lastUndoAnno = getLastUndoAnnot();
  const lastUndoAnnoIdx = getLastUndoAnnotIdx();
  deleteUndoAnnotation(lastUndoAnnoIdx);
  addAnnotation(lastUndoAnno);
}

export function redoAnnotation(index) {
  const redoAnnotation = redoApi.getState().redoAnnotations[index];
  const annotations = annotApi.getState().annotations;
  for (let i = 0; i < annotations.length; i++) {
    if (annotations[i].id === redoAnnotation.id) {
      addAnnotationToUndoState(annotations[i]);
      deleteAnnotation(i);
    }
  }

  addAnnotation(redoAnnotation);
  deleteRedoAnnotation(index);
}

export function getLastAnnotIdx() {
  return annotApi.getState().annotations.length - 1;
}

export function getLastUndoAnnot() {
  return undoApi.getState().undoAnnotations[
    undoApi.getState().undoAnnotations.length - 1
  ];
}

export function getLastUndoAnnotIdx() {
  return undoApi.getState().undoAnnotations.length - 1;
}

export function getLastRedoAnnot() {
  return redoApi.getState().redoAnnotations[
    redoApi.getState().redoAnnotations.length - 1
  ];
}

export function getLastRedoAnnotIdx() {
  return redoApi.getState().redoAnnotations.length - 1;
}

export function updateAnnotationCoords(annotationGroup) {
  const annotations = annotApi.getState().annotations;
  for (let i = 0; i < annotations.length; i++) {
    if (annotationGroup === annotations[i].group) {
      addAnnotationToUndoState(annotations[i]);
      const rect = {
        width: annotationGroup.width,
        height: annotationGroup.height,
        top: annotationGroup.top,
        left: annotationGroup.left,
      };

      addAnnotation(
        createAnnotation(
          annotationGroup,
          annotationGroup._objects[1].text,
          annotationGroup._objects[2].text,
          rect,
          annotations[i].id
        )
      );

      deleteAnnotation(i);
    }
  }
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
      if (annot && (annot.class === oldLabel)) {
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

export function getAnnotationByLabel(label) {
  const annotations = annotApi.getState().annotations;
  for (var i = 0; i < annotations.length; i++) {
    if (annotations[i] && (annotations[i].label === label)) {
      return annotations[i]
    }
  }
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
