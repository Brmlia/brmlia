import { DefaultAnnotationState } from "./DefaultAnnotationState";
export default class CreatingAnnotationState {
    constructor(context) {
        this.onMouseDown = () => undefined;
        this.onMouseMove = (positionX, positionY) => {
            const { shapes } = this.context;
            if (shapes.length > 0) {
                const currentShape = shapes[shapes.length - 1];
                const { mark: { x, y } } = currentShape.getAnnotationData();
                currentShape.adjustMark({
                    width: positionX - x,
                    height: positionY - y
                });
            }
        };
        this.onMouseUp = () => {
            const { shapes, onShapeChange, setAnnotationState } = this.context;
            const data = shapes.pop();
            if (data &&
                data.getAnnotationData().mark.width !== 0 &&
                data.getAnnotationData().mark.height !== 0) {
                shapes.push(data);
            }
            else {
                this.context.selectedId = null;
                onShapeChange();
            }
            setAnnotationState(new DefaultAnnotationState(this.context));
        };
        this.onMouseLeave = () => this.onMouseUp();
        this.context = context;
    }
}
//# sourceMappingURL=CreatingAnnotationState.js.map