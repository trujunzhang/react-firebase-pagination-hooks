export const snapshotToData = (snapshot, idField) => {
    if (!snapshot.exists) {
        return undefined;
    }
    return Object.assign(Object.assign({}, snapshot.data()), (idField ? { [idField]: snapshot.id } : null));
};
