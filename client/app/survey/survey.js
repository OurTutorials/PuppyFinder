angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);

SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile) {
<<<<<<< b6ec09e50206d1811233f85777cbbe65590a4650
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
=======
        /* Get the question list from the factory and insert into this scope */
    $scope.questions = QuestionList.questions;
    $scope.questionIndex = 0
    $scope.nextquestion = function(index){
    var currentSection = $('.active').attr('id');
    var difference = $('#section1').offset().top-$('#section0').offset().top;
      $scope.questionIndex++;
    }
        
>>>>>>> fullpage application
      $scope.width = window.innerWidth;
      $scope.height = window.innerHeight;

      
      //Fullpage-auglar code.

      var _this = this;
      this.mainOptions = {
        anchors: ['1', '2', '3', '4', '5', '6'],
        menu: '#menu',
        lockAnchors: false,
        navigation: true
      };
      $scope.options = this.mainOptions


      // $('#myfull').attr('full-page options',"vm.mainOptions")
}
