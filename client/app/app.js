angular.module('puppyfinder', [
    'intro',
    'survey',
    'result',
    'ngRoute',
    'ngMaterial',
    'fullPage.js',
    'ui.router'
  ])
  .config(function($stateProvider, $httpProvider, $urlRouterProvider) {
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
      .state({
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

.controller('AppController', function($window) {
  /* A container for results in window scope to use in multiple apps(servey.js, result.js) */
  $window.results = [];
})

.factory('QuestionList', function() {
  /* Question list to use in survey.html */
  const questions = [];

  /* Question data is in object for maintenance */
  const question_list = {
    1: {
      subject: "질문01 | 여행계획",
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
      subject: "질문02 | 여행계획",
      title: "당신은 이곳에서 얼마나 머물 예정인가요?",
      type: "day",
      options: [
        { value: 1, text: "1박 2일" },
        { value: 4, text: "4박 5일" },
        { value: 7, text: "7박 8일" },
        { value: 14, text: "14박 15일" },
        { value: 30, text: "30일 ~" },

      ]
    },

    3: {

      index: "slide3",
      subject: "질문03 | money",
      title: "여행에 얼마를 쓰실 건가요?",
      type: "money",
      options: [
        { value: 750000, text: "50 ~ 100 만원" },
        { value: 2000000, text: "100 ~ 300 만원" },
        { value: 4000000, text: "300 ~ 500 만원" },
        { value: 6000000, text: "500 ~ 700 만원" },
        { value: 11000000, text: "700~ 1500 만원" },
      ]
    },

    4: {
      subject: "질문04 | 생활환경",
      title: "당신은 주변을 둘러보았습니다. 어떤 풍경이 보이나요?",
      type: "season",
    },
    5: {
      subject: "질문05 | food",
      title: "배가고파 음식점에 들어왔습니다. 음식을 주문해 주세요.",
      type: "food",
    },

    6: {
      subject: "질문06 | activity",
      title: "배도부르고 관광을 하려고 합니다. 어떤 활동을 하고싶나요?",
      type: "activity",
    }
  };

  for (let question in question_list) {
    questions.push(question_list[question]);
  }

  return ({
    questions: questions
  });
})

/* Methods to get related contents in result.html */
.factory('RelatedContents', function($http) {
    /* Get video list json related to the breed in result from Youtube */
    const getYoutube = function(query) {
      return $http({
          method: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search?' +
            'part=' + 'snippet' +
            '&key=' + 'AIzaSyBRXCXvGfojUxaVxBYannVo38Vzgj5W_fs' +
            '&q=' + query + ' 개' +
            '&maxResults=' + 12 +
            '&type=' + 'video' +
            '&videoEmbeddable=' + 'true'
        })
        .then(function(resp) {
          return resp.data.items;
        }, function(err) {
          if (err) {
            console.error(err);
          }
        });
    };

    /* Get video list json related to the breed in result from Youtube */
    const getDaum = function(query) {
      const data = {
        q: query,
      };

      return $http({
          method: 'GET',
          url: '/daum',
          params: data,
        })
        .then(function(resp) {
          return resp;
        }, function(err) {
          if (err) {
            console.error(err);
          }
        });
    };

    return ({
      getYoutube: getYoutube,
      getDaum: getDaum,
    });
  })
  .factory('getData', function($http) {
    //get intial data from server.
    const init = () => $http({
        method: 'GET',
        url: '/data',
      })
      .then(res => {
        return res
      })
      .catch(e => console.log(e))

    return ({
      init
    })
  })
  /* Method to request for a survey result */
  .factory('Result', function($http) {
    const getResults = function(data) {
      return $http({
          method: 'GET',
          url: '/search',
          params: data,
        })
        .then(function(resp) {
          return resp;
        }, function(err) {
          if (err) {
            console.error(err);
          }
        });
    };

    return ({
      getResults: getResults,
    });
  });
