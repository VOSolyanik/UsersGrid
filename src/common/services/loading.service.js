(function () {
  'use strict';

  angular
    .module('app.services')
    .factory('loading', loading);

  loading.$inject = ['$rootScope', '$q'];

  function loading($rootScope, $q) {
    var numLoadings = 0;

    return {
      request: function (config) {
        if(numLoadings == 0){
          $rootScope.$broadcast("loader_show");
        }
        numLoadings++;

        return config || $q.when(config)
      },
      response: function (response) {
        if(!(--numLoadings)){
          $rootScope.$broadcast("loader_hide");
        }

        return response || $q.when(response);
      },
      responseError: function (response) {
        if(!(--numLoadings)){
          $rootScope.$broadcast("loader_hide");
        }

        return $q.reject(response);
      }
    };
  };
})();
