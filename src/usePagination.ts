import firestore, {onSnapshot} from "firebase/firestore";
import * as React from "react";
import {snapshotToData} from "./helper";
// import useIsEqualRef, { useIsFirestoreQueryEqual } from "./util/useIsEqualRef";
import {useIsFirestoreQueryEqual} from "./util/useIsEqualRef";
import usePaginationValue, {PaginationHook} from "./util/usePaginationValue";
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
    limit as FBLimit,
} from "firebase/firestore";

const {useEffect, useMemo} = React;

const DEFAULT_LIMIT = 20;

export const usePagination = (
    query?: firestore.Query | null,
    options?: {
        snapshotListenOptions?: firestore.SnapshotListenOptions;
        limit?: number;
    }
): PaginationHook<firestore.DocumentSnapshot> => {
    const {
        loaded,
        loadingMore,
        limit,
        error,
        setError,
        setValue,
        reest,
        value,
        after,
        loadMore,
        hasMore,
    } = usePaginationValue();

    const ref = useIsFirestoreQueryEqual(query, reest);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const stepLimit = options?.limit || DEFAULT_LIMIT;
        const queryLimited = FBQuery(ref.current, FBLimit(limit || stepLimit));

        const snapshotOption = options?.snapshotListenOptions;
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

export const usePaginationData = <T>(
    query?: firestore.Query | null,
    options?: {
        idField?: string;
        limit?: number;
        snapshotListenOptions?: firestore.SnapshotListenOptions;
    }
): PaginationHook<T> => {
    const idField = options ? options.idField : undefined;

    const [snapshot, fields, error] = usePagination(query, {
        snapshotListenOptions: options?.snapshotListenOptions,
        limit: options?.limit,
    });
    const values = useMemo(
        () =>
            (snapshot
                ? snapshot.map((doc) => snapshotToData(doc, idField))
                : undefined) as T[],
        [snapshot, idField]
    );
    return [values, fields, error];
};
