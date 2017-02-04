angular.module('starter.services', [])

.factory('userData', function() {

  var user = {};
  firebase.auth().onAuthStateChanged(function () {
    user = firebase.auth().currentUser;
    console.log('Current User: ', user);
  });

    console.log('Current User call: ', user);

  return {
    getUser: function () {
        return user;
    },
    setUser: function (userparameter) {
        user = userparameter;
    }
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
      return $firebaseObject(ref.child(foodieKey));
    },

    createFoodie: function(foodieKey) {

      var foodieInfo = {
        name: 'TestUser',
        score: '100',
        website: 'dddd',
        image: 'ddddd',
        uid: uid
      };

      console.log('foodieInfo', foodieInfo);
      var updates = {};
        updates['/users/' + uid + '/info/'] = foodieInfo;
      return firebase.database().ref().update(updates);
      console.log('userInfo', foodieInfo);
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

.factory('articles',['userData', '$firebaseObject', '$firebaseArray', function(userData, $firebaseObject, $firebaseArray) {

  var ref = firebase.database().ref().child('posts');
  // var storageRef = firebase.storage.ref();
  var articles = $firebaseObject(ref);
  console.log('All Articles: ', articles);

  return {

    all: function() {
      return articles;
    },

    getArticle: function(articleKey) {
      return $firebaseObject(ref.child(articleKey));
    },

    saveArticle: function(article) {
      console.log('will save this to the database', article);
      var uid = userData.getUser().uid;
      console.log(uid);
      var newPostKey = firebase.database().ref().child('posts').push().key;
      console.log(newPostKey);
      var newArticle = {
        name: article.name,
        restaurantName: article.restaurantName,
        location: article.location,
        type: article.type,
        contents: article.contents,
        timestamp: Math.floor(Date.now()/1000),
        author: uid,
        upVote: 1,
        downVote: 0,
        totalRating: 1,
        key: newPostKey
      };

      var updates = {};

      updates['/posts/' + newPostKey] = newArticle;
      updates['/user-posts/' + uid + '/' + newPostKey] = newArticle;

      //Testing
      updates['/users/' + uid + '/posts/'] = newPostKey;

      return firebase.database().ref().update(updates);
    },

    // remove: function(Article) {
    //   articles.splice(articles.indexOf(Article), 1);
    // },

    bookmarkArticle: function(articleKey) {
    },

    upVoteArticle: function(articleKey) {
    },

    downVoteArticle: function(articleKey) {
    },
  
  };

}]);

