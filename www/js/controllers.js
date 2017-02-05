angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $ionicScrollDelegate, $timeout, foodies, articles, $ionicSideMenuDelegate, userData) {

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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

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
    article.restaurantName = "";
    article.location = "";
    article.type = "";
    article.contents = "";

  };
  // ---------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------
  // Popup for article page ----------------------------------------------------------

  // Create the article modal that we will use later
  $ionicModal.fromTemplateUrl('templates/article.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.article = modal;
  });

  // Triggered in the article modal to close it
  $scope.closearticle = function() {
    $scope.article.hide();
  };

  // Open the article modal
  $scope.openarticle = function() {
    $scope.article.show();
  };
  // ---------------------------------------------------------------------------------

  // ScrollCheck ---------------------------------------------------------------------
  $scope.checkScroll = function () {
 
        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxScrollableDistanceFromTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;
 
        if (currentTop >= maxScrollableDistanceFromTop)
        {
          closearticle();
        }
    };
  // ---------------------------------------------------------------------------------
  
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
    foodieInfo = foodies.getFoodieInfo(foodieID);
    console.log(foodieInfo);
    return foodieInfo;
  };
})

//Restaurant page controller
.controller('restaurantCtrl', function($scope,articles, userData) {
})

//Article page Controller
.controller('articleCtrl', function($scope, $timeout, $stateParams, articles, userData, foodies, $firebaseObject, $firebaseArray) {

  $scope.selectedArticle = articles.getArticle($stateParams.articleKey);  
  console.log('selectedArticle: ', $scope.selectedArticle);
  // $scope.selectedArticleFoodie2 = articles.getArticleAuthor($stateParams.articleKey)
  // console.log('selectedArticleFoodie2: ', $scope.selectedArticleFoodie2);

  articles.getArticleAuthor($stateParams.articleKey).then(function(value){
     $scope.selectedArticleFoodie = value;
     console.log('selectedArticleFoodie: ', $scope.selectedArticleFoodie);
  });


  $scope.getSelectedArticleFoodieInfo = function(foodieID){
    foodies.getFoodieInfo(foodieID);
  };

  // var articleKey = $stateParams.articleKey;

  // firebase.database().ref('/posts/' + articleKey).on('value', function(snapshot) {
  // // $timeout(){
  //   var foodieID = snapshot.val().author;
  //   console.log('foodieID: ', foodieID);
  //   var foodieInfo = $firebaseObject(firebase.database().ref().child('users').child(foodieID).child('info'));
  //   console.log('foodieInfo: ', foodieInfo); 
  //   $scope.selectedArticleFoodie3 = foodieInfo;
  //   // $scope.$apply();
  //   console.log('selectedArticleFoodie: ', $scope.selectedArticleFoodie3);
  // // }
  // });




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

    // $scope.authPopup = function () {
    // auth.signInWithRedirect(provider);
    // };

    // firebase.auth().getRedirectResult().then(function(result) {
    // //if (result.credential) {
    //   //token = result.credential.accessToken;
    // //}

    // //register the signed-in user info
    // userData.setUser(auth.currentUser);
    // //for testing only
    // console.log('uid is', userData.getUser().uid);

    // //redirect back to home page
    // $state.go('tab.restaurants');

    // }).catch(function(error) {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // // ...
    // });
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
  $scope.pieLabels = ["FB", "Twitter", "Instagram"];
  $scope.pieData = [300, 500, 100];

  // --------------------- Line Chart Configuration ----------------------------
  $scope.lineSeries = ['Active', 'Inactive'];
  $scope.lineLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  $scope.lineData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

})


//Shrink2Level------------------------------------------------------------------------------------
.directive('headerShrink2', function($document) {
    var fadeAmt;

    var shrink = function(tabs, tabs_amt, subHeader, header, amt, dir) {
      ionic.requestAnimationFrame(function() {
        // Threshold is equal to bar-height
        var threshold = 44;
        // Scrolling down
        if(dir === 1) {
          var _amt = Math.min(threshold, amt - threshold);
        }
        // Scrolling up
        else if(dir === -1) {
          var _amt = Math.max(0, amt - threshold);
        }
        // The translation amounts should never be negative
        _amt = _amt < 0 ? 0 : _amt;
        amt = amt < 0 ? 0 : amt;
        tabs_amt = tabs_amt < 0 ? 0 : tabs_amt;
        // Re-position the header
        header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + _amt + 'px, 0)';
        fadeAmt = 1 - _amt / threshold;
        for(var i = 0, j = header.children.length; i < j; i++) {
          header.children[i].style.opacity = fadeAmt;
        }
        // Re-position the sub-header
        subHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + amt + 'px, 0)';
        // Re-position the tabs
        tabs.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + tabs_amt + 'px, 0)';
      });
    };

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var starty = 0;
        var shrinkAmt;
        var tabs_amt;
        // Threshold is equal to bar-height + create-post height;
        var threshold = 88;
        // header
        var header = $document[0].body.querySelector('.bar-header');
        // sub-header
        var subHeader = $document[0].body.querySelector('.shrinkableSubheader');
        var headerHeight = header.offsetHeight;
        var subHeaderHeight = subHeader.offsetHeight;
        // tabs
        var tabs = $document[0].body.querySelector('.tabs');
        var tabsHeight = tabs.offsetHeight;

        var prev = 0;
        var delta = 0;
        var dir = 1;
        var prevDir = 1;
        var prevShrinkAmt = 0;
        var prevTabsShrinkAmt = 0;
        
        $element.bind('scroll', function(e) {
          // if negative scrolling (eg: pull to refresh don't do anything)
          if(e.detail.scrollTop < 0)
            return false;
          // Scroll delta
          delta = e.detail.scrollTop - prev;
          // Claculate direction of scrolling
          dir = delta >= 0 ? 1 : -1;
          // Capture change of direction
          if(dir !== prevDir)
            starty = e.detail.scrollTop;
          // If scrolling up
          if(dir === 1) {
            // Calculate shrinking amount
            shrinkAmt = headerHeight + subHeaderHeight - Math.max(0, (starty + headerHeight + subHeaderHeight) - e.detail.scrollTop);
            // Calculate shrinking for tabs
            tabs_amt = tabsHeight - Math.max(0, (starty + tabsHeight) - e.detail.scrollTop);
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, Math.min(threshold, shrinkAmt), dir);
            // Save prev shrink amount
            prevShrinkAmt = Math.min(threshold, shrinkAmt);
            prevTabsShrinkAmt = Math.min(tabsHeight, tabs_amt);
          }
          // If scrolling down
          else {
            // Calculate expansion amount
            shrinkAmt = prevShrinkAmt - Math.min(threshold, (starty - e.detail.scrollTop));
            // Calculate shrinking for tabs
            tabs_amt = prevTabsShrinkAmt - Math.min(tabsHeight, (starty - e.detail.scrollTop));
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, shrinkAmt, dir);
          }
          // Save prev states for comparison 
          prevDir = dir;
          prev = e.detail.scrollTop;
        });
      }
    };
  })


//Shrink1Level------------------------------------------------------------------------------------
.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(44, amt);
    fadeAmt = 1 - amt / 44;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;
      
      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;
      
      $element.bind('scroll', function(e) {
        var scrollTop = null;
        if(e.detail){
          scrollTop = e.detail.scrollTop;
        }else if(e.target){
          scrollTop = e.target.scrollTop;
        }
        if(scrollTop > starty){
          // Start shrinking
          shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
          shrink(header, $element[0], shrinkAmt, headerHeight);
        } else {
          shrink(header, $element[0], 0, headerHeight);
        }
      });
    }
  };
})

;