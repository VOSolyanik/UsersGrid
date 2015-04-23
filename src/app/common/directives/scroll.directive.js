(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('scroll', scroll);

    scroll.$inject = ['$rootScope', '$window', '$timeout'];

    function scroll($rootScope, $window, $timeout) {
      return function(scope, element, attr) {
        if(scope.$eval(attr.scrollEnabled)) {

          checkSize();
          
          angular.element($window).bind('scroll', function() {
            if (angular.element($window)[0].scrollY + angular.element($window)[0].innerHeight >= (element[0].offsetHeight + element[0].offsetTop)*0.99) {
              $timeout(function() {
                scope.$apply(attr.scroll)
              },0);
            }
          });

          function checkSize() {
            $timeout(function() {
              if (angular.element($window)[0].innerHeight >= (element[0].offsetHeight + element[0].offsetTop)*0.99) {
                scope.$apply(attr.scroll);
                checkSize();
              }
            },100);
          }
        };
      };;
    }
})();
