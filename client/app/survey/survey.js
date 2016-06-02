angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);

SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile) {
  $scope.imageUrl =[];
  for(var i =0; i<6; i++){
    $scope.imageUrl.push('/assets/back'+i+'.png')  ;
  }
      /* Get the question list from the factory and insert into this scope */
      $scope.questions = QuestionList.questions;
          $scope.questionIndex = 0
          $scope.nextquestion = function(index){
            var currentSection = $('.active').attr('id');
            console.log($("#section0").offset());
            console.log(currentSection);
            $('html, body').animate({
                scrollTop: $("#section1").offset().top
            }, 1000);
            $scope.questionIndex++;
            $scope.topIndex = $scope.questionIndex;
          }
      /* Container for user's answers to survey */
      $scope.data = {
        puppyData: {}
      };
      
      /* Method to send user's answers to the server and get results */
      $scope.sendQuery = function() {
        Result.getResults($scope.data.puppyData)
          .then(function(resp) {
            /* Put results in the window scope container set in the AppController  */
            $window.results = resp.data;
            return "success";
          })
          .then(function(success) {
            $location.path('/result');
          });
      };

      /* Default settings for styling */
      $scope.topIndex = 0;
      $scope.width = window.innerWidth;
      $scope.height = window.innerHeight;

      /* Method to move(scroll) to the next question by changing topIndex in the scroll container */
      $scope.$on('$viewContentLoaded', function() {
        // Init Features Here
      });

      //Fullpage-auglar code.

      var _this = this;
      this.mainOptions = {
        // anchors: ['survey/#firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        lockAnchors: true,
        onLeave: function(index, nextIndex, direction){
          console.log('hi');
        },
        navigation: true
      };

      this.moog = function(merg){ console.log(merg); };


      // $('#myfull').attr('full-page options',"vm.mainOptions")


}
