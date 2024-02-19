import firestore from "firebase/firestore";
export declare const snapshotToData: (snapshot: firestore.DocumentSnapshot, idField?: string) => {
    [x: string]: any;
} | undefined;
