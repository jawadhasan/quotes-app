const QuoteRepository = require(`./quote-repo`);

class QuoteService {

    async findByID(id) {
        const data = await QuoteRepository.findByID(id);

        if (data) {
            return data.Item;
        }

        return data;
    }  
}

module.exports = new QuoteService()