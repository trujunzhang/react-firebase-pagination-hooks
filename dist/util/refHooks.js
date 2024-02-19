"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsEqualRef = exports.useComparatorRef = void 0;
const react_1 = require("react");
const useComparatorRef = (value, isEqual, onChange) => {
    const ref = (0, react_1.useRef)(value);
    (0, react_1.useEffect)(() => {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};
exports.useComparatorRef = useComparatorRef;
const isEqual = (v1, v2) => {
    const bothNull = !v1 && !v2;
    const equal = !!v1 && !!v2 && v1.isEqual(v2);
    return bothNull || equal;
};
const useIsEqualRef = (value, onChange) => {
    return (0, exports.useComparatorRef)(value, isEqual, onChange);
};
exports.useIsEqualRef = useIsEqualRef;
