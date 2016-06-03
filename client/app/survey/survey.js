angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);

SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile', 'getData']

// function SurveyController($scope, $window, $location, QuestionList, Result, $compile) {
//   $scope.width = window.innerWidth;
//   $scope.height = window.innerHeight;
//   $scope.nextquestion = function(index){
//   //this function change contents inside questionbox.
//     var currentSection = $('.active').attr('id');
//     $scope.questionIndex++;
//   }

  //set options for fullpage.js

function SurveyController($scope, $window, $location, QuestionList, Result, $compile, getData) {

      let questionIndex=0;
      let questions;
      let question;
      let tourSites;

      // finished
      getData.init()
      .then(res => {
        tourSites = res.data;

        console.log(tourSites);

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
        $scope.questionIndex++;
        const question = questions[$scope.questionIndex];
        for(let key in question) {
          $scope[key] = question[key];
        }

        if($scope.type ==='season') {
          $scope.photos = [];
          for(tourSite of tourSites) {
            for(let photo in tourSite.seasonPhotos) {
              if(photo.month === $scope.answer.slice(0,-1)) {
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
