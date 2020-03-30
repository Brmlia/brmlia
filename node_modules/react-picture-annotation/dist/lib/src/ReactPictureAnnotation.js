import React from "react";
import { DefaultAnnotationState } from "./annotation/DefaultAnnotationState";
import DefaultInputSection from "./DefaultInputSection";
// import DeleteButton from "./DeleteButton";
import { RectShape, shapeStyle } from "./Shape";
import Transformer from "./Transformer";
const defaultState = {
    scale: 1,
    originX: 0,
    originY: 0
};
export default class ReactPictureAnnotation extends React.Component {
    constructor() {
        super(...arguments);
        this.shapes = [];
        this.state = {
            inputPosition: {
                left: 0,
                top: 0
            },
            showInput: false,
            inputComment: ""
        };
        this.currentAnnotationData = [];
        this.canvasRef = React.createRef();
        this.imageCanvasRef = React.createRef();
        this.currentAnnotationState = new DefaultAnnotationState(this);
        this.scaleState = defaultState;
        this.componentDidMount = () => {
            const currentCanvas = this.canvasRef.current;
            const currentImageCanvas = this.imageCanvasRef.current;
            if (currentCanvas && currentImageCanvas) {
                this.setCanvasDPI();
                this.canvas2D = currentCanvas.getContext("2d");
                this.imageCanvas2D = currentImageCanvas.getContext("2d");
                this.onImageChange();
            }
            this.syncAnnotationData();
            this.syncSelectedId();
        };
        this.componentDidUpdate = (preProps) => {
            const { width, height, image } = this.props;
            if (preProps.width !== width || preProps.height !== height) {
                this.setCanvasDPI();
                this.onShapeChange();
                this.onImageChange();
            }
            if (preProps.image !== image) {
                this.cleanImage();
                if (this.currentImageElement) {
                    this.currentImageElement.src = image;
                }
                else {
                    this.onImageChange();
                }
            }
            this.syncAnnotationData();
            this.syncSelectedId();
        };
        this.calculateMousePosition = (positionX, positionY) => {
            const { originX, originY, scale } = this.scaleState;
            return {
                positionX: (positionX - originX) / scale,
                positionY: (positionY - originY) / scale
            };
        };
        this.calculateShapePosition = (shapeData) => {
            const { originX, originY, scale } = this.scaleState;
            const { x, y, width, height } = shapeData;
            return {
                x: x * scale + originX,
                y: y * scale + originY,
                width: width * scale,
                height: height * scale
            };
        };
        this.setAnnotationState = (annotationState) => {
            this.currentAnnotationState = annotationState;
        };
        this.onShapeChange = () => {
            if (this.canvas2D && this.canvasRef.current) {
                this.canvas2D.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
                let hasSelectedItem = false;
                for (const item of this.shapes) {
                    const isSelected = item.getAnnotationData().id === this.selectedId;
                    const { x, y, height } = item.paint(this.canvas2D, this.calculateShapePosition, isSelected);
                    if (isSelected) {
                        if (!this.currentTransformer) {
                            this.currentTransformer = new Transformer(item);
                        }
                        hasSelectedItem = true;
                        this.currentTransformer.paint(this.canvas2D, this.calculateShapePosition);
                        this.setState({
                            showInput: true,
                            inputPosition: {
                                left: x,
                                top: y + height + shapeStyle.margin
                            },
                            inputComment: item.getAnnotationData().comment || ""
                        });
                    }
                }
                if (!hasSelectedItem) {
                    this.setState({
                        showInput: false,
                        inputComment: ""
                    });
                }
            }
            this.currentAnnotationData = this.shapes.map(item => item.getAnnotationData());
            const { onChange } = this.props;
            onChange(this.currentAnnotationData);
        };
        this.syncAnnotationData = () => {
            const { annotationData } = this.props;
            if (annotationData) {
                const refreshShapesWithAnnotationData = () => {
                    this.selectedId = null;
                    const nextShapes = annotationData.map(eachAnnotationData => new RectShape(eachAnnotationData, this.onShapeChange));
                    this.shapes = nextShapes;
                    this.onShapeChange();
                };
                if (annotationData.length !== this.shapes.length) {
                    refreshShapesWithAnnotationData();
                }
                else {
                    for (const annotationDataItem of annotationData) {
                        const targetShape = this.shapes.find(item => item.getAnnotationData().id === annotationDataItem.id);
                        if (targetShape && targetShape.equal(annotationDataItem)) {
                            continue;
                        }
                        else {
                            refreshShapesWithAnnotationData();
                            break;
                        }
                    }
                }
            }
        };
        this.syncSelectedId = () => {
            const { selectedId } = this.props;
            if (selectedId && selectedId !== this.selectedId) {
                this.selectedId = selectedId;
                this.onShapeChange();
            }
        };
        this.onDelete = () => {
            const deleteTarget = this.shapes.findIndex(shape => shape.getAnnotationData().id === this.selectedId);
            if (deleteTarget >= 0) {
                this.shapes.splice(deleteTarget, 1);
                this.onShapeChange();
            }
        };
        this.setCanvasDPI = () => {
            const currentCanvas = this.canvasRef.current;
            const currentImageCanvas = this.imageCanvasRef.current;
            if (currentCanvas && currentImageCanvas) {
                const currentCanvas2D = currentCanvas.getContext("2d");
                const currentImageCanvas2D = currentImageCanvas.getContext("2d");
                if (currentCanvas2D && currentImageCanvas2D) {
                    currentCanvas2D.scale(2, 2);
                    currentImageCanvas2D.scale(2, 2);
                }
            }
        };
        this.onInputCommentChange = (comment) => {
            const selectedShapeIndex = this.shapes.findIndex(item => item.getAnnotationData().id === this.selectedId);
            this.shapes[selectedShapeIndex].setComment(comment);
            this.setState({ inputComment: comment });
        };
        this.cleanImage = () => {
            if (this.imageCanvas2D && this.imageCanvasRef.current) {
                this.imageCanvas2D.clearRect(0, 0, this.imageCanvasRef.current.width, this.imageCanvasRef.current.height);
            }
        };
        this.onImageChange = () => {
            this.cleanImage();
            if (this.imageCanvas2D && this.imageCanvasRef.current) {
                if (this.currentImageElement) {
                    const { originX, originY, scale } = this.scaleState;
                    this.imageCanvas2D.drawImage(this.currentImageElement, originX, originY, this.currentImageElement.width * scale, this.currentImageElement.height * scale);
                }
                else {
                    const nextImageNode = document.createElement("img");
                    nextImageNode.addEventListener("load", () => {
                        this.currentImageElement = nextImageNode;
                        const { width, height } = nextImageNode;
                        const imageNodeRatio = height / width;
                        const { width: canvasWidth, height: canvasHeight } = this.props;
                        const canvasNodeRatio = canvasHeight / canvasWidth;
                        if (!isNaN(imageNodeRatio) && !isNaN(canvasNodeRatio)) {
                            if (imageNodeRatio < canvasNodeRatio) {
                                const scale = canvasWidth / width;
                                this.scaleState = {
                                    originX: 0,
                                    originY: (canvasHeight - scale * height) / 2,
                                    scale
                                };
                            }
                            else {
                                const scale = canvasHeight / height;
                                this.scaleState = {
                                    originX: (canvasWidth - scale * width) / 2,
                                    originY: 0,
                                    scale
                                };
                            }
                        }
                        this.onImageChange();
                        this.onShapeChange();
                    });
                    nextImageNode.alt = "";
                    nextImageNode.src = this.props.image;
                }
            }
        };
        this.onMouseDown = event => {
            const { offsetX, offsetY } = event.nativeEvent;
            const { positionX, positionY } = this.calculateMousePosition(offsetX, offsetY);
            this.currentAnnotationState.onMouseDown(positionX, positionY);
        };
        this.onMouseMove = event => {
            const { offsetX, offsetY } = event.nativeEvent;
            const { positionX, positionY } = this.calculateMousePosition(offsetX, offsetY);
            this.currentAnnotationState.onMouseMove(positionX, positionY);
        };
        this.onMouseUp = () => {
            this.currentAnnotationState.onMouseUp();
        };
        this.onMouseLeave = () => {
            this.currentAnnotationState.onMouseLeave();
        };
        this.onWheel = (event) => {
            // https://stackoverflow.com/a/31133823/9071503
            const { clientHeight, scrollTop, scrollHeight } = event.currentTarget;
            if (clientHeight + scrollTop + event.deltaY > scrollHeight) {
                // event.preventDefault();
                event.currentTarget.scrollTop = scrollHeight;
            }
            else if (scrollTop + event.deltaY < 0) {
                // event.preventDefault();
                event.currentTarget.scrollTop = 0;
            }
            const { scale: preScale } = this.scaleState;
            this.scaleState.scale += event.deltaY * 0.005;
            if (this.scaleState.scale > 10) {
                this.scaleState.scale = 10;
            }
            if (this.scaleState.scale < 0.1) {
                this.scaleState.scale = 0.1;
            }
            const { originX, originY, scale } = this.scaleState;
            const { offsetX, offsetY } = event.nativeEvent;
            this.scaleState.originX =
                offsetX - ((offsetX - originX) / preScale) * scale;
            this.scaleState.originY =
                offsetY - ((offsetY - originY) / preScale) * scale;
            this.setState({ imageScale: this.scaleState });
            requestAnimationFrame(() => {
                this.onShapeChange();
                this.onImageChange();
            });
        };
    }
    set selectedId(value) {
        const { onSelect } = this.props;
        this.selectedIdTrueValue = value;
        onSelect(value);
    }
    get selectedId() {
        return this.selectedIdTrueValue;
    }
    render() {
        const { width, height, inputElement } = this.props;
        const { showInput, inputPosition, inputComment } = this.state;
        return (React.createElement("div", { className: "rp-stage" },
            React.createElement("canvas", { style: { width, height }, className: "rp-image", ref: this.imageCanvasRef, width: width * 2, height: height * 2 }),
            React.createElement("canvas", { className: "rp-shapes", style: { width, height }, ref: this.canvasRef, width: width * 2, height: height * 2, onMouseDown: this.onMouseDown, onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp, onMouseLeave: this.onMouseLeave, onWheel: this.onWheel }),
            showInput && (React.createElement("div", { className: "rp-selected-input", style: inputPosition }, inputElement(inputComment, this.onInputCommentChange, this.onDelete)))));
    }
}
ReactPictureAnnotation.defaultProps = {
    inputElement: (value, onChange, onDelete) => (React.createElement(DefaultInputSection, { value: value, onChange: onChange, onDelete: onDelete }))
};
//# sourceMappingURL=ReactPictureAnnotation.js.map