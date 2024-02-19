import firestore from "firebase/firestore";
type ReducerState = {
    hasMore: boolean;
    value: firestore.QueryDocumentSnapshot[];
    after: firestore.QueryDocumentSnapshot | null;
    lastLoaded: firestore.QueryDocumentSnapshot | null;
    loadingMore: boolean;
    limit: number;
    loaded: boolean;
    error?: Error;
};
export type PaginationValue = ReducerState & {
    loadMore: () => void;
    reest: () => void;
    setError: (error: Error) => void;
    setValue: (limit: number) => (value: firestore.QuerySnapshot) => void;
};
export type PaginationHook<T> = [
    T[],
    {
        loaded: boolean;
        hasMore: boolean;
        loadingMore: boolean;
        loadMore: () => void;
    },
    Error | undefined
];
type LoadMoreAction = {
    type: "loadMore";
};
type ErrorAction = {
    type: "error";
    error: Error;
};
type ResetAction = {
    type: "reset";
};
type LoadedAction = {
    type: "loaded";
    value: firestore.QuerySnapshot;
    limit: number;
};
export type ActionType = LoadMoreAction | ErrorAction | ResetAction | LoadedAction;
declare const usePaginationValue: () => PaginationValue;
export default usePaginationValue;
