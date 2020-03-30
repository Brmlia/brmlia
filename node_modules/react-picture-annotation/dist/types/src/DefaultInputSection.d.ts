/// <reference types="react" />
export interface IDefaultInputSection {
    value: string;
    onChange: (value: string) => void;
    onDelete: () => void;
}
declare const _default: ({ value, onChange, onDelete }: IDefaultInputSection) => JSX.Element;
export default _default;
