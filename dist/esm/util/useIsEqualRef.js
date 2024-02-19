// ommited useComparatorRef
// https://github.com/CSFrequency/react-firebase-hooks/blob/master/util/refHooks.ts
import * as React from "react";
import { queryEqual,
// refEqual,
 } from 'firebase/firestore';
import { useComparatorRef } from "./refHooks";
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
export const isQueryEqual = (v1, v2) => {
    const bothNull = !v1 && !v2;
    const equal = !!v1 && !!v2 && queryEqual(v1, v2);
    return bothNull || equal;
};
export const useIsFirestoreQueryEqual = (value, onChange) => {
    return useComparatorRef(value, isQueryEqual, onChange);
};
export default useIsEqualRef;
