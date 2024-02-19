import { onSnapshot } from "firebase/firestore";
import * as React from "react";
import { snapshotToData } from "./helper";
// import useIsEqualRef, { useIsFirestoreQueryEqual } from "./util/useIsEqualRef";
import { useIsFirestoreQueryEqual } from "./util/useIsEqualRef";
import usePaginationValue from "./util/usePaginationValue";
import { 
// doc,
// DocumentReference,
// collection,
// orderBy,
query as FBQuery, 
// where,
// startAfter,
// Query,
// DocumentSnapshot,
limit as FBLimit, } from "firebase/firestore";
const { useEffect, useMemo } = React;
const DEFAULT_LIMIT = 20;
export const usePagination = (query, options) => {
    const { loaded, loadingMore, limit, error, setError, setValue, reest, value, after, loadMore, hasMore, } = usePaginationValue();
    const ref = useIsFirestoreQueryEqual(query, reest);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const stepLimit = (options === null || options === void 0 ? void 0 : options.limit) || DEFAULT_LIMIT;
        const queryLimited = FBQuery(ref.current, FBLimit(limit || stepLimit));
        const snapshotOption = options === null || options === void 0 ? void 0 : options.snapshotListenOptions;
        const listener = snapshotOption
            ? onSnapshot(queryLimited, snapshotOption, setValue(stepLimit), setError)
            : onSnapshot(queryLimited, setValue(stepLimit), setError);
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
export const usePaginationData = (query, options) => {
    const idField = options ? options.idField : undefined;
    const [snapshot, fields, error] = usePagination(query, {
        snapshotListenOptions: options === null || options === void 0 ? void 0 : options.snapshotListenOptions,
        limit: options === null || options === void 0 ? void 0 : options.limit,
    });
    const values = useMemo(() => (snapshot
        ? snapshot.map((doc) => snapshotToData(doc, idField))
        : undefined), [snapshot, idField]);
    return [values, fields, error];
};
