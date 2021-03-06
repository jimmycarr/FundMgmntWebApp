angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('landing-page', {
        url: '/landing-page',
        templateUrl: 'views/landing-page.html',
        //controller: 'AddReviewController',
        //authenticate: true
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'views/about-us.html',
        //controller: 'AddReviewController',
        //authenticate: true
      })
      .state('my-accounts', {
        url: '/my-accounts',
        templateUrl: 'views/my-accounts.html',
        controller: 'MainMenuController'
        //authenticate: true
      })
      .state('invest-funds', {
        url: '/invest-funds/:id',
        templateUrl: 'views/invest-funds.html',
        controller: 'PlaceOrderCtrl',
        //authenticate: true
      })
      
     /*START - Sign Up Functions*/
	    .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      })
     /*END - Sign Up Functions*/

     /*START - Login/Logout Functions*/
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('logout-success', {
        url: '/logout/success',
        templateUrl: 'views/logout-success.html'
      })
      //Forbidden - Must be logged in
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      });
     /*END - Login/Logout Functions*/

    $urlRouterProvider.otherwise('landing-page');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
