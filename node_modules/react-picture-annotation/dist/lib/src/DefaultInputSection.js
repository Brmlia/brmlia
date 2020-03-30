import React from "react";
import DeleteButton from "./DeleteButton";
export default ({ value, onChange, onDelete }) => {
    return (React.createElement("div", { className: "rp-default-input-section" },
        React.createElement("input", { className: "rp-default-input-section_input", placeholder: "INPUT TAG HERE", value: value, onChange: e => onChange(e.target.value) }),
        React.createElement("a", { className: "rp-default-input-section_delete", onClick: () => onDelete() },
            React.createElement(DeleteButton, null))));
};
//# sourceMappingURL=DefaultInputSection.js.map