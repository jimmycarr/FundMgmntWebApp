angular
  .module('app')
  .factory('AuthService', ['Reviewer', '$q', '$rootScope', function(User, $q,
      $rootScope) {
    function login(email, password) {
      return Customer
              .login($scope.customer)
              .$promise
              .then(function(response) {
                console.log("RESPONSE IN AUTH JS");
                $rootScope.id = response.id;
                console.log("Token in root scope is " + $rootScope.id);
                $state.go('my-accounts');
              }).catch (function(err){
                      console.log("Error Caught " + JSON.stringify(err));
              });
    }

    function logout() {
      return Customer
              .logout($scope.customer)
              .$promise
              .then(function(response) {
                console.log("USER LOGGED OUT");
                $state.go('login');
              }).catch (function(err){
                      console.log("Error Caught " + JSON.stringify(err));
              });
    }

    function register(email, password) {
      return User
        .create({
         email: email,
         password: password
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
