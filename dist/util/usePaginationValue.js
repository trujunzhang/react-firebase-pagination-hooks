"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const operation_1 = require("./operation");
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
                    (0, operation_1.addItem)(change.doc, value);
                }
                else if (change.type === "modified") {
                    (0, operation_1.updateItem)(change.doc, value);
                }
                else if (change.type === "removed") {
                    (0, operation_1.deleteItem)(change.doc, value);
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
exports.default = usePaginationValue;
