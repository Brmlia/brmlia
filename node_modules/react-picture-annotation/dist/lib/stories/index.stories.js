import { withA11y } from "@storybook/addon-a11y";
import { addDecorator, storiesOf } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { ReactPictureAnnotation } from "../src";
addDecorator(storyFn => React.createElement("div", null, storyFn()));
storiesOf("Hello World", module)
    .addDecorator(withA11y)
    .add("with text", () => {
    const AnnotationComponent = () => {
        const [size, setSize] = useState({
            width: window.innerWidth - 16,
            height: window.innerHeight - 16
        });
        const [annotationData, setAnnotationData] = useState([
            {
                id: "a",
                comment: "HA HA HA",
                mark: {
                    type: "RECT",
                    width: 161,
                    height: 165,
                    x: 229,
                    y: 92
                }
            }
        ]);
        const [selectedId, setSelectedId] = useState("a");
        const onResize = () => {
            setSize({
                width: window.innerWidth - 16,
                height: window.innerHeight - 16
            });
        };
        useEffect(() => {
            window.addEventListener("resize", onResize);
            return () => {
                window.removeEventListener("resize", onResize);
            };
        }, []);
        return (React.createElement(ReactPictureAnnotation, { width: size.width, height: size.height, annotationData: annotationData, onChange: data => setAnnotationData(data), selectedId: selectedId, onSelect: e => setSelectedId(e), image: "https://bequank.oss-cn-beijing.aliyuncs.com/landpage/large/60682895_p0_master1200.jpg" }));
    };
    return React.createElement(AnnotationComponent, null);
});
//# sourceMappingURL=index.stories.js.map