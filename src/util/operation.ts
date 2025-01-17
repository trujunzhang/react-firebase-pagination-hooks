import firestore from "firebase/firestore";

const findIndexOfDocument = (
  doc: firestore.QueryDocumentSnapshot,
  items: firestore.DocumentData[]
): number =>
  items.findIndex((item) => {
    return item.ref.path === doc.ref.path;
  });

export const updateItem = (
  doc: firestore.QueryDocumentSnapshot,
  items: firestore.DocumentData[]
): void => {
  const i = findIndexOfDocument(doc, items);
  items[i] = doc;
};

export const deleteItem = (
  doc: firestore.QueryDocumentSnapshot,
  items: firestore.DocumentData[]
): void => {
  const i = findIndexOfDocument(doc, items);
  items.splice(i, 1);
};

export const addItem = (
  doc: firestore.QueryDocumentSnapshot,
  items: firestore.DocumentData[]
): void => {
  const i = findIndexOfDocument(doc, items);
  if (i === -1) {
    items.push(doc);
  }
};
