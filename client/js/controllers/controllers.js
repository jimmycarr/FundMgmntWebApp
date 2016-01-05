angular.module('FundManagmentApp.controllers', ['ionic', 'FundManagmentApp.controllers'])

.controller('AppCtrl', function($scope, $ionicModal, $location, $timeout, $state) {
  console.log("In App Ctrl");



})


.controller('PlaceOrderCtrl', ['$scope', '$rootScope', '$state', 'Order', 'Customer', function($scope, $rootScope, $state, Order, Customer) {
      console.log("In Place Order Ctrl");


      $scope.token = {
        token: $rootScope.id
      };

       $scope.currentEntry = {};

      $scope.products = [{
        name: 'GK Futures',
        cost: 2
      }, {name: 'GK Futures 3',
      cost: 3}];


      $scope.placeOrder = function() {//START PLACE ORDER FUNCTION
          console.log("CALLING PLACE ORDER");
          console.log(JSON.stringify($scope.currentEntry));

          var totalCost = $scope.currentEntry.product.cost * $scope.currentEntry.quantity;
          var productName = $scope.currentEntry.product.name;

          $scope.order = {
            token: $rootScope.id,
            noOfUnits: $scope.currentEntry.quantity,
            price: totalCost,
            product: productName
          };


          Order
            .placeOrder($scope.order)
            .$promise
            .then(function(result) {
              console.log("Order result " + JSON.stringify(result));
              placeOrder();
              $state.go('mainMenu');
            }).catch (function(err){
              console.log("Error Caught in taking order " + JSON.stringify(err));
            });

      }; //END PLACE ORDER FUNCTION

      $scope.logout = function() {//START LOGOUT
          console.log("CALLING LOGOUT FUNCTION");
            Customer
              .logout($scope.customer)
              .$promise
              .then(function(response) {
                console.log("USER LOGGED OUT");
                $state.go('login');
              }).catch (function(err){
                      console.log("Error Caught " + JSON.stringify(err));
              });

      }; //END LOGOUT

      function placeOrder() {

      Order
        .getBalance($scope.token)
        .$promise
        .then(function(result) {
          $rootScope.balance = '£' + result.balance;
          console.log("The correct balance is " + JSON.stringify($rootScope.balance));
        //  $state.go('mainMenu');
        }).catch (function(err){
          console.log("Error Caught " + JSON.stringify(err));
        });

          };



}])

.controller('AuthLoginController', ['$scope', '$rootScope', 'AuthService', '$state', 'Customer', 'Order',
    function($scope, $rootScope, AuthService, $state, Customer, Order) {
            console.log("IN AUTH CTRL");
              $scope.customer = {
                email: 'gary@email.com',
                password: 'password'
              };



      $scope.login = function() {//START LOGIN
          console.log("CALLING LOGIN FUNCTION");
            Customer
              .login($scope.customer)
              .$promise
              .then(function(response) {
                console.log("RESPONSE IN AUTH JS");
                $rootScope.id = response.id;
                console.log("Token in root scope is " + $rootScope.id);
                $state.go('mainMenu');
              }).catch (function(err){
                      console.log("Error Caught " + JSON.stringify(err));
              });

      }; //END LOGIN



}])

.controller('MainMenuController', ['$scope', '$rootScope', '$state', 'Customer', 'Order',
    function($scope, $rootScope, $state, Customer, Order) {
            console.log("IN MAIN MENU CTRL");

            $scope.token = {
              token: $rootScope.id
            };

            placeOrder();

            function placeOrder() {

            Order
              .getBalance($scope.token)
              .$promise
              .then(function(result) {
                $rootScope.balance = '£' + result.balance;
                console.log("The correct balance is " + JSON.stringify($rootScope.balance));
              //  $state.go('mainMenu');
              }).catch (function(err){
                console.log("Error Caught " + JSON.stringify(err));
              });

            };



            $scope.placeOrder = function() {//START Place Order
                console.log("CALLING PLACE ORDER FUNCTION");
                $state.go('placeOrder');
            }; //END Place Order



            $scope.logout = function() {//START LOGOUT
                console.log("CALLING LOGOUT FUNCTION");
                  Customer
                    .logout($scope.customer)
                    .$promise
                    .then(function(response) {
                      console.log("USER LOGGED OUT");
                      $state.go('login');
                    }).catch (function(err){
                            console.log("Error Caught " + JSON.stringify(err));
                    });

            }; //END LOGOUT


}])

.controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
          function($scope, AuthService, $state) {
        AuthService.logout()
          .then(function() {
            $state.go('all-reviews');
          });
}])
.controller('SignUpController', ['$scope', 'AuthService', '$state',
          function($scope, AuthService, $state) {
        $scope.user = {
          email: 'baz@qux.com',
          password: 'bazqux'
        };

        $scope.register = function() {
          AuthService.register($scope.user.email, $scope.user.password)
            .then(function() {
              $state.transitionTo('sign-up-success');
            });
        };
}]);
