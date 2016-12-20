angular.module('starter.controllers', [])

//Login page controller to be added
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

    // The signed-in user info
    userData.setUser(auth.currentUser);
    console.log(userData.getUser().displayName);
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

.controller('ArticlesCtrl', function($scope, Articles, userData) {

//Foodie Articles

  $scope.Articles = Articles.all();

  //so Articles page has access to user data
  $scope.user = userData.getUser();

  $scope.remove = function(Articles) {
    Articles.remove(Articles);
  };

  $scope.bookmark = function(Articles) {
    Articles.bookmark(Articles);
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

//Foodie Profile

  $scope.Articles = Articles.all();

  //so Articles page has access to user data
  $scope.user = userData.getUser();

  $scope.remove = function(Articles) {
    Articles.remove(Articles);
  };

  $scope.bookmark = function(Articles) {
    Articles.bookmark(Articles);
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
  }
})



.controller('RestaurantsCtrl', function($scope, restaurants, userData) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //so Articles page has access to user data
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
