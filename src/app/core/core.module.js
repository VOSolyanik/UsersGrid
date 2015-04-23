(function () {

  'use strict';

  angular
    .module('app.core', [
      'ngRoute',
      'LocalStorageModule',

      'ui.bootstrap.modal',
      'ui.bootstrap.transition',
      "template/modal/backdrop.html",
      "template/modal/window.html",

      'ui.bootstrap.pagination',
      'template/pagination/pagination.html'
    ]);

})();
  
