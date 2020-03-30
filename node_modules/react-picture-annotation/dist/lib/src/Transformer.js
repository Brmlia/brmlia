const NODE_WIDTH = 10;
export default class Transformer {
    constructor(shape) {
        this.checkBoundary = (positionX, positionY) => {
            const currentCenterIndex = this.getCenterIndexByCursor(positionX, positionY);
            return currentCenterIndex >= 0;
        };
        this.startTransformation = (positionX, positionY) => {
            const currentCenterIndex = this.getCenterIndexByCursor(positionX, positionY);
            this.currentNodeCenterIndex = currentCenterIndex;
        };
        this.onTransformation = (positionX, positionY) => {
            const currentCentersTable = this.getAllCentersTable();
            currentCentersTable[this.currentNodeCenterIndex].adjust(positionX, positionY);
        };
        this.paint = (canvas2D, calculateTruePosition) => {
            const allCentersTable = this.getAllCentersTable();
            canvas2D.save();
            canvas2D.fillStyle = "#5c7cfa";
            for (const item of allCentersTable) {
                const { x, y, width, height } = calculateTruePosition({
                    x: item.x - NODE_WIDTH / 2,
                    y: item.y - NODE_WIDTH / 2,
                    width: NODE_WIDTH,
                    height: NODE_WIDTH
                });
                canvas2D.fillRect(x, y, width, height);
            }
            canvas2D.restore();
        };
        this.getCenterIndexByCursor = (positionX, positionY) => {
            const allCentersTable = this.getAllCentersTable();
            return allCentersTable.findIndex(item => this.checkEachRectBoundary(item.x, item.y, positionX, positionY));
        };
        this.checkEachRectBoundary = (rectCenterX, rectCenterY, positionX, positionY) => {
            if (Math.abs(positionX - rectCenterX) <= NODE_WIDTH / 2 &&
                Math.abs(positionY - rectCenterY) <= NODE_WIDTH / 2) {
                return true;
            }
            return false;
        };
        this.getAllCentersTable = () => {
            const { shape } = this;
            const { x, y, width, height } = shape.getAnnotationData().mark;
            return [
                {
                    x,
                    y,
                    adjust: (positionX, positionY) => {
                        shape.adjustMark({
                            x: positionX,
                            y: positionY,
                            width: width + x - positionX,
                            height: height + y - positionY
                        });
                    }
                },
                {
                    x: x + width / 2,
                    y,
                    adjust: (_, positionY) => {
                        shape.adjustMark({
                            y: positionY,
                            height: height + y - positionY
                        });
                    }
                },
                {
                    x: x + width,
                    y,
                    adjust: (positionX, positionY) => {
                        shape.adjustMark({
                            x,
                            y: positionY,
                            width: positionX - x,
                            height: y + height - positionY
                        });
                    }
                },
                {
                    x,
                    y: y + height / 2,
                    adjust: (positionX) => {
                        shape.adjustMark({
                            x: positionX,
                            width: width + x - positionX
                        });
                    }
                },
                {
                    x: x + width,
                    y: y + height / 2,
                    adjust: (positionX) => {
                        shape.adjustMark({ width: positionX - x });
                    }
                },
                {
                    x,
                    y: y + height,
                    adjust: (positionX, positionY) => {
                        shape.adjustMark({
                            x: positionX,
                            width: width + x - positionX,
                            height: positionY - y
                        });
                    }
                },
                {
                    x: x + width / 2,
                    y: y + height,
                    adjust: (_, positionY) => {
                        shape.adjustMark({
                            height: positionY - y
                        });
                    }
                },
                {
                    x: x + width,
                    y: y + height,
                    adjust: (positionX, positionY) => {
                        shape.adjustMark({
                            width: positionX - x,
                            height: positionY - y
                        });
                    }
                }
            ];
        };
        this.shape = shape;
    }
}
//# sourceMappingURL=Transformer.js.map