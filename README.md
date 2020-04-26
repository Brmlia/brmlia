[![CircleCI](https://circleci.com/gh/Brmlia/brmlia.svg?style=svg)](https://circleci.com/gh/Brmlia/brmlia)

- [![Build Status](https://travis-ci.org/Brmlia/brmlia.svg?branch=master)](https://travis-ci.org/Brmlia/brmlia)
- [![codecov](https://codecov.io/gh/Brmlia/brmlia/branch/master/graph/badge.svg)](https://codecov.io/gh/Brmlia/brmlia)

### CI Builds

For circleCI build-deploy process (only run on commits/PRs to master), all warnings are treated as errors (unless
the environment variable `CI=FALSE` is set, or other work-around), so expect
that to fail for any build that has eslint warnings. To disable a warning
explicitly, add a commented eslint directive above the location.

# BRMLIA

## DEVELOP BRANCH

### MENUS

#### File

- [x] Import Annotations
- [x] Import Images

#### Draw

- [x] Draw Rectangular Annotations
- [x] Draw Freehand Annotations

#### Edit

- [x] Undo Add Annotation
- [x] Undo Remove Annotation
- [x] Redo Add Annotation
- [x] Redo Remove Annotation
- [ ] Undo Resized Annotation
- [ ] Redo Resized Annotation
- [ ] Undo Moved Annotation
- [ ] Redo Moved Annotation

### AXES

- [x] Basic View
- [x] Slice sliders

### ANNOTATIONS

- [x] Add Class
- [x] Edit Class
- [x] Filter by Class
- [x] Edit Label
- [x] Auto-load upon import
- [ ] Undo/Redo changes
- [ ] Toggle Label On/Off
- [ ] Resize box without affecting label
- [ ] Define individual annotations in freehand mode
- [ ] Add toolbar
- [ ] Set Default Class: Last Selected Class
- [ ] Replace freehand with Oval
- [ ] UI Adjustments

### CHANNELS

- [x] PNG Support
- [x] Select Channel
- [x] Brightness
- [x] Contrast
- [x] Whitepoint
- [x] Blackpoint
- [x] LUT
- [x] Opacity
- [ ] Annotation Layers by Channels
- [ ] Toggle Annotations by Channels
- [ ] Histogram
- [ ] Color Adjustment
- [ ] UI Adjustments
- [ ] Tiff Support

### Main View

- [x] PNG Support
- [x] Overlayed Channels
- [x] Tiff Support
- [ ] Pan
- [ ] Zoom

### Thumbnails

- [x] Tiff & PNG Support
- [x] Select PNG
- [ ] Select Tiff (Update Main, Axes, Channel Views)

### Tiffs

- [x] Case 1: (60 z planes, 3 channels, 1)
- [ ] Case 2: (60 z planes, 1 channel, 3)
- [ ] Case 3: (1 z plane, 3 channels, 60)
- [ ] Case 4: (1 z plane, 1 channel, 180)

### TESTS

#### Load

- [ ] Test Load of Menus
- [ ] Test Load of Axes
- [ ] Test Load of Channels
- [ ] Test Load of Annotations
- [ ] Test Load of Main View
- [ ] Test Load of Thumbnails

#### Interaction

##### Uploads

- [ ] Test Correct View of Main, Channels, and Axes

##### Drawing

- [ ] Test Rectangular Drawing
- [ ] Test Freehand Drawing
- [ ] Test Undo/Redo

##### Axes

- [ ] Test Sliders

##### Channels

- [ ] Test Sliders (Brightness, Contrast, Whitepoint, Blackpoint, Opacity)
- [ ] Test LUT

##### Thumbnails

- [ ] Test PNG image selection (Verify Correct View of Main, Channels, and Axes)

##### Export

- [ ] Test Correctness of Exported Annotations
