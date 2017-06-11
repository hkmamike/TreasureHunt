// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'chart.js', 'starter.controllers', 'starter.services', 'starter.DatabaseUploader', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.List', {
    url: '/List',
    views: {
      'tab_List': {
        templateUrl: 'templates/List.html',
      }
    }
  })

  //Campaign List in City
  .state('app.City', {
    url: '/List/City/:CityID',
    views: {
      'tab_City': {
        templateUrl: 'templates/City.html',
        controller: 'ListCtrl'
      }
    }
  })

  //Mission List in Campaign
  .state('app.Campaign', {
    url: '/List/City/:CityID/Campaign/:CampaignID',
    views: {
      'tab_Campaign': {
        templateUrl: 'templates/Campaign.html',
        controller: 'ListCtrl'
      }
    }
  })

  //Mission Details
  .state('app.Mission', {
    url: '/List/City/:CityID/Campaign/:CampaignID/Mission/:MissionID',
    views: {
      'tab_Mission': {
        templateUrl: 'templates/Mission.html',
        controller: 'ListCtrl'
      }
    }
  })










  .state('app.completedMissions', {
    url: '/completedMissions',
    views: {
      'tab_completedMissions': {
        templateUrl: 'templates/completedMissions.html',
      }
    }
  })


  .state('app.missionDetails', {
    url: '/missionDetails/:missionID',
    views: {
      'tab_missionDetails': {
        templateUrl: 'templates/missionDetails.html',
        // controller: 'missionDetailsCtrl'
      }
    }
  })



  .state('app.selections', {
    url: '/selections',
    views: {
      'tab_selections': {
        templateUrl: 'templates/selections.html',
      }
    }
  })

  .state('app.favourites', {
    url: '/favourites',
    views: {
      'tab_favourites': {
        templateUrl: 'templates/favourites.html',
        controller: 'TempCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile/:foodieKey',
    views: {
      'tab_profile': {
        templateUrl: 'templates/profile.html',
        // controller: 'profileCtrl'
      }
    }
  })

  .state('app.restaurant', {
    url: '/restaurant',
    views: {
      'tab_restaurant': {
        templateUrl: 'templates/restaurant.html',
        // controller: 'restaurantCtrl'
      }
    }
  })

  .state('app.test', {
    url: '/test',
    views: {
      'tab_test': {
        templateUrl: 'templates/test.html',
        // controller: 'testCtrl'
      }
    }
  })

  .state('app.article', {
    url: '/article/:articleKey',
    views: {
      'page_article': {
        templateUrl: 'templates/article.html',
        // controller: 'articleCtrl'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/List');
});
