angular.module('result', [])
  .controller('ResultController', function($window, $scope, $http) {
    // $scope.answer = $window.answer;
    $scope.answer = 'cuba'

    let flickrUrl ='https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?&tags='+$scope.answer;
    $http({
      method:'GET',
      url:'/data'
    })
    .then(res=>{
      let datas = res.data
      for(data of datas){
        if(data.name===$scope.answer)
          $scope.answerdata = data;
          console.log($scope.answerdata);
      }
    });
  });
