"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshotToData = void 0;
const snapshotToData = (snapshot, idField) => {
    if (!snapshot.exists) {
        return undefined;
    }
    return Object.assign(Object.assign({}, snapshot.data()), (idField ? { [idField]: snapshot.id } : null));
};
exports.snapshotToData = snapshotToData;
