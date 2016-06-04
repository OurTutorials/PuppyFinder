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
    $urlRouterProvider.when('/:fullpage', '/survey')
    $urlRouterProvider.otherwise('intro');
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
      subject : "질문01 | month",
      title: "당신이 여행지에 도착했습니다. 지금은 몇월일까요?",
      type: "month",
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
      subject : "질문02 | day",
      title: "당신은 이곳에서 얼마나 머물 예정인가요?",
      type: "day",
      options: [
        { value: 1, text: "1일" },
        { value: 7, text: "1일 ~ 7일" },
        { value: 30, text: "7일~ 30일" },
        { value: 180, text: "30일 ~ 180일" },
        { value: 200, text: "180일 ~" },

      ]
    },

    3: {

      index : "slide3",
      subject : "질문03 | money",
      title: "여행에 얼마를 쓰실 건가요?",
      type: "money",
      options: [
      { value: 10, text: "1 ~ 10 만원" },
        { value: 30, text: "10 ~ 30 만원" },
        { value: 70, text: "30 ~ 70 만원" },
        { value: 200, text: "70 ~ 200 만원" },
        { value: 300, text: "200~ 만원" },
      ]
    },

    4: {
      subject : "질문04 | 생활환경",
<<<<<<< e5ca9c1aa68f0c40bfe42618af9d2bcccc6d6761
      title: "당신은 주변을 둘러보았습니다. 어떤 풍경이 보이나요?",
=======
      title: "당신의 주변에 어떤 풍경이 보이나요?",
      content: "",
>>>>>>> hotCSS
      type: "season",
    },
    5: {
      subject : "질문05 | food",
<<<<<<< e5ca9c1aa68f0c40bfe42618af9d2bcccc6d6761
      title: "배가고파 음식점에 들어왔습니다. 음식을 주문해 주세요.",
=======
      title: "어떤 음식이 가장 먹고싶나요?",
      content: "",
>>>>>>> hotCSS
      name: "allergic",
      type: "food",
    },

    6: {
      subject : "질문06 | activity",
<<<<<<< e5ca9c1aa68f0c40bfe42618af9d2bcccc6d6761
      title: "배도부르고 관광을 하려고 합니다. 어떤 활동을 하고싶나요?",
=======
      title: "관광을 하려고 합니다. 어떤 활동을 하고싶나요?",
      content: "",
>>>>>>> hotCSS
      name: "friendly",
      type: "activity",
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
