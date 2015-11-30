module.exports = function(Order) {

  Order.submitOrder = function(cb) {



    var response;
  //  var model = cb.instance;
    var mockBackEnd = Order.app.dataSources.InvestorAccounts;

    mockBackEnd.find(function(err, theResponse, context) {
      if (err) throw err; //error making request
      if (theResponse.error) {
        console.log("Error");
      }
      response = JSON.stringify(theResponse);
      console.log(new Date());
      console.log(response);
      //verify via `curl localhost:3000/api/Magazines`
      cb(null, response);

    });



  };
  Order.remoteMethod(
    'submitOrder',
    {
      http: {path: '/submitOrder', verb: 'get'},
      returns: {arg: 'submitOrder', type: 'string'}
    }
    );







};//END
