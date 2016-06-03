angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);


SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile','getData']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile, getData) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.questions = QuestionList.questions;
  $scope.questionIndex = 0;

  //set options for fullpage.js
      let questionIndex=0;
      let questions;
      let question;
      let tourSites;

      // finished
      getData.init()
      .then(res => {
        tourSites = res.data;
        questions = QuestionList.questions;
        question = questions[questionIndex];
        $scope.questions = questions;
        $scope.questionIndex = 0;
        for(let key in question) {
          $scope[key] = question[key];
        }
      });

      

      $scope.width = window.innerWidth;
      $scope.height = window.innerHeight;
      $scope.nextquestion = function() {
      //increase index of question when it is smaller than 5.
      if($scope.questionIndex<5){
        $scope.questionIndex++;
      }else{
      //change button when last question.
        $('.md-button').css('display','');
        $('.md-button').removeAttr('disabled');
        $('#menu').css('display','none');
      }

      const question = questions[$scope.questionIndex];
      for(let key in question) {
        $scope[key] = question[key];
      }

      if($scope.type ==='season') {
        $scope.photos = [];
        for(tourSite of tourSites) {
          for(let photo in tourSite.seasonPhotos) {
            if($scope.slice||(photo.month === $scope.answer.slice(0,-1))) {
              $scope.photos.push(photo.img);
            }
          }
        }
      }

        var currentSection = $('.active').attr('id');
      }


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


      var _this = this;
      this.mainOptions = {
        anchors: ['1', '2', '3', '4', '5', '6'],
        menu: '#menu',
        lockAnchors: false,
        navigation: true
      };

      $scope.options = this.mainOptions;
}
