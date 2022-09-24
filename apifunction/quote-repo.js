const db = require(`./database`);

class UserRepository {

    constructor() {
        this.tableName = 'quote-json-data';
    }

    async findByID(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                id,
            },
        };

        return await db.get(params).promise();
    }

}

module.exports = new UserRepository();