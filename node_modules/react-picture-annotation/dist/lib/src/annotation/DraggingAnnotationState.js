import { DefaultAnnotationState } from "./DefaultAnnotationState";
export default class DraggingAnnotationState {
    constructor(context) {
        this.onMouseDown = () => undefined;
        this.onMouseMove = (positionX, positionY) => {
            const { shapes } = this.context;
            const currentShape = shapes[shapes.length - 1];
            currentShape.onDrag(positionX, positionY);
        };
        this.onMouseUp = () => {
            const { setAnnotationState } = this.context;
            setAnnotationState(new DefaultAnnotationState(this.context));
        };
        this.onMouseLeave = () => this.onMouseUp();
        this.context = context;
    }
}
//# sourceMappingURL=DraggingAnnotationState.js.map