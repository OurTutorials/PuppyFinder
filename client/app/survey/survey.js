angular.module('survey', [])
  .controller('SurveyController', SurveyController);

SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result', '$compile', 'getData']

function SurveyController($scope, $window, $location, QuestionList, Result, $compile, getData) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.questions = QuestionList.questions;
  $scope.questionIndex = 0;
  $scope.answer = {};

  let questionIndex = 0;
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
      $scope.questionIndex = 0
      for (let key in question) {
        $scope[key] = question[key];
      }
      // for dummy photo data
      // let myAct = ['food', 'gambling', 'hiking', 'landmark', 'music', 'shopping', 'sightseeing', 'traditional', 'waterSports']
      // $scope.photos = [];
      // for (let act of myAct) {
      //   $scope.photos.push('assets/activity/' + act + '.png');
      // }

      // if($scope.photos){
      //   $('.question_card').removeClass('nophoto');
      //   $('.question_card').addClass('photo');
      // }
    });

  $scope.hoverIn = function($event){
    $('#section'+$scope.questionIndex).css('-webkit-filter','blur(5px)')
    // $('.photobox img').css('-webkit-filter','blur(10px)')
  }
  $scope.hoverOut = function($event){
    $('#section'+$scope.questionIndex).css('-webkit-filter','')
    // $('.photobox img').css('-webkit-filter','blur(10px)')
  }
  //this function make 'next' button able when radio is chosen.(다음 질문 버튼을 able하게 하는 함수.)
  $scope.ableButton = function(value) {

    $scope.answer[$scope.type] = value;
    $('button').removeAttr('disabled');
    if ($scope.questionIndex === 5) {
      $('.md-button').removeAttr('disabled');

    }

    //change progress bar
    let percent = Math.floor((($scope.questionIndex + 1) * (16.6))).toString() + '%'
    $('.progress-bar').css('width', percent);
    $('.progress-bar').text(percent);
    $('.progress').css('opacity', ($scope.questionIndex + 1) * (0.16))

  }




  //'다음'버튼을 눌렀을때 다음으로 이동하도록 해 주는 버튼에 묶여있는 함수.
  $scope.nextquestion = function() {


    console.log('현재 입력된 데이터 : ', $scope.answer);

    //increase index of question when it is smaller than 5.
    if ($scope.questionIndex < 5) {
      $scope.questionIndex++;
      $('button').attr('disabled', 'true');
      if ($scope.questionIndex === 5) {
        $('button').css('display', 'none');
        $('.md-button').css('display', '');
        $('#menu').css('display', 'none');
        // $('.md-button').removeAttr('disabled');
      }
    }

    const question = questions[$scope.questionIndex];
    for (let key in question) {
      $scope[key] = question[key];
    }

    if ($scope.type === 'season') {
      $scope.photos = [];
      for (let tourSite of tourSites) {
        for (let photo of tourSite.seasonPhotos) {
          if (photo.month === parseInt($scope.answer['month'])) {
            $scope.photos.push(photo.img)
          }
        }
      }
    }
    if ($scope.type === 'food') {
      $scope.photos = [];
      for (let tourSite of tourSites) {
        for (let photo of tourSite.foodPhotos) {
          $scope.photos.push(photo)
        }
      }
    }
    if ($scope.type === 'activity') {
      let myAct = ['food', 'gambling', 'hiking', 'landmark', 'music', 'shopping', 'sightseeing', 'traditional', 'waterSports']
      $scope.photos = [];
      for (let act of myAct) {
        $scope.photos.push('assets/activity/' + act + '.png');
      }
    }


    if ($scope.photos) {
      $('.question_card').removeClass('nophoto');
      $('.question_card').addClass('photo');
    }



  }

  /* Method to send user's answers to the server and get results */
  $scope.sendQuery = function() {
    console.log('현재 입력된 데이터 : ', $scope.answer)
    $scope.answer['food'] = reduceImageRoute($scope.answer['food'])
    $scope.answer['activity'] = reduceImageRoute($scope.answer['activity']);
    $scope.answer['season'] = reduceImageRoute($scope.answer['season']);

    const TourSitesList = [];
    const resultScoreList = [];
    const selected = [];

    tourSites.forEach((tourSite) => {
      if (tourSite.name === $scope.answer.food) {
        tourSite.score++;
      }
      if (tourSite.name === $scope.answer.season) {
        tourSite.score++;
      }
      if ($scope.answer.day * tourSite.dailyFee + tourSite.flightFee <= $scope.answer.money) {
        tourSite.score++;
      }
      for (activity of tourSite.activity) {
        if (activity === $scope.answer.activity) {
          tourSite.score++;
        }
      }
      TourSitesList.push(tourSite.name);
      resultScoreList.push(tourSite.score);
    })
    const resultScore = resultScoreList.reduce((prev, current, currentIndex) => {
      if (prev <= current) {
        selected.push(TourSitesList[currentIndex]);
        return current
      } else {
        return prev;
      }
    }, 0);

    console.log(tourSites);
    console.log('selected: ', selected);
    $window.answer = selected[Math.floor(Math.random() * selected.length)];
    console.log('final answer: ', $window.answer);
    $location.path('/result');
  };


  //fullpage.js options
  const _this = this;
  this.mainOptions = {
    anchors: ['1', '2', '3', '4', '5', '6'],
    menu: '#menu',
    lockAnchors: false,
    navigation:false
  };
}


function reduceImageRoute(route) {
  let lastIndex = route.lastIndexOf('_') > 0 ? route.lastIndexOf('_') : route.lastIndexOf('.');
  let startIndex = route.lastIndexOf('@') > 0 ? route.lastIndexOf('@') : route.lastIndexOf('/');
  let returnVal = '';
  returnVal = route.slice(startIndex + 1, lastIndex)
  return returnVal;
}
