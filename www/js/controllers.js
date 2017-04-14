angular.module('starter.controllers', [])


.controller('TempCtrl', function($scope, $stateParams, $firebaseObject, userData) {

    $scope.updateDatabase=function(){
 
      var missionToken = {1:"AAA", 2:"BBB", 3:"CCC"};
      var mission1 = {
          missionID: "X1001ABC",
          missionCover: "http://www.discoverhongkong.com/eng/images/see-do/highlight-attractions/large/1.1.1.2-Peak_03.jpg",
          missionToken: missionToken,
          missionLocation: "The Peak",
          missionInfo: "This is The Peak, This is The Peak, This is The Peak <br> This is The Peak, This is The Peak, This is The Peak",
      };

      var missionToken = {1:"DDD", 2:"EEE", 3:"FFF"};
      var mission2 = {
          missionID: "X1002DEF",
          missionCover: "http://www.discoverhongkong.com/eng/images/see-do/highlight-attractions/large/1.1.1.2-Peak_03.jpg",
          missionToken: missionToken,
          missionLocation: "Avenue of Star",
          missionInfo: "This is Avenue of Star, This is Avenue of Star, This is Avenue of Star <br> This is Avenue of Star, This is Avenue of Star, This is Avenue of Star",
      };

      var missionToken = {1:"GGG", 2:"HHH", 3:"III"};
      var mission3 = {
          missionID: "X1003GHI",
          missionCover: "http://www.discoverhongkong.com/eng/images/see-do/highlight-attractions/large/1.1.1.2-Peak_03.jpg",
          missionToken: missionToken,
          missionLocation: "Temple Street",
          missionInfo: "This is Temple Street, This is Temple Street, This is Temple Street",
      };

      var missionToken = {1:"JJJ", 2:"KKK", 3:"LLL"};
      var mission4 = {
          missionID: "X1004JKL",
          missionCover: "http://www.discoverhongkong.com/eng/images/see-do/highlight-attractions/large/1.1.1.2-Peak_03.jpg",
          missionToken: missionToken,
          missionLocation: "History Museum",
          missionInfo: "This is History Museum, This is History Museum, This is History Museum",
      };

      var missions = {
          X1001ABC: mission1, 
          X1002DEF: mission2, 
          X1003GHI: mission3, 
          X1004JKL: mission4}

      var tokenClaimed = {1:"AAA"}
      var userMission1 = {
          missionStatus: "Completed",
          missionID: "X1001ABC",
          startTime: "09:30am",
          endTime: "10:00am",
          friendSaved: 3,
          tokenClaimed: tokenClaimed
      };      

      var tokenClaimed = {1:"DDD",2:"FFF"};
      var userMission2 = {
          missionStatus: "Completed",
          missionID: "X1002DEF",
          startTime: "10:00am",
          endTime: "11:15am",
          friendSaved: 10,
          tokenClaimed: tokenClaimed
      };      

      var tokenClaimed = {1:"GGG",2:"HHH"};;
      var userMission3 = {
          missionStatus: "Current",
          missionID: "X1003GHI",
          friendSaved: 2,
          startTime: "11:15am",
          endTime: 0,
          tokenClaimed: tokenClaimed
      };      

      var tokenClaimed = null;
      var userMission4 = {
          missionStatus: "Pending",
          missionID: "X1004JKL",
          friendSaved: 0,
          startTime: 0,
          endTime: 0,
          tokenClaimed: tokenClaimed
      };     

      var userMissions = {
          X1001ABC: userMission1, 
          X1002DEF: userMission2, 
          X1003GHI: userMission3, 
          X1004JKL: userMission4}

      var updates = {};
      updates['/missions/'] = missions;
      updates['/users/' + currentUserID + '/missionList/' ] = userMissions;      
      return firebase.database().ref().update(updates);
      }
})


.controller('missionDetailsCtrl', function($scope, $stateParams, $firebaseObject, userData) {
  $scope.missionID = $stateParams.missionID;
})



