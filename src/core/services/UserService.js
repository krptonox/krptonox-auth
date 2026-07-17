export class UserService {
    constructor(databaseProvider) {
        this.databaseProvider = databaseProvider;
    }

    async findUserBy(criteria) {
        return this.databaseProvider.findUserBy(criteria);
    }

    async findUserById(id) {
        return this.databaseProvider.findUserById(id);
    }

    async createUser(userData) {
        return this.databaseProvider.createUser(userData);
    }

    async updateUser(id, updates) {
        return this.databaseProvider.updateUser(
            id,
            updates
        );
    }
}