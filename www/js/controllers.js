angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, articles, userData) {

  $scope.user = userData.getUser();
  $scope.articles = articles.all();

  // Expand Card ---------------------------------------------------------------------
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
  // ---------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.login = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.login.hide();
  };

  // Open the login modal
  $scope.openlogin = function() {
    $scope.login.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  // ---------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------
  // Form data for the New Article modal

  // Create the New Article modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newArticle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.newArticle = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeNewArticle = function() {
    $scope.newArticle.hide();
  };

  // Open the login modal
  $scope.openNewArticle = function() {
    $scope.newArticle.show();
  };

  $scope.pushArticle = function (article) {
    console.log('new article posted', article);
    articles.saveArticle(article);

    //clearing ng-model values after submit
    article.name = "";
    article.location = "";
    article.type = "";
    article.details = "";
    article.rating = "";
  };

  // Perform the login action when the user submits the login form
  //$scope.submitnewarticle = function() {
  // console.log('Doing login', $scope.loginData);
  //
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  //  $timeout(function() {
  //    $scope.closeLogin();
  //  }, 1000);
  //};
  // ---------------------------------------------------------------------------------
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


//Favourite page controller
.controller('favouriteCtrl', function($scope, articles, userData) {

})


//Selections page controller
.controller('selectionsCtrl', function($scope, articles, userData) {

})

//Activities page controller
.controller('activitiesCtrl', function($scope, articles, userData) {


})


//Login page controller
.controller('loginCtrl', function($scope, articles, userData) {

    $scope.authPopup = function () {
    auth.signInWithRedirect(provider);
    };

    firebase.auth().getRedirectResult().then(function(result) {
    //if (result.credential) {
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


//Profile page controller
.controller('profileCtrl', function($scope, articles, userData, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

    //Slide
    $scope.slide = function(to) {
        $scope.current = to;
        $ionicSlideBoxDelegate.slide(to);
    };

    //Scroll
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };

})

;