angular.module('result', [])
  .controller('ResultController', function($window, $scope) {
    $scope.answer = $window.answer;
  });
