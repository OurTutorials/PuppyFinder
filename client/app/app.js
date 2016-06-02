angular.module('puppyfinder', [
  'puppyfinder.intro',
  'puppyfinder.survey',
  'puppyfinder.result',
  'ngRoute',
  'ngMaterial',
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/intro/intro.html',
      controller: 'IntroController'
    })
    .when('/intro', {
      templateUrl: 'app/intro/intro.html',
      controller: 'IntroController'
    })
    .when('/survey', {
      templateUrl: 'app/survey/survey.html',
      controller: 'SurveyController',
    })
    .when('/result', {
      templateUrl: 'app/result/result.html',
      controller: 'ResultController'
    })
    .otherwise('/intro');
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
      index : "slide1",
      subject : "질문01 | 여행계획",
      title: "당신이 여행지에 도착했습니다. 지금은 몇월일까요?",
      content:"",
      name: "inside",
      options: [
        { value: "true", text: "네, 마당이나 뒤뜰에 공간을 마련할 수 있어요" },
        { value: "false", text: "아니오, 아늑한 실내에서 키울 거예요" }
      ]
    },

    2: {
      index : "slide2",
      subject : "질문02 | 여행계획",
      title: "당신은 이곳에서 얼마나 머물 예정인가요?",
      content: "",
      name: "single",
      options: [
        { value: "false", text: "네, 가족들과 함께 살고 있어요" },
        { value: "true", text: "아니요, 혼자 살고 있지만 충분한 애정과 관심을 줄 수 있어요!" }
      ]
    },

    3: {
      index : "slide3",
      subject : "질문03 | 비용",
      title: "당신의 주머니에 쓸 수 있는 돈이 다음과 같이 남아있습니다.",
      content: "뵹뵹",
      name: "active",
      options: [
        { value: "true", text: "네, 밖에 나가는 걸 좋아하고, 반려견과 함께 운동하고 싶어요" },
        { value: "false", text: "아니오, 집에서 조용히 쉬는 걸 좋아해요. 한다면 가끔 산책 정도?" }
      ]
    },

    4: {
      index : "slide4",
      subject : "질문04 | 생활환경",
      title: "당신은 주변을 둘러보았습니다. 어떤 풍경이 보이나요?",
      content: "",
      name: "absent",
      options: [
        { value: "true", text: "네, 제가 없는 동안 반려견이 집을 잘 지켜줬으면 좋겠어요" },
        { value: "false", text: "아니오, 집에서 반려견과 많은 시간을 함께 보낼 거예요" }
      ]
    },

    5: {
      index : "slide5",
      subject : "질문05 | 건강",
      title: "기관지가 약하거나, 알러지가 있으신가요?",
      content: "혹은 가족 구성원 중에 그런 분이 있으신가요? 모든 개는 침과 각질에 단백질이 있고, 털이 빠져 어떤 사람에게는 알레르기 반응을 일으킬 수 있습니다. 하지만 어떤 개들은 털이 적게 빠지기도 하죠. 그 외에, 집 안에서 중요한 작업을 하시거나, 옷을 많이 아끼시는 분들도 털이 적게 날리는 종을 만나셔야 할 거예요!",
      name: "allergic",
      options: [
        { value: "true", text: "네, 털이 적게 날리면 좋겠어요" },
        { value: "false", text: "아니오, 제 기관지는 아주 튼튼해요. 청소는 자주 하면 되죠, 뭐" }
      ]
    },

    6: {
      index : "slide6",
      subject : "질문06 | 성격",
      title: "활발하고 사교적인 성격? \n조용하고 차분한 성격?",
      content: "아이나 노인이 함께 반려견을 키우실 거라면 사교적인 성격의 친구가 어울려요. 혹시 불면증이 있거나, 심리적인 안정이 필요하신 분들은 묵묵히 곁에 있어주는 친구를 소개해 드릴게요. 어떤 성격의 반려견을 만나고 싶으세요?",
      name: "friendly",
      options: [
        { value: "true", text: "활발하고 사교적인 성격의 반려견이 좋아요!" },
        { value: "false", text: "조용하고 차분한 성격의 반려견이 좋겠어요" },
        { value: "dafault", text: "상관없어요" },
      ]
    },

    7: {
      index : "slide7",
      subject : "질문07 | 입양",
      title: "입양 초기에 필요한 비용을 얼마로 예상하고 계신가요?",
      content: "반려견을 입양하는 데에는 생각보다 많은 초기 비용이 필요합니다. 직접적인 입양 비용 뿐만 아니라 초기에 반려견의 건강을 위해 받아야 하는 예방 접종비, 그리고 생활에 필요한 환경을 갖추기 위해 구입해야 하는 물품들의 비용까지 고려해야 합니다. 최대 얼마 정도의 입양 비용을 예상하고 계신가요?",
      name: "initialCost",
      options: [
        { value: 10, text: "10 만원" },
        { value: 20, text: "20 만원" },
        { value: 30, text: "30 만원" },
        { value: 40, text: "40 만원" },
        { value: 50, text: "50 만원" },
        { value: 100, text: "100 만원" },
        { value: 150, text: "150 만원" },
      ]
    },

    8: {
      index : "slide8",
      subject : "질문08 | 생활환경",
      title: "한 달에 얼마 정도의 양육비용을 예상하고 계신가요?",
      content: "반려견을 키우는 일을 생각보다 꾸준하게, 예상 외의 지출을 필요로 합니다. 멋있어 보여서 대형견을 입양했다가 식비를 감당하지 못하고 파양하는 경우도 많답니다. 한 달에 평균적으로 지출하실 수 있는 양육비용을 알려 주세요.",
      name: "maintenance",
      options: [
        { value: 5, text: "5 만원" },
        { value: 10, text: "10 만원" },
        { value: 15, text: "15 만원" },
        { value: 20, text: "20 만원" },
        { value: 25, text: "25 만원" },
        { value: 30, text: "30 만원" },
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
