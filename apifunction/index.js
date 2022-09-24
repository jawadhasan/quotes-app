exports.handler = async (event) => {
    // TODO implement
    
    var token = makeid(5)
    console.log(token);
    console.log("...");

	const response = {
        statusCode: 200,
        body: JSON.stringify(token),
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
