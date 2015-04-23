(function () {
'use strict';

angular
    .module('app.directives')
    .directive('loader', loader);

    loader.$inject = ['$rootScope'];

    function loader($rootScope) {
      return function ($scope, element, attrs) {
        $rootScope.$on("loader_show", function () {
          element.show();
        });
        $rootScope.$on("loader_hide", function () {
          element.hide();
        });
      };
    };
})();