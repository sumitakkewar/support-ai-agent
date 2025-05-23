import BaseRepository from './BaseRepository.js';
import User from '../model/User.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await this.findOne({ email });
    }

    async createUser(userData) {
        return await this.create(userData);
    }
}

export default new UserRepository(); 