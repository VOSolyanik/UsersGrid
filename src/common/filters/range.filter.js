(function () {

  'use strict';

  angular
    .module('app.filters')
    .filter('rangeFilter', rangeFilter);

    function rangeFilter() {
      return function (collection, params) {
        if(angular.isUndefined(params) || !angular.isObject(params)){
          return collection;
        };

        var out = [];
        var firstCircle = true;

        for(var key in params){
          collection = firstCircle ? collection : angular.copy(out);
          out == [];
          firstCircle = false;
          var value = params[key];
          if(!angular.isUndefined(value.min) && !angular.isUndefined(value.max)){
            for(var i in collection){
              if(collection[i][key] <= value.max && collection[i][key] >= value.min){
                out.push(collection[i]);
              }
            }
          } else if(angular.isUndefined(value.min) && !angular.isUndefined(value.max)){
            for(var i in collection){
              if(collection[i][key] <= value.max){
                out.push(collection[i]);
              }
            }
          } else if(!angular.isUndefined(value.min) && angular.isUndefined(value.max)){
            for(var i in collection){
              if(collection[i][key] >= value.min){
                out.push(collection[i]);
              }
            }
          } else if(angular.isUndefined(value.min) && angular.isUndefined(value.max)){
            out = angular.copy(collection);
          }
        }
        
        return firstCircle ? collection : out;
      }
    }

})();
  
