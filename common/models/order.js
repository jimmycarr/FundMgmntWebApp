module.exports = function(Order) {

  Order.submitOrder = function(investorId, noOfUnits, price, product, cb) {

    //Setting up variables
    var response;
    var mockBackEnd = Order.app.dataSources.InvestorAccounts;
    var transactionType = "Order Transaction";
    var currency = "GBP";
    var todaysDate = new Date();
    var balance = 0;
    var tradingAccountId;
    var investorAccountId;


    //REST CALL POST to Make a Payment - Using Promises
    mockBackEnd.makePayment(price, transactionType, currency, todaysDate)
    .then(function(result){
      result = JSON.stringify(result);
        console.log("Make a Payment Success");
        console.log("The response is " + result);
    })
    .catch(function(err){
   // Called if the operation encounters an error.
        console.log("Make a Payment Error");
    });

    //Chain REST CALLs using Promises to  Get Investor Accounts, Get Trading Balance then Update Trading Account
    mockBackEnd.getInvestorAccounts(investorId)
    .then(function(result){
          tradingAccountId = result.tradingAccountid;
          investorAccountId = result.id;
          result = JSON.stringify(result);
          console.log("Get Investor Accounts Success");
          console.log("The response is " + result);
          return mockBackEnd.getTradingAccountBalance(tradingAccountId);

    }, function(err){
          console.log("Get Investor Accounts Error");
    }).then(function(tradingAccount){
          console.log("Balance returned is " + tradingAccount.balance);
          var oldBalance = Number(tradingAccount.balance);
          var newBalance = oldBalance - Number(price);
          console.log("Old balance is " + oldBalance);
          balance = newBalance
          console.log("New balance is " + newBalance);
          tradingAccount = JSON.stringify(tradingAccount);
          console.log("Get Trading Account Balance Success");
          console.log("The response is " + tradingAccount);
          return mockBackEnd.updateTradingAccount(balance, tradingAccountId, investorAccountId);

    }, function(err){
          console.log("Get Trading Account Balance Error");
    }).then(function(tradingAccountUpdated) {
          tradingAccountUpdated = JSON.stringify(tradingAccountUpdated);
          console.log("Update Trading Account Success");
          console.log("The response is " + tradingAccountUpdated);
    }, function(err){
          console.log("Update Trading Account Error " + err);
    });

    //REST CALL POST to Post Order Using Promises
    mockBackEnd.postOrder(product, noOfUnits)
    .then(function(result){
          result = JSON.stringify(result);
          console.log("Post Order Success");
          console.log("The response is " + result);
    })
    .catch(function(err){
   // Called if the operation encounters an error.
          console.log("Post Order Error");
    });


    //Send the resonse to the remote method
    response = "Thanks for your order of " + noOfUnits + " Units of " + product;
    console.log(response);
    cb(null, response);

  };

  Order.remoteMethod(
      'submitOrder',
      {
        http: {path: '/submitOrder', verb: 'post'},
        accepts: [
          {arg: 'investorId', type: 'string'},
          {arg: 'noOfUnits', type: 'number'},
          {arg: 'price', type: 'number'},
          {arg: 'product', type: 'string'}
                ],
        returns: {arg: 'orderConfirmation', type: 'string'}
      }
    );


};//END
