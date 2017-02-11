angular.module('starter.services', [])

.factory('userData', function() {

  var user = {};
  firebase.auth().onAuthStateChanged(function () {
    user = firebase.auth().currentUser;
    console.log('Current User: ', user);
  });


  return {
    
    getUser: function () {
        console.log('getUser ', firebase.auth().currentUser);
        return firebase.auth().currentUser;
    },
    
    setUser: function (userparameter) {
        user = userparameter;
    },


    dataPath: function(path) {
      return $firebaseObject(firebaseRef.ref('/user/' + path));
    },


    createUser: function() {
      var foodieInformation = {
        foodieName: userData.getUser().displayName,
        foodieID: userData.getUser().uid,
        foodieScore: 100,
        foodieEmail: userData.getUser().email,
        foodieImg: userData.getUser().photoURL
      };

      console.log('foodieInfo', foodieInformation);
      var updates = {};
      updates['/users/' + uid + '/info/'] = foodieInformation;
      return firebase.database().ref().update(updates);

      // return foodies;
      
      // // return foodieInfo;
    },

  };
})


.factory('foodies', ['userData', '$firebaseObject', '$firebaseArray', function(userData, $firebaseObject, $firebaseArray) {
  
  var ref = firebase.database().ref().child('users');
  var foodies = $firebaseObject(ref);
  console.log('All Foodies: ', foodies);

  return {

    allFoodie: function() {
      return foodies;
    },

    getFoodie: function(foodieKey) {
      console.log('foodieKey', foodieKey);
      return $firebaseObject(ref.child(foodieKey));
    },

    getFoodieInfo: function(foodieKey) {
      console.log('foodieKey', foodieKey);
      foodieInfo = $firebaseObject(ref.child(foodieKey).child('info'));
      console.log('foodieInfo', foodieInfo)
      return foodieInfo;
    },

    createFoodie: function() {
      var currentUserInfo = userData.getUser()
      var uid = currentUserInfo.uid;
      var userName = currentUserInfo.displayName;
      var userEmail = currentUserInfo.email;
      var userImg = currentUserInfo.photoURL;
      var foodieInformation = {
        foodieName: userName,
        foodieID: uid,
        foodieScore: 100,
        foodieLv: 1,
        foodieEmail: userEmail,
        foodieImg: userImg
      };
      console.log('foodieInfo', foodieInformation);
      var updates = {};
      updates['/users/' + uid + '/info/'] = foodieInformation;
      return firebase.database().ref().update(updates);

      // return foodies;
      
      // // return foodieInfo;
    },

    bookmarkFoodie: function(foodieKey) {
    },

  }

}])



.factory('restaurants', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var restaurants = [{
    id: 0,
    name: 'Healthy Cafe',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    preference: 0,
    deals: 1,
    recommended: 1
  }, {
    id: 1,
    name: 'Cheap Cafe',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    preference: 0,
    deals: 1,
    recommended: 0
  }, {
    id: 2,
    name: 'Preferred Cafe',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    preference: 1,
    deals: 0,
    recommended: 0
  }, {
    id: 3,
    name: 'Recommended Cafe',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    preference: 0,
    deals: 0,
    recommended: 1
  }, {
    id: 4,
    name: 'Good Cafe',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    preference: 0,
    deals: 0,
    recommended: 0
  }];

  return {
    all: function() {
      return restaurants;
    },
    remove: function(restaurant) {
      restaurants.splice(restaurants.indexOf(restaurant), 1);
    },
    get: function(restaurantId) {
      for (var i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === parseInt(restaurantId)) {
          return restaurants[i];
        }
      }
      return null;
    }
  };
})

