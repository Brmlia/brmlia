import { DefaultAnnotationState } from "./DefaultAnnotationState";
export default class TransformationState {
    constructor(context) {
        this.onMouseDown = () => undefined;
        this.onMouseMove = (positionX, positionY) => {
            const { currentTransformer } = this.context;
            if (currentTransformer) {
                currentTransformer.onTransformation(positionX, positionY);
            }
        };
        this.onMouseUp = () => {
            const { setAnnotationState } = this.context;
            setAnnotationState(new DefaultAnnotationState(this.context));
        };
        this.onMouseLeave = () => this.onMouseUp();
        this.context = context;
    }
}
//# sourceMappingURL=TransfromationState.js.map