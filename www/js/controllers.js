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
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.login = modal;
  });

  $scope.closeLogin = function() {
    $scope.login.hide();
  };

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
  $ionicModal.fromTemplateUrl('templates/newArticle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.newArticle = modal;
  });

  $scope.closeNewArticle = function() {
    $scope.newArticle.hide();
  };

  $scope.openNewArticle = function(article) {
    $scope.articleInput = {};
    $scope.newArticle.show();
  };

  $scope.pushArticle = function (article) {
    articles.saveArticleWithImage(article);
  };

  $scope.tempImage = function (article) {
    articles.tempImage(article);
  };

  $scope.pushArticle = function (article) {
    console.log('new article posted', article);

    var submitFinished = false;

    articles.saveArticleWithImage(article).then(function(article){
      article.name = "";
      article.restaurantName = "";
      article.location = "";
      article.type = "";
      article.contents = "";
      article.image = null;
      console.log(Date.now());
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

  // firebase.auth().onAuthStateChanged(function () {
  //   $scope.favouriteArticle = userData.dataPath('bookmark');
  //   console.log('favouriteArticle: ', $scope.favouriteArticle);
  // });
    
    $scope.getArticlebyKey = function(articleKey){
      console.log('articleKey',articleKey);
      return articles.dataPath(articleKey);
    };


})


//Selections page controller
.controller('selectionsCtrl', function($scope, articles, userData) {
})

//Activities page controller
.controller('activitiesCtrl', function($q, $scope, articles, foodies, userData) {

  $scope.getBookmarkCount= function(articleKey) {
   console.log('articleKey',articleKey);
   var def = $q.defer();
   firebase.database().ref('/posts/'+ articleKey + '/bookmark/').once('value', function(snapshot) {
      var totalCount = snapshot.numChildren();
      def.resolve(totalCount);
   });
   console.log('getBookmarkCount',def.promise, def.promise.$$state.value);
   return def.promise.$$state.value;
  };

  $scope.getScore= function(articleKey) {

   console.log('articleKey',articleKey);
   var defup = $q.defer();
   firebase.database().ref('/posts/'+ articleKey + '/rate/up/').on('value', function(snapshot) {
      var totalCount = snapshot.numChildren();
      defup.resolve(totalCount);
   });
   var defdown = $q.defer();
   firebase.database().ref('/posts/'+ articleKey + '/rate/down/').on('value', function(snapshot) {
      var totalCount = snapshot.numChildren();
      defdown.resolve(totalCount);
   });

  var upCount = defup.promise.$$state.value;
  var downCount = defdown.promise.$$state.value;
  if (upCount != upCount){upCount=0;}
  if (downCount != downCount){downCount=0;}
  var totalScole = upCount/(upCount+downCount);
  if (totalScole != totalScole){totalScole=0;}

  return totalScole;
  };


  $scope.getSelectedArticleFoodieInfo = function(foodieID){
    return foodies.getFoodieInfo(foodieID);
  };

  $scope.bookmarkArticle = function(articleKey, bookmark){
      articles.bookmarkArticle(articleKey, bookmark);
  };

  $scope.isBookmarkArticle = function(articleKey){
    return articles.isBookmarkArticle(articleKey);
    // console.log('scope isBookmarked' , isBookmarked); 
  };

  $scope.rateArticle = function(articleKey, rate){
    // console.log('scope isRated' , articleKey, rate)
    articles.rateArticle(articleKey, rate);
  };

  $scope.isRateArticle = function(articleKey){
    return articles.isRateArticle(articleKey);
  };



  $scope.countChildd = function(path){



  // var k = firebase.database().ref('/users/').once("value").then(function(snapshot) {
  //   return snapshot.numChildren(); // 1 ("name")
  // });

  // return console.log(k);

  // a.once("value").then(function () {
  //   $scope.countChildren = a;
  //   console.log(a);    
  // });


    // var getTotalCount = {};


    // console.log(getTotalCount);
    // return getTotalCount;

  };

  $scope.countBookmark = function(articleKey) {
      return 56;
  };

  $scope.articleScole = function(articleKey) {
      return 99 ;
  };

  // $scope.isRateUpArticle = function(articleKey){
  //   return articles.isRateUpArticle(articleKey);
  //   console.log('scope isRated' , isRated); 
  // };

  // $scope.isRateDownArticle = function(articleKey){
  //   return articles.isRateDownArticle(articleKey);
  //   console.log('scope isRated' , isRated); 
  // };

})

//Restaurant page controller
.controller('restaurantCtrl', function($scope,articles, userData) {
})

//Article page Controller
.controller('articleCtrl', function($scope, $timeout, $stateParams, articles, userData, foodies, $firebaseObject, $firebaseArray) {

  $scope.selectedArticle = articles.getArticle($stateParams.articleKey);
  console.log('selectedArticle: ', $scope.selectedArticle);


  $scope.selectedArticleImgs = articles.dataPath($stateParams.articleKey + '/coverImage/');
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