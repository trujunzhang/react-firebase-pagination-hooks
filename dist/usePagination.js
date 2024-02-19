"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaginationData = exports.usePagination = void 0;
const tslib_1 = require("tslib");
const firestore_1 = require("firebase/firestore");
const React = tslib_1.__importStar(require("react"));
const helper_1 = require("./helper");
// import useIsEqualRef, { useIsFirestoreQueryEqual } from "./util/useIsEqualRef";
const useIsEqualRef_1 = require("./util/useIsEqualRef");
const usePaginationValue_1 = tslib_1.__importDefault(require("./util/usePaginationValue"));
const firestore_2 = require("firebase/firestore");
const { useEffect, useMemo } = React;
const DEFAULT_LIMIT = 20;
const usePagination = (query, options) => {
    const { loaded, loadingMore, limit, error, setError, setValue, reest, value, after, loadMore, hasMore, } = (0, usePaginationValue_1.default)();
    const ref = (0, useIsEqualRef_1.useIsFirestoreQueryEqual)(query, reest);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const stepLimit = (options === null || options === void 0 ? void 0 : options.limit) || DEFAULT_LIMIT;
        const queryLimited = (0, firestore_2.query)(ref.current, (0, firestore_2.limit)(limit || stepLimit));
        const snapshotOption = options === null || options === void 0 ? void 0 : options.snapshotListenOptions;
        const listener = snapshotOption
            ? (0, firestore_1.onSnapshot)(queryLimited, snapshotOption, setValue(stepLimit), setError)
            : (0, firestore_1.onSnapshot)(queryLimited, setValue(stepLimit), setError);
        return () => listener();
    }, [ref.current, after]);
    return [
        value,
        {
            loaded,
            loadingMore,
            hasMore,
            loadMore,
        },
        error,
    ];
};
exports.usePagination = usePagination;
const usePaginationData = (query, options) => {
    const idField = options ? options.idField : undefined;
    const [snapshot, fields, error] = (0, exports.usePagination)(query, {
        snapshotListenOptions: options === null || options === void 0 ? void 0 : options.snapshotListenOptions,
        limit: options === null || options === void 0 ? void 0 : options.limit,
    });
    const values = useMemo(() => (snapshot
        ? snapshot.map((doc) => (0, helper_1.snapshotToData)(doc, idField))
        : undefined), [snapshot, idField]);
    return [values, fields, error];
};
exports.usePaginationData = usePaginationData;