.controller('AppCtrl', function($q, $scope, $ionicModal, $firebaseObject, $ionicPopover, $ionicScrollDelegate, $timeout, foodies, articles, tokens, $ionicSideMenuDelegate, userData) {

  firebase.auth().onAuthStateChanged(function () {
    
    currentUserID = userData.getUser().uid;
    $scope.user = $firebaseObject(firebase.database().ref('/users/' + currentUserID));

    // firebase.database().ref('/users/'+ currentUserID + '/missionList/').orderByChild("missionStatus").equalTo("Current").on("value", function(snapshot) {
    // $scope.missionCurrent = snapshot.val() 
    // });

    // firebase.database().ref('/users/'+ currentUserID + '/missionList/').orderByChild("missionStatus").equalTo("Pending").on("value", function(snapshot) {
    // $scope.missionPending = snapshot.val() 
    // });

    // firebase.database().ref('/users/'+ currentUserID + '/missionList/').orderByChild("missionStatus").equalTo("Completed").on("value", function(snapshot) {
    // $scope.missionCompleted = snapshot.val() 
    // });

    $scope.getTokenClaimed= function(missionID) {
      var tokenID = $q.defer();
      firebase.database().ref('/users/'+ currentUserID + '/tokenClaimed/').orderByValue().equalTo(missionID).on('value', function(snapshot) {
        tokenID.resolve(snapshot.val());
      });
      return tokenID.promise.$$state.value;
    };

    $scope.getTokenClaimedNumber= function(missionID) {
      var tokenCount = $q.defer();
      firebase.database().ref('/users/'+ currentUserID + '/tokenClaimed/').orderByValue().equalTo(missionID).on('value', function(snapshot) {
        tokenCount.resolve(snapshot.numChildren());
      });
      return tokenCount.promise.$$state.value;
    };

    $scope.getTokenClaimedStatus= function(tokenID) {
      var tokenStatus = $q.defer();
      firebase.database().ref('/users/'+ currentUserID + '/tokenClaimed/').orderByKey().equalTo(tokenID).on('value', function(snapshot) {
        tokenStatus.resolve(snapshot.numChildren());
      });
      return tokenStatus.promise.$$state.value===1;
    };

  });

  $scope.getMissionInfo = function (missionID) {
    return $firebaseObject(firebase.database().ref('/missions/' + missionID));
  };

  $scope.getTokenInfo = function (tokenID) {
    return $firebaseObject(firebase.database().ref('/tokens/' + tokenID));
  };


  // $scope.getTokenList = function (missionID) {
  //     var tokenList = $q.defer();
  //     firebase.database().ref('/tokens/').orderByChild("missionID").equalTo(missionID).on('value', function(snapshot) {
  //       tokenList.resolve(snapshot.val());
  //     });
  //     return tokenList.promise.$$state.value;
  // };

  // ---------------------------------------------------------------------------------
  // Treasure Hunt Stuff

  $scope.toggleInfo = function(info) {
    if ($scope.isInfoShown(info)) {
      $scope.shownInfo = null;
    } else {
      $scope.shownInfo = info;
    }
  };

  $scope.isInfoShown = function(info) {
    return $scope.shownInfo === info;
  };

  $scope.getCurrentMission = function () {

    firebase.auth().onAuthStateChanged(function() {
      var currentUserInfo = userData.getUser();
      var uid = currentUserInfo.uid;
      $scope.currentMission = {};

      return firebase.database().ref('/users/' + uid + '/currentMission/').once('value').then(function(snapshot) {
        
        //code reaches here if currentMission is not null

        console.log('snapshot: ', snapshot.val());
        var currentMissionName = snapshot.val().missionName;
        var currentMissionInfo = snapshot.val().missionInfo;

        $scope.currentMission.name = currentMissionName;
        $scope.currentMission.info = currentMissionInfo;

      });

    });
  };






  $scope.claimToken = function (token) {


  // ---------------------------------------------------------------------------------
  // Treasure Hunt Stuff
    //firebase data retrieval in services
    $scope.tokenLocation = tokens.getTokenLocation(token);
    $scope.tokenMessage = tokens.getTokenMessage(token);
    $scope.tokenPrize = tokens.getTokenPrize(token);

    //register token on user node

    tokens.claimToken(token);

  };

  // ---------------------------------------------------------------------------------


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