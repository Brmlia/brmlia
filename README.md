## BRMLIA
### Tiff Support

#### Standard Views
- [x] Supports Single Page Tiff
- [x] Supports Multi Page Tiff
- [x] Supports X, Y, Z Views For Single Page Tiff
- [x] Supports X, Y, Z Views For Single Page and Multiple Tiff Files
- [x] Supports X, Y, Z Views For Multi Page Tiff
- [ ] Supports Colored Tiff
- [x] Sliders to Select Slices
- [x] Supports Large Number of Pages (256+)
- [x] Supports Case 1: (60 z planes, 3 channels, 1)
- [ ] Supports Case 2: (60 z planes, 1 channel, 3)
- [ ] Supports Case 3: (1 z planes, 3 channels, 60)
- [ ] Supports Case 4: (1 z planes, 1 channel, 180)

#### Thumbnails
- [x] Supports Tiffs in Thumbnails
- [x] Supports Single Tiny Tiff in Thumbnails
- [x] Supports Multiple Tiny Tiffs in Thumbnails

### Dependencies
#### DEVELOP BRANCH
##### UNUSED in Tiff_Support BRANCH
Unused dependencies
* jest-environment-jsdom-sixteen
* react-color
* react-zoom-pan-pinch
* reactcss
Unused devDependencies
* @testing-library/jest-dom
* @testing-library/react

##### USED in Tiff_Support BRANCH
* image-js: ./src/annotator/importer.js
* react-konva: ./src/ui/components/sampleTiff.js