.factory('articles',['userData', '$firebaseObject', '$firebaseArray', function( userData, $firebaseObject, $firebaseArray) {

  var firebaseRef = firebase.database();
  var ref = firebase.database().ref().child('posts');
  var articles = $firebaseObject(ref);
  console.log('All articles: ', articles);

  return {

    all: function() {
      return articles;
    },

    getArticle: function(articleKey) {
      return $firebaseObject(ref.child(articleKey));
    },

    dataPath: function(path) {
      return $firebaseObject(firebaseRef.ref('/posts/' + path));
    },

    getArticleAuthor: function(articleKey) {

      // var foodieIDArray = $firebaseObject(firebase.database().ref().child('posts').child(articleKey + '/author'));
      // var foodieIDArray2 = $firebaseArray(firebase.database().ref().child('posts').child(articleKey + '/author'));

      // var adaRef = firebase.database().ref("posts/-Kbi0l6vDUo3_j7JZesa/author");
      // var key = adaRef.$value;  // key === "ada"
      // console.log('KEYYYY : ',key,adaRef);
 
      // console.log('foodieIDArray : ',foodieIDArray, foodieIDArray2);


      // var foodieInfo = $firebaseObject(firebase.database().ref().child('users').child(foodieID).child('info'));
      // console.log('foodieInfo: ', foodieInfo);
      // return foodieInfo;  

      var firebaseRef = firebase.database().ref('/posts/' + articleKey);


      return firebaseRef.once('value').then(function(snapshot) {
        // return snapshot.val().author;
        return $firebaseObject(firebase.database().ref().child('users').child(snapshot.val().author).child('info'));
        // return foodies.getFoodie(snapshot.val().author);
      });

      // articles.getArticleAuthor($stateParams.articleKey).then(function(value){
      //   $scope.selectedArticleFoodie2 = console.log(value);
      // })

      // return firebaseRef.once('value').then(
      //   firebaseRef.once('value', function(snapshot) {
      //     $timeout(function() {
      //       var foodieID = snapshot.val().author;
      //       console.log('foodieID: ', foodieID);
      //       var foodieInfo = $firebaseObject(firebase.database().ref().child('users').child(foodieID).child('info'));
      //       console.log('foodieInfo: ', foodieInfo);
      //       return foodieInfo; 
      //     }); 
      //   });
      //   )


      // firebase.database().ref('/posts/' + articleKey).once('value', function(snapshot) {
      //   $timeout(function() {
      //     var foodieID = snapshot.val().author;
      //     console.log('foodieID: ', foodieID);
      //     var foodieInfo = $firebaseObject(firebase.database().ref().child('users').child(foodieID).child('info'));
      //     console.log('foodieInfo: ', foodieInfo);
      //     return foodieInfo; 
      //   });         
      // });


      // firebase.database().ref('/posts/' + articleKey).once('value').then(function(snapshot) {
      //   $timeout(function() {
      //     var foodieID = snapshot.val().author;
      //     console.log('foodieID: ', foodieID);
      //     var foodieInfo = $firebaseObject(firebase.database().ref().child('users').child(foodieID).child('info'));
      //     console.log('foodieInfo: ', foodieInfo);
      //     return foodieInfo; 
      //   });         
      // });

    },

    saveArticle: function(article) {
      console.log('will save this to the database', article);
      var uid = userData.getUser().uid;
      console.log(uid);
      var newPostKey = firebase.database().ref().child('posts').push().key;
      console.log(newPostKey);
      var newArticleImg = {
        1: 'https://firebasestorage.googleapis.com/v0/b/sponsar-4497d.appspot.com/o/squareFood3.jpg?alt=media&token=1dd9a04c-3452-4732-91b2-68abdfa1cf2b',
        2: 'https://firebasestorage.googleapis.com/v0/b/sponsar-4497d.appspot.com/o/squareFood3.jpg?alt=media&token=1dd9a04c-3452-4732-91b2-68abdfa1cf2b',
        3: 'https://firebasestorage.googleapis.com/v0/b/sponsar-4497d.appspot.com/o/squareFood3.jpg?alt=media&token=1dd9a04c-3452-4732-91b2-68abdfa1cf2b',
      };
      var newArticle = {
        name: article.name,
        restaurantName: article.restaurantName,
        location: article.location,
        type: article.type,
        contents: article.contents,
        articleImgs: newArticleImg,
        timestamp: Math.floor(Date.now()/1000),
        coverImage: 'https://firebasestorage.googleapis.com/v0/b/sponsar-4497d.appspot.com/o/squareFood3.jpg?alt=media&token=1dd9a04c-3452-4732-91b2-68abdfa1cf2b',
        author: uid,
        upVote: 1,
        downVote: 0,
        totalRating: 1,
        key: newPostKey
      };

      var updates = {};

      updates['/posts/' + newPostKey] = newArticle;
      updates['/user-posts/' + uid + '/' + newPostKey] = newArticle;

      // updates['/posts/' + newPostKey + '/articleImgs/'] = newArticleImg;
      // updates['/user-posts/' + uid + '/' + newPostKey + '/articleImgs/'] = newArticleImg;
      //Testing
      updates['/users/' + uid + '/posts/' + newPostKey] = newPostKey;

      return firebase.database().ref().update(updates);
    },

    // remove: function(Article) {
    //   articles.splice(articles.indexOf(Article), 1);
    // },

    bookmarkArticle: function(articleKey) {
      var uid = userData.getUser().uid;
        console.log(uid);
        articleSnap = $firebaseObject(ref.child(articleKey));
        console.log(articleSnap);
      var updates = {};
      updates['/users/' + uid + '/bookmark/' + articleKey] =  articleKey;
      // updates['/users/' + uid + '/bookmark/' + articleKey] =  $firebaseObject(ref.child(articleKey));

      return firebase.database().ref().update(updates);

      // var updateRef = firebase.database().ref().child('/users/' + uid + '/bookmarks/' ).push();
      // updateRef.set({
      // name: "bookmark",
      // "articleID": "12345",
      // });

    },

    upVoteArticle: function(articleKey) {
    },

    downVoteArticle: function(articleKey) {
    },
  
  };

}]);

