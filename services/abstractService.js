
class AbstractService {

    async filter() {}

    async create(data = {}, options = {}) {

        throw new Error('Create was not implemented');
    }

    async update(data = {}, id = 0, options = {}) {

        throw new Error('Update was not implemented');
    }

    async find(id = 0) {

        throw new Error('Find was not implemented');
    }

    async delete(id = 0, options = {}) {

        throw new Error('Delete was not implemented');
    }

    async paginate(where = {}, joins = []) {

        throw new Error('Paginate was not implemented');
    }
}