(function() {
  'use strict';

  angular
    .module('app.users')
    .factory('Users', Users); 

    Users.$inject = ['$q', '$http', '$filter', '_', 'localStorageService'];


    function Users($q, $http, $filter, _, localStorageService) {

      var requestParams = {};
      var deleted = [];

      var factory = {
        getUsers: getUsers,
        deleteUser: deleteUser,
        updateUser: updateUser
      }

      return factory;

      function getUsers(params){
        var def = $q.defer();
        angular.extend(requestParams, params);

        if(!localStorageService.get('users')){
          $http.get('../users.json')
            .success(function (data) {
              var sortedFilteredUsers = sort(filter(data));
              localStorageService.set('users', data);
              def.resolve({
                total: sortedFilteredUsers.length,
                results: pager(sortedFilteredUsers)
              }); 
            })
            .error(function (err) {
              def.reject(err);
            });
        }
        if(localStorageService.get('users')){
          var sortedFilteredUsers = sort(filter(localStorageService.get('users')));
          def.resolve({
            total: sortedFilteredUsers.length,
            results: pager(sortedFilteredUsers)
          }); 
        }

        return def.promise;
      }

      function deleteUser(id) {
        var users = localStorageService.get('users');
        _.remove(users, {id: id});
        localStorageService.set('users', users);
      }

      function updateUser(user) {
        var users = localStorageService.get('users');
        var findedUser = _.find(users, {id: user.id});
        angular.extend(findedUser, user);
        localStorageService.set('users', users);
      }

      function sort(list) {
        var sorting = requestParams.sorting || {};
        if(sorting.field && !angular.isUndefined(sorting.descending)){
          list = _.sortByOrder(list, [sorting.field], [sorting.descending])
        }
        return list;
      }

      function filter(list) {
        var filter = requestParams.filter || {};
        var filterRange = requestParams.filterRange || {};
        list = $filter('filter')(list, filter);
        list = $filter('rangeFilter')(list, filterRange);

        return list;
      }

      function pager(list) {
        if(!angular.isUndefined(requestParams.paging)){
          var page = requestParams.page || 1;
          var limit = requestParams.limit || 10;
          var isPaging = requestParams.paging;

          var from = isPaging ? (page - 1) * limit : 0;
          var to = page * limit > list.length ? list.length : page * limit;
          return list.slice(from, to);  
        }

        return list;
      }
    }

})();

