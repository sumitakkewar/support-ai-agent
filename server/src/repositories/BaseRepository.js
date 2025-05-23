export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findOne(query) {
        return await this.model.findOne(query);
    }

    async find(query, options = {}) {
        const { sort = { createdAt: -1 }, skip = 0, limit = 20 } = options;
        return await this.model.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    }

    async countDocuments(query) {
        return await this.model.countDocuments(query);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
} 