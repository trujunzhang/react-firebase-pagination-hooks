import firestore from "firebase/firestore";
import { PaginationHook } from "./util/usePaginationValue";
export declare const usePagination: (query?: firestore.Query | null, options?: {
    snapshotListenOptions?: firestore.SnapshotListenOptions;
    limit?: number;
}) => PaginationHook<firestore.DocumentSnapshot<firestore.DocumentData, firestore.DocumentData>>;
export declare const usePaginationData: <T>(query?: firestore.Query | null, options?: {
    idField?: string;
    limit?: number;
    snapshotListenOptions?: firestore.SnapshotListenOptions;
}) => PaginationHook<T>;
