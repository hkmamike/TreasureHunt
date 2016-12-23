angular.module('starter.controllers', [])

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//Login page controller
.controller('LoginCtrl', function($scope, $state, userData) {

  $scope.authPopup = function () {
    auth.signInWithRedirect(provider);
  };

  firebase.auth().getRedirectResult().then(function(result) {
    //if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //this firebase code doesn't work
      //token = result.credential.accessToken;
    //}

    //register the signed-in user info
    userData.setUser(auth.currentUser);

    //for testing only
    console.log('uid is', userData.getUser().uid);

    //redirect back to home page
    $state.go('tab.restaurants');

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

})

//New Article page controller
.controller('newArticleCtrl', function($scope, $state, userData, articles) {

  $scope.pushArticle = function (article) {
    console.log('pushArticle was clicked', article);
    articles.saveArticle(article);
  };

})

//Articles page controller
.controller('articlesCtrl', function($scope, articles, userData) {

  $scope.articles = articles.all();

  //so articles page has access to user data
  $scope.user = userData.getUser();

  $scope.remove = function(articles) {
    articles.remove(articles);
  };

  $scope.bookmark = function(articles) {
    articles.bookmark(articles);
  };

  $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})


.controller('ProfileCtrl', function($scope, Articles, userData, $stateParams, $ionicSlideBoxDelegate) {

//Profile page controller
.controller('ProfileCtrl', function($scope, articles, userData) {

  $scope.articles = articles.all();

  //so articles page has access to user data
  $scope.user = userData.getUser();

  $scope.remove = function(articles) {
    articles.remove(articles);
  };

  $scope.bookmark = function(articles) {
    articles.bookmark(articles);
  };

  $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.slide = function(to) {
        $scope.current = to;
        $ionicSlideBoxDelegate.slide(to);
  };
})

//Restaurants page controller

.controller('RestaurantsCtrl', function($scope, restaurants, userData) {

  //this gives articles page access to user data
  $scope.user = userData.getUser();

  $scope.restaurants = restaurants.all();
  $scope.remove = function(restaurant) {
    restaurants.remove(restaurant);
  };
})

.controller('RestaurantDetailCtrl', function($scope, $stateParams, restaurants) {
  $scope.restaurant = restaurants.get($stateParams.restaurantId);
})

.controller('FavouritesCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
