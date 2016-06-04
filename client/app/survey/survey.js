angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);


SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile','getData']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile, getData) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.questions = QuestionList.questions;
  $scope.questionIndex = 0;
  $scope.answer = [];

  let questionIndex=0;
  let questions;
  let question;
  let tourSites;

  // finished(서버로부터 기본 데이터를 가져오는 함수. Scope에 데이터들을 묶어준다.)
  getData.init()
  .then(res => {
    console.log(res);
    tourSites = res.data;
    questions = QuestionList.questions;
    question = questions[questionIndex];
    $scope.questions = questions;
    $scope.questionIndex = 0;
    for(let key in question) {
      $scope[key] = question[key];
    }
  });


  //this function make 'next' button able when radio is chosen.(다음 질문 버튼을 able하게 하는 함수.)
  $scope.ableButton = function(value) {
      $scope.answer[$scope.questionIndex] = value;
      $('button').removeAttr('disabled');
  }


  //'다음'버튼을 눌렀을때 다음으로 이동하도록 해 주는 버튼에 묶여있는 함수.
  $scope.nextquestion = function() {
    console.log('현재 입력된 데이터 : ', $scope.answer)
    //increase index of question when it is smaller than 5.
    if($scope.questionIndex<5){
      $scope.questionIndex++;
      $('button').attr('disabled','true');
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
    //change value into type data
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


  //fullpage.js options 
  var _this = this;
  this.mainOptions = {
    anchors: ['1', '2', '3', '4', '5', '6'],
    menu: '#menu',
    lockAnchors: false,
    navigation: true
  };

  $scope.options = this.mainOptions;
}
