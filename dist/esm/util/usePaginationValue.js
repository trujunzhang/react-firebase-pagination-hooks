import * as React from "react";
import { addItem, deleteItem, updateItem } from "./operation";
const { useReducer } = React;
const initialState = {
    hasMore: false,
    after: null,
    limit: 0,
    value: [],
    lastLoaded: null,
    loaded: false,
    loadingMore: false,
};
function reducer(state, action) {
    switch (action.type) {
        case "loaded": {
            const value = [...state.value];
            let isAdding = false;
            action.value.docChanges().forEach((change) => {
                if (change.type === "added") {
                    isAdding = true;
                    addItem(change.doc, value);
                }
                else if (change.type === "modified") {
                    updateItem(change.doc, value);
                }
                else if (change.type === "removed") {
                    deleteItem(change.doc, value);
                }
            });
            const nextLimit = value.length + action.limit;
            const end = value.length < action.limit || nextLimit === state.limit;
            return Object.assign(Object.assign({}, state), { hasMore: isAdding ? !end : state.hasMore, limit: nextLimit, loaded: true, lastLoaded: action.value.docs[action.value.docs.length - 1], loadingMore: false, value });
        }
        case "error":
            return Object.assign(Object.assign({}, state), { error: action.error, value: [] });
        case "reset": {
            return Object.assign({}, initialState);
        }
        case "loadMore": {
            return Object.assign(Object.assign({}, state), { loadingMore: true, after: state.lastLoaded });
        }
    }
}
const usePaginationValue = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const loadMore = () => {
        dispatch({ type: "loadMore" });
    };
    const setValue = (limit) => (value) => {
        dispatch({ type: "loaded", value, limit });
    };
    const setError = (error) => {
        dispatch({ type: "error", error });
    };
    const reest = () => {
        dispatch({ type: "reset" });
    };
    return Object.assign(Object.assign({}, state), { reest,
        setValue,
        loadMore,
        setError });
};
export default usePaginationValue;
