angular.module('puppyfinder.survey', [])

.controller('SurveyController', SurveyController);


SurveyController.$inject = ['$scope', '$window', '$location', 'QuestionList', 'Result' ,'$compile','getData']


function SurveyController($scope, $window, $location, QuestionList, Result, $compile, getData) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
  $scope.questions = QuestionList.questions;
  $scope.questionIndex = 0;
  $scope.answer = {};

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
    // dummy photodata for css set
    // $scope.photos = [];
    // for(let tour of tourSites ) {
    //     for(let ph of tour.seasonPhotos) {
    //       if(ph.month=== 3) {
    //         $scope.photos.push(ph.img)
    //       }
    //     }
    // } 

    // if($scope.photos.length>1){
    //   console.log($scope.photos.length )
    //   $('.question_card').removeClass('nophoto');
    //   $('.question_card').addClass('photo');
    // }
  });




  //this function make 'next' button able when radio is chosen.(다음 질문 버튼을 able하게 하는 함수.)
  $scope.ableButton = function(value) {
      $scope.answer[$scope.type] = value;
      $('button').removeAttr('disabled');
      if($scope.questionIndex===5){
        $('.md-button').removeAttr('disabled');
      }
  }




  //'다음'버튼을 눌렀을때 다음으로 이동하도록 해 주는 버튼에 묶여있는 함수.
  $scope.nextquestion = function() {
    console.log('현재 입력된 데이터 : ', $scope.answer)
    //increase index of question when it is smaller than 5.
    if($scope.questionIndex<5){
      $scope.questionIndex++;
      $('button').attr('disabled','true');
      if($scope.questionIndex===5) {
        $('button').css('display','none');
        $('.md-button').css('display','');
        $('#menu').css('display','none');
        // $('.md-button').removeAttr('disabled');
      }
    }else{

    //change button when last question.

    
    }
   
    const question = questions[$scope.questionIndex];
    for(let key in question) {
      $scope[key] = question[key];
    }

    if($scope.type ==='season') {
      $scope.photos = [];
      for(let tourSite of tourSites ) {
        for(let photo of tourSite.seasonPhotos) {
          if(photo.month=== parseInt($scope.answer['month'])) {
            $scope.photos.push(photo.img)
          }
        }
      }
    }
    if($scope.type === 'food') {
      $scope.photos = [];
       for(let tourSite of tourSites ) {
         for(let photo of tourSite.foodPhotos) {
             $scope.photos.push(photo)
         }
       }
    }
    if($scope.type ==='activity') {
      let myAct = ['food','gambling','hiking','landmark','music','shopping','sightseeing','traditional','waterSports']
      $scope.photos = [];
      for(let act of myAct ) {
        $scope.photos.push('assets/activity/'+act+'.png');
      }
    }

    if(Object.keys($scope.answer).length>1){
      $('.question_card').removeClass('nophoto');
      $('.question_card').addClass('photo');
    }
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
