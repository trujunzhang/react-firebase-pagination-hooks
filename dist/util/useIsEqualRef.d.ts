import { Query } from 'firebase/firestore';
type RefHook<T> = {
    current: T;
};
interface HasIsEqual<T> {
    isEqual: (value: T) => boolean;
}
declare const useIsEqualRef: <T extends HasIsEqual<T>>(value: T | null | undefined, onChange?: () => void) => RefHook<T | null | undefined>;
export declare const isQueryEqual: <T extends Query<any, import("@firebase/firestore").DocumentData>>(v1: T | null | undefined, v2: T | null | undefined) => boolean;
export declare const useIsFirestoreQueryEqual: <T extends Query<any, import("@firebase/firestore").DocumentData>>(value: T | null | undefined, onChange?: () => void) => RefHook<T | null | undefined>;
export default useIsEqualRef;
