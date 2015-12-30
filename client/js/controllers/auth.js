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
