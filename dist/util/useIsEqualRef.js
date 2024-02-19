"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsFirestoreQueryEqual = exports.isQueryEqual = void 0;
const tslib_1 = require("tslib");
// ommited useComparatorRef
// https://github.com/CSFrequency/react-firebase-hooks/blob/master/util/refHooks.ts
const React = tslib_1.__importStar(require("react"));
const firestore_1 = require("firebase/firestore");
const refHooks_1 = require("./refHooks");
const { useEffect, useRef } = React;
const isEqual = (v1, v2) => {
    const bothNull = !v1 && !v2;
    const equal = !!v1 && !!v2 && v1.isEqual(v2);
    return bothNull || equal;
};
const useIsEqualRef = (value, onChange) => {
    const ref = useRef(value);
    useEffect(() => {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};
const isQueryEqual = (v1, v2) => {
    const bothNull = !v1 && !v2;
    const equal = !!v1 && !!v2 && (0, firestore_1.queryEqual)(v1, v2);
    return bothNull || equal;
};
exports.isQueryEqual = isQueryEqual;
const useIsFirestoreQueryEqual = (value, onChange) => {
    return (0, refHooks_1.useComparatorRef)(value, exports.isQueryEqual, onChange);
};
exports.useIsFirestoreQueryEqual = useIsFirestoreQueryEqual;
exports.default = useIsEqualRef;
