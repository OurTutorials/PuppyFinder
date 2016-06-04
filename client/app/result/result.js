angular.module('result', [])
  .controller('ResultController', function($window, $scope, $sce, RelatedContents) {
    $scope.selected = $window.selected
  });
