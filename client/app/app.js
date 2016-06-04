angular.module('puppyfinder', [
  'puppyfinder.intro',
  'puppyfinder.survey',
  'puppyfinder.result',
  'ngRoute',
  'ngMaterial',
  'fullPage.js',
  'ui.router'
])
.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'index',
      url: '/',
      templateUrl: 'app/intro/intro.html',
      controller: 'IntroController'
    })
    .state({
      name: 'intro',
      url: '/intro',
      templateUrl: 'app/intro/intro.html',
      controller: 'IntroController'
    })
    .state( {
      name: 'survey',
      url: '/survey',
      templateUrl: 'app/survey/survey.html',
      controller: 'SurveyController',
      controllerAs: 'vm'
    })
    .state({
      name: 'result',
      url: '/result',
      templateUrl: 'app/result/result.html',
      controller: 'ResultController'
    })
    .state({
      name: 'admin',
      url: '/admin',
      templateUrl: 'app/admin/admin.html'
    })
    .state({
      name: 'admin-upload',
      url: '/admin/upload',
      templateUrl: 'app/admin/upload.html',
      controller: 'UploadController'
    })
    .state({
      name: 'admin-update',
      url: 'admin-update',
      templateUrl: 'app/admin/update.html',
      controller: 'UpdateController'
    })
    .state({
      name: 'admin-remove',
      url: '/admin/remove',
      templateUrl: 'app/admin/remove.html',
      controller: 'RemoveController'
    })
    $urlRouterProvider.otherwise('survey');
})

.controller('AppController', function($window){
  /* A container for results in window scope to use in multiple apps(servey.js, result.js) */
  $window.results = [];
})

.factory('QuestionList', function() {
  /* Question list to use in survey.html */
  var questions = [];

  /* Question data is in object for maintenance */
  var question_list = {
    1: {
      subject : "질문01 | 여행계획",
      title: "당신이 여행지에 도착했습니다. 지금은 몇월일까요?",
      content:"",
      type: "inside",
      options: [
        { value: "1", text: "1월" },
        { value: "2", text: "2월" },
        { value: "3", text: "3월" },
        { value: "4", text: "4월" },
        { value: "5", text: "5월" },
        { value: "6", text: "6월" },
        { value: "7", text: "7월" },
        { value: "8", text: "8월" },
        { value: "9", text: "9월" },
        { value: "10", text: "10월" },
        { value: "11", text: "11월" },
        { value: "12", text: "12월" },
      ]
    },

    2: {
      subject : "질문02 | 여행계획",
      title: "당신은 이곳에서 얼마나 머물 예정인가요?",
      content: "",
      type: "single",
      options: [

        { value: "false", text: "하루" },
        { value: "true", text: "하루 ~ 일주일" },
        { value: "dafault", text: "일주일 ~ 한달" },
        { value: "dafault", text: "한달 ~ 여섯달" },
        { value: "dafault", text: "여섯달~" },

      ]
    },

    3: {

      index : "slide3",
      subject : "질문03 | money",
      title: "당신에게 얼마가 있나요?",
      content: "뵹뵹",
      type: "active",
      options: [

      { value: 10, text: "1 ~ 10 만원" },
        { value: 10, text: "10 ~ 30 만원" },
        { value: 30, text: "30 ~ 70 만원" },
        { value: 100, text: "70 ~ 200 만원" },
        { value: 100, text: "200~ 만원" },

      ]
    },

    4: {
      subject : "질문04 | 생활환경",
      title: "당신은 주변을 둘러보았습니다. 어떤 풍경이 보이나요?",
      content: "",
      type: "season",
      options: [
        { value: "true", text: "봄" },
        { value: "false", text: "여름" },
        { value: "dafault", text: "가을" },
        { value: "dafault", text: "겨울" },
        { value: "dafault", text: "상관없음" },
      ]

    },

    5: {
      subject : "질문05 | food",
      title: "배가고파 음식점에 들어왔습니다. 음식을 주문해 주세요.",
      content: "",
      name: "allergic",
      options: [
        { value: "true", text: "한식" },
        { value: "false", text: "중식" },
        { value: "dafault", text: "일식" },
        { value: "dafault", text: "양식" },
        { value: "dafault", text: "상관없음" },

      ]
    },

    6: {
      subject : "질문06 | activity",
      title: "배도부르고 관광을 하려고 합니다. 어떤 활동을 하고싶나요?",
      content: "",
      name: "friendly",
      options: [
        { value: "true", text: "멈춤" },
        { value: "false", text: "움직" },
        { value: "dafault", text: "천천" },
        { value: "dafault", text: "천천" },
        { value: "dafault", text: "천천" },
      ]
    }
  };

  for (var question in question_list) {
    questions.push(question_list[question]);
  }

  return ({
    questions: questions
  });
})

/* Methods to get related contents in result.html */
.factory('RelatedContents', function($http){
  /* Get video list json related to the breed in result from Youtube */
  var getYoutube = function(query){
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search?'+
      'part=' + 'snippet' +
      '&key=' + 'AIzaSyBRXCXvGfojUxaVxBYannVo38Vzgj5W_fs' +
      '&q=' + query +' 개'+
      '&maxResults=' + 12 +
      '&type=' + 'video' +
      '&videoEmbeddable=' + 'true'
    })
    .then(function(resp){
      return resp.data.items;
    }, function(err){
      if(err){
        console.error(err);
      }
    });
  };

  /*
   * Get photo list json related to the breed in result from Instagram.
   * Failed due to Instagram's permission policy.
   */
  // var getInstagram = function(hashtag){
  //   return $http({
  //     method: 'GET',
  //     url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent' +
  //     '?client_id=' + '642176ece1e7445e99244cec26f4de1f&',
  //   })
  //   .then(function(resp){
  //     console.log(resp);
  //     return resp;
  //   }, function(err){
  //     if(err) return err;
  //   });
  // };

  /* Get video list json related to the breed in result from Youtube */
  var getDaum = function(query){
    var data = {
      q: query,
    };

    return $http({
      method: 'GET',
      url: '/daum',
      params: data,
    })
    .then(function(resp){
      return resp;
    }, function(err){
      if(err){
        console.error(err);
      }
    });
  };

  return({
    getYoutube: getYoutube,
    getDaum: getDaum,
  });
})
.factory('getData', function($http) {
  //get intial data from server.
  var init = () => $http({
    method:'GET',
    url: '/data',
  })
  .then(res => {
    return res
  })
  .catch(e => console.log(e))

  return({
    init
  })
})
/* Method to request for a survey result */
.factory('Result', function($http){
  var getResults = function(data){
    return $http({
      method: 'GET',
      url: '/search',
      params: data,
    })
    .then(function(resp) {
      return resp;
    }, function(err){
      if(err) {
        console.error(err);
      }
    });
  };

  return({
    getResults: getResults,
  });
});
