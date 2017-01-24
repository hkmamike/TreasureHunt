// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'chart.js', 'starter.controllers', 'starter.services', 'firebase'])

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

  .state('app.activities', {
    url: '/activities',
    views: {
      'tab_activities': {
        templateUrl: 'templates/activities.html',
        controller: 'activitiesCtrl'
      }
    }
  })

  .state('app.selections', {
    url: '/selections',
    views: {
      'tab_selections': {
        templateUrl: 'templates/selections.html',
        controller: 'selectionsCtrl'
      }
    }
  })

  .state('app.favourites', {
    url: '/favourites',
    views: {
      'tab_favourites': {
        templateUrl: 'templates/favourites.html',
        //controller: 'selectionsCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'tab_profile': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('app.restaurant', {
    url: '/restaurant',
    views: {
      'tab_restaurant': {
        templateUrl: 'templates/restaurant.html',
        controller: 'restaurantCtrl'
      }
    }
  })

  .state('app.test', {
    url: '/test',
    views: {
      'tab_test': {
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
      }
    }
  })

  .state('app.test2', {
    url: '/test2',
    views: {
      'tab_test2': {
        templateUrl: 'templates/test2.html',
        controller: 'testCtrl'
      }
    }
  })

  .state('app.article', {
    //url: '/1',
    url: '/article/:articleKey',
    views: {
      'page_article': {
        templateUrl: 'templates/article.html',
        controller: 'articleCtrl'
      }
    }
  })


//-----------------------------------------------------------------------------

  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/activities');
});
