angular.module('starter.controllers', [])


.controller('AppCtrl', function($q, $scope, $ionicModal, $ionicPopover, $ionicScrollDelegate, $timeout, foodies, articles, $ionicSideMenuDelegate, userData) {

  firebase.auth().onAuthStateChanged(function () {
    currentUserID = userData.getUser().uid;
    console.log('currentUserID: ', currentUserID);

    $scope.user = foodies.getFoodie(currentUserID);
    $scope.articles = articles.all();

    console.log($scope.user);
  });

  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  // Expand Card ---------------------------------------------------------------------
  // $scope.toggleGroup = function(group) {
  //   if ($scope.isGroupShown(group)) {
  //     $scope.shownGroup = null;
  //   } else {
  //     $scope.shownGroup = group;
  //   }
  // };
  // $scope.isGroupShown = function(group) {
  //   return $scope.shownGroup === group;
  // };
  // ---------------------------------------------------------------------------------

  
  // PopOver vote---------------------------------------------------------------------
  $ionicPopover.fromTemplateUrl('templates/vote.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.vote = popover;
  });

  $scope.closevote = function() {
    $scope.vote.hide();
  };

  $scope.openevote = function() {
    $scope.vote.show();
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
    var uid = userData.getUser().uid;
    var userName = userData.getUser().displayName;
    console.log('uid is', uid);
    console.log('userName', userName);
    foodies.createFoodie();
    // console.log('CREATEFoodie: ', foodies.createFoodie());




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
  $scope.openNewArticle = function(article) {
    $scope.newArticle.show();
  };

  $scope.pushArticle = function (article) {
    submitPromise = new Promise(function(resolve, reject){
      console.log('new article posted', article);
      articles.saveArticleWithImage(article);
      resolve(article);
    });

    submitPromise.then(function(article){
      article.name = "";
      article.restaurantName = "";
      article.location = "";
      article.type = "";
      article.contents = "";
      article.image = null;
      console.log('here');
    });
  };

  // ---------------------------------------------------------------------------------


 
  // ScrollCheck (for function to auto close article after overscroll)---------------------------------------------------------------------
  $scope.checkScroll = function () {
 
        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxScrollableDistanceFromTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;
 
        if (currentTop >= maxScrollableDistanceFromTop)
        {
          closearticle();
        }
    };
  // For Sharing (to develop---------------------------------------------------------------------------------
  

     $scope.shareViaFacebook = function() {
        $cordovaSocialSharing.canShareVia("facebook", message, logo, url).then(function(result) {
             $cordovaSocialSharing.shareViaFacebook(message, logo, url);
         }, function(error) {
              alert(error);
         });
     };


})

//Favourite page controller
.controller('favouriteCtrl', function($scope, articles, userData) {
})


//Selections page controller
.controller('selectionsCtrl', function($scope, articles, userData) {
})

//Activities page controller
.controller('activitiesCtrl', function($scope, articles, foodies, userData) {
  
  $scope.getSelectedArticleFoodieInfo = function(foodieID){
    return foodies.getFoodieInfo(foodieID);
  };

  $scope.bookmarkArticle = function(articleKey){
    articles.bookmarkArticle(articleKey);
  };

  $scope.isBookmarkArticle = function(articleKey){
    isBookmarked = articles.isBookmarkArticle(articleKey);
    console.log('scope isBookmarked' , isBookmarked);
    return isBookmarked;
  };

  $scope.isBookmarkArticle2 = function(articleKey){
      var uid = userData.getUser().uid;
      var firebaseRef = firebase.database().ref('/users/' + uid + '/bookmark/');
      console.log('firebaseRef', '/users/' + uid + '/bookmark/');

      var isBookmarked = firebaseRef.once("value", function(snapshot) {
        var isExistArticle = snapshot.child(articleKey).exists();
        console.log('isExistArticle', isExistArticle);
        return isExistArticle;
      });

      var promise = new Promise(function(resolve, reject){

        var k = firebaseRef.once("value", function(snapshot) {
          var isExistArticle = snapshot.child(articleKey).exists();
          console.log('isExistArticle', isExistArticle);
          return isExistArticle;
        });

        if(k){
          resolve(k)
          console.log(k);
        }
        else{
          reject(error("broken"));
        }

      });

      promise.then(function(result){
        console.log('promise' , result);
        console.log('promise k ' , k);
      });
      console.log('isBookmarked 2', isBookmarked);
  };



  $scope.isBookmarkArticlePromise = function(articleKey){
      var uid = userData.getUser().uid;
      var firebaseRef = firebase.database().ref('/users/' + uid + '/bookmark/');
      console.log('firebaseRef', '/users/' + uid + '/bookmark/');

      var x;

      conditional = firebaseRef.once("value").then(function(snapshot) {
        var isExistArticle = snapshot.child(articleKey).exists();
        console.log('isExistArticle', isExistArticle);
        return isExistArticle;
      });

      conditional.then(function(value){
        console.log('value is: ',value);
        x = value.toString();
        console.log('value is:',x);

        return 'hello';
      });

  };




})

