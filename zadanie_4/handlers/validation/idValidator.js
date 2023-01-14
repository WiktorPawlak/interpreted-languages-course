const idFormat = /^[0-9a-fA-F]{24}$/;

exports.validateId = (id) => {
    if (!idFormat.test(id)) {
        throw new Error(`id ${id} has invalid format`);
    }
    if (!id) {
        throw new Error('id is required');
    }
}
