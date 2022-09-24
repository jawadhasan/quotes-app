const QuoteService = require(`./quote-service`);

class QuoteController {

    async findByID(req, res) {
        const data = await QuoteService.findByID(req.params.UserID)

        res.json(data)
    } 
}

module.exports = new QuoteController()