angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {
      email: 'foo@bar.com',
      password: 'foobar'
    };
	/*.controller('AuthLoginController',['$scope','AuthService','$state', 'Customer', function($scope,AuthService,$state,Customer){
		$scope.login=function(){
			//START Login Function
			Customer
				.login({email:'user@email.com',password:'password'})
				.$promise
				.then(function(response){
					token = response.id;
					console.log("Token returned is " + token)
				});
			});	//END Login Function
		}])	//END Controller*/

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {
          $state.go('my-accounts');
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('logout-success');
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
  
  angular.module('FundManagmentApp.controllers', ['ionic', 'FundManagmentApp.controllers'])
​
.controller('AppCtrl', function($scope, $ionicModal, $location, $timeout, $state) {
  console.log("In App Ctrl");
​
​
​
})
​
​
.controller('PlaceOrderCtrl', function($scope, $ionicModal, $location, $timeout, $state, $http) {
      console.log("In Place Order Ctrl");
​
​
​
})
​
.controller('AuthLoginController', ['$scope', '$rootScope', 'AuthService', '$state', 'Customer', 'Order',
    function($scope, $rootScope, AuthService, $state, Customer, Order) {
            console.log("IN AUTH CTRL");
              $scope.customer = {
                email: 'gary@email.com',
                password: 'password'
              };
​
​
      $scope.login = function() {//START LOGIN
          console.log("CALLING LOGIN FUNCTION");
            Customer
              .login($scope.customer)
              .$promise
              .then(function(response) {
                console.log("RESPONSE IN AUTH JS");
                $rootScope.id = response.id;
                console.log("Token in root scope is " + $rootScope.id);
                return Order.getBalance($rootScope.id);
              }).then(function(result) {
                var balance = Order.getBalance('AHAQAfItyhR59OBjPgU9tUYjl5Sn9vaubFBrLG8GRh3gCtx5CvPDVyLZlnpmVxmL');
                $rootScope.balance = result;
                console.log("Balance is here " + balance);
                $state.go('mainMenu');
              }).catch (function(err){
                      console.log("Error Caught " + JSON.stringify(err));
              });
​
      }; //END LOGIN
​
​
​
}])
​
.controller('MainMenuController', ['$scope', '$rootScope', '$state', 'Customer',
    function($scope, $rootScope, $state, Customer) {
            console.log("IN MAIN MENU CTRL");
            console.log("Token in root scope in main menu is " + $rootScope.id);
​
​
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
​
            }; //END LOGOUT
​
​
}])
​
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
​
        $scope.register = function() {
          AuthService.register($scope.user.email, $scope.user.password)
            .then(function() {
              $state.transitionTo('sign-up-success');
            });
        };
}]);
