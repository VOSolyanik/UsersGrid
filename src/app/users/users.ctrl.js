(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$scope', '$modal', 'Users', '_'];

    function UsersCtrl($scope, $modal, Users, _) {
      var vm = this;

      vm.users = [];
      vm.data = [];
      vm.selectedList = [];
      vm.columns = [
        {
          field: 'email',
          title: 'Email',
          sortable: true,
          filter: 'text'
        },
        {
          field: 'lastName',
          title: 'Lastname',
          sortable: true,
          filter: 'text'
        },
        {
          field: 'firstName',
          title: 'Firstname',
          sortable: true,
          filter: 'text'
        },
        {
          field: 'age',
          title: 'Age',
          sortable: true,
          filter: 'select'
        }
      ];
      vm.ageOptions = [
        { label: 'All', value: {}},
        { label: '10-19', value: { min: 10, max: 19 } },
        { label: '20-29', value: { min: 20, max: 29 } },
        { label: '30-39', value: { min: 30, max: 39 } },
        { label: '40+', value: {  min: 40 } }
      ];
      vm.params = {
        filter: {},
        filterRange: {},
        sorting: {
          field: 'email',
          descending: true
        },
        paging: false,     //  true - pagination, false - infinity scroll
        page: 1,
        limit: 10,
        editMode: 'inline' //  'modal'||'inline'
      };
      
      vm.sort = sort;
      vm.getNextPage = getNextPage;
      vm.startEdit = vm.params.editMode == 'modal' ? editModal : startEdit;
      vm.cancelEdit = cancelEdit;
      vm.save = save;
      vm.deleteUsers = deleteUsers;

      function activate(params) {
        if(angular.isUndefined(params)) return;
        Users.getUsers(params)
          .then(function (data) {
            vm.users = data.results;
            vm.total = data.total;
          });
      };

      function sort(field) {
        var sortParams = vm.params.sorting;
        if(field == sortParams.field){
          sortParams.descending = !sortParams.descending;
        } else{
          sortParams.field = field;
          sortParams.descending = false;
        }
      }

      function getNextPage() {
        if(vm.total > vm.users.length){
          vm.params.page++;
        }
      }

      function editModal(item){
        $modal.open({
          templateUrl: 'app/users/edit-user.tpl.html',
          controller: 'EditUserCtrl',
          controllerAs: 'vm',
          resolve: {
            user: function () {
              return angular.copy(item);
            }
          }
        }).result
          .then(function (data) {
            Users.updateUser(data);
            activate(vm.params);
          });
      }

      function startEdit(item) {
        vm.editableItem = angular.copy(item);
        item.isEditing = true;
      }

      function cancelEdit(item) {
        item.isEditing = false;
        angular.extend(item, vm.editableItem);
        vm.editableItem = null;
      }

      function save(item) {
        item.isEditing = false;
        vm.editableItem = null;
        Users.updateUser(_.omit(item, 'isEditing'));
        activate(vm.params);
      }

      function deleteUsers(idsArr){
        _.forEach(idsArr, function (id) {
          Users.deleteUser(id);
          activate(vm.params);
        });
      }

      $scope.$watch('vm.params', activate, true);

    };
})();

