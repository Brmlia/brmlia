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
      left: rect.eft,
      left: rect.left,
      width: rect.width,
      height: rect.height,
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
      addAnnotation(
        createAnnotation(rect, json[i].label, json[i].class, json[i].rect)
      );
    }
  }
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

export function updateAnnotationCoords(annotation) {
  const annotations = annotApi.getState().annotations;
  for (let i = 0; i < annotations.length; i++) {
    let a = annotations[i];
    if (annotation === annotations[i].group) {
      addAnnotationToUndoState(annotations[i]);
      const rect = {
        width: annotation.width,
        height: annotation.height,
        top: annotation.top,
        left: annotation.left,
      };

      addAnnotation(
        createAnnotation(
          annotation,
          annotation._objects[1].text,
          annotation._objects[2].text,
          rect,
          annotations[i].id
        )
      );

      deleteAnnotation(i);
      // printStuff('updateCoords');
      console.log('anno: ');
      console.log(annotApi.getState().annotations);
      console.log('undo: ');
      console.log(undoApi.getState().undoAnnotations);
      console.log('redo: ');
      console.log(redoApi.getState().redoAnnotations);
    }
  }
}

export function printStuff(callingMethod) {
  console.log(callingMethod);
  let annotations = annotApi.getState().annotations;
  console.log('annotations: ');
  for (let i = 0; i < annotations.length; i++) {
    console.log('id ' + i + ': ' + annotations[i].id);
    if (annotations[i].group) {
      console.log('top ' + i + ': ' + annotations[i].rect.top);
      console.log('left ' + i + ': ' + annotations[i].rect.left);
    }
  }

  let cached = undoApi.getState().undoAnnotations;
  console.log('cached: ');
  for (let i = 0; i < cached.length; i++) {
    console.log('id ' + i + ': ' + cached[i].id);
    if (cached[i].group) {
      console.log('top ' + i + ': ' + cached[i].rect.top);
      console.log('left ' + i + ': ' + cached[i].rect.left);
    }
  }

  let redo = redoApi.getState().redoAnnotations;
  console.log('redo: ');
  for (let i = 0; i < redo.length; i++) {
    console.log('id ' + i + ': ' + redo[i].id);
    if (redo[i].group) {
      console.log('top ' + i + ': ' + redo[i].rect.top);
      console.log('left ' + i + ': ' + redo[i].rect.left);
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
