const QuoteService = require(`./quote-service`);

exports.handler = async (event) => {
   
    
    var token = makeid(5)
    console.log(token);
    console.log("...");

    var rQuote = await getRandomCode();
   
	const response = {
        statusCode: 200,
        body: JSON.stringify(rQuote),
    };
    return response;  

};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function getRandomCode(){
  let totalQuotes = '5000';// hard-coded value for now

  //use random number to get quote.
  var theRandomNumber = Math.floor(Math.random() * totalQuotes) + 1;
  console.log(`theRandomNumber: ${theRandomNumber}`); 

  const data = await QuoteService.findByID(theRandomNumber.toString());

  console.log(`randomQuote: ${data}`);

  return data;
}
