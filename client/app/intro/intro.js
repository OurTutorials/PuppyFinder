angular.module('intro', [])
  .controller('IntroController', function($scope, $window, $location) {
    $scope.width = window.innerWidth;
    $scope.height = window.innerHeight;
  });
