(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('selectableList', selectableList);

  function selectableList() {

    var directive =  {
      restrict: 'A',
      scope: true,
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr) {

      var collectionName = attr.selectableList;
      var collection = [];
      var propId = attr.selectedProperty || 'id';

      scope.checkboxes = {checked: false, items: {}}
      
      scope.$watch('checkboxes.checked', function(new_val){
        angular.forEach(collection, function (item) {
          scope.checkboxes.items[item[propId]] = new_val;
        });
      });
      

      scope.$watchCollection('checkboxes.items', function(new_val){
        calculateListState(collection, scope.checkboxes, true);
      });

      scope.$watchCollection(collectionName, function (new_val, old_val) {
        collection = new_val || [];
        if(new_val && old_val) {
          calculateListState(new_val, scope.checkboxes);
        }
      });

      function calculateListState(collection, checkboxes, withUpdate) {
        var checked = 0;
        var unchecked = 0;
        var total = collection.length;
        var ids = [];

        if(!total) {
            return;
        }

        angular.forEach(collection, function (item) {
          var findedIndex;
          var target = scope.$eval(attr.selectedTarget);
          if((item[propId] in checkboxes.items) && checkboxes.items[item[propId]]) {
            if(withUpdate && target.indexOf(item[propId]) == -1) {
              target.push(item[propId]);
            }
            ++checked;
          } else {
            if(withUpdate && (findedIndex = target.indexOf(item[propId])) != -1) {
              target.splice(findedIndex, 1);
            }
            ++unchecked;
          }
        });

        if ((unchecked === 0) || (checked === 0)) {
          checkboxes.checked = (checked === total);
        }
        el.find('#select_all').prop('indeterminate', (checked !== 0 && checked !== total));
      }
    }
  }
})();