//Restaurant page controller
.controller('restaurantCtrl', function($scope,articles, userData) {
})

//Article page Controller
.controller('articleCtrl', function($scope, $timeout, $stateParams, articles, userData, foodies, $firebaseObject, $firebaseArray) {

  $scope.selectedArticle = articles.getArticle($stateParams.articleKey);
  console.log('selectedArticle: ', $scope.selectedArticle);


  $scope.selectedArticleImgs = articles.dataPath($stateParams.articleKey + '/articleImgs');
  console.log('selectedArticleImgs: ', $scope.selectedArticleImgs);

  // $scope.selectedArticleFoodie2 = articles.getArticleAuthor($stateParams.articleKey)
  // console.log('selectedArticleFoodie2: ', $scope.selectedArticleFoodie2);

  articles.getArticleAuthor($stateParams.articleKey).then(function(value){
     $scope.selectedArticleFoodie = value;
     console.log('selectedArticleFoodie: ', $scope.selectedArticleFoodie);
  });

  $scope.getSelectedArticleFoodieInfo = function(foodieID){
    foodieInfo = foodies.dataPath(foodieID +'/Info/');
    return foodieInfo;
  };




})

//Test page controller
.controller('testCtrl', function($scope, articles, userData) {
})

//Test2 page controller
.controller('test2Ctrl', function($scope, articles, foodies, userData) {
  $scope.allFoodies = foodies.allFoodie();
})

//Login page controller
.controller('loginCtrl', function($scope, articles, userData, foodies) {
})


//Profile page controller
.controller('profileCtrl', function($scope, articles, userData, $stateParams, foodies, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
      
    $scope.selectedFoodie = foodies.getFoodie($stateParams.foodieKey);
    console.log('Selected Foodie: ', $scope.selectedFoodie);

    //Slide
    $scope.slide = function(to) {
        $scope.current = to;
        $ionicSlideBoxDelegate.slide(to);
    };

    //Scroll
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };

  // --------------------- Pie Chart Configuration -----------------------------
  $scope.pieLabels = ["Western Food", "Chinese Food", "Healthy Food"];
  $scope.pieData = [300, 500, 100];

  // --------------------- Line Chart Configuration ----------------------------
  $scope.lineSeries = ['Active', 'Inactive'];
  $scope.lineLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.lineData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

})

//Experimental directive built for file upload with ng-model
.directive('appFilereader', function($q) {
  var slice = Array.prototype.slice;

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return;

      ngModel.$render = function() {};

      element.bind('change', function(e) {
        var element = e.target;

        $q.all(slice.call(element.files, 0).map(readFile))
            .then(function(values) {
                if (element.multiple) ngModel.$setViewValue(values);
                else ngModel.$setViewValue(values.length ? values[0] : null);
            });

        function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function(e) {
                deferred.resolve(e.target.result);
            };
            reader.onerror = function(e) {
                deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
        }

      });

    }
  };
})


;