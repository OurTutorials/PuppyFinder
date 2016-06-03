angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);

SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.questions = QuestionList.questions;
  $scope.questionIndex = 0;
  $scope.nextquestion = function(index){
  //this function change contents inside questionbox.
    var currentSection = $('.active').attr('id');
    $scope.questionIndex++;
  }

  //set options for fullpage.js
  var _this = this;
  this.mainOptions = {
    anchors: ['1', '2', '3', '4', '5', '6'],
    menu: '#menu',
    lockAnchors: false,
    navigation: true
  };
  $scope.options = this.mainOptions

}
