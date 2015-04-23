(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('EditUserCtrl', EditUserCtrl);

    EditUserCtrl.$inject = ['$scope', '$modalInstance', 'user'];

    function EditUserCtrl($scope, $modalInstance, user) {
      var vm = this;

      vm.user = user;

      vm.cancel = cancel;
      vm.save = save;

      function cancel() {
        $modalInstance.dismiss('cancel');
      }
      function save() {
        $modalInstance.close(vm.user);
      }

    };
})();

