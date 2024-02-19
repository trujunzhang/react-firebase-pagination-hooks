import firestore from "firebase/firestore";
export declare const updateItem: (doc: firestore.QueryDocumentSnapshot, items: firestore.DocumentData[]) => void;
export declare const deleteItem: (doc: firestore.QueryDocumentSnapshot, items: firestore.DocumentData[]) => void;
export declare const addItem: (doc: firestore.QueryDocumentSnapshot, items: firestore.DocumentData[]) => void;
