(function () {
  
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

    coreConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', 'localStorageServiceProvider'];

    function coreConfig($routeProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
      $routeProvider
        .when('/', {
          controller: 'UsersCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/users/users.tpl.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
      };
      localStorageServiceProvider.prefix = 'trinetix';

      $httpProvider.interceptors.push('loading');
    }

})();
  
