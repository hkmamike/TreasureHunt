angular.module('starter.services', [])

.factory('userData', function() {

  var user = {};
  firebase.auth().onAuthStateChanged(function () {
    user = firebase.auth().currentUser;
    console.log('user is: ', user);
  });

  return {
    getUser: function () {
        return user;
    },
    setUser: function (userparameter) {
        user = userparameter;
    }
  };
})

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
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var articles = [
  // {
  //   //id: 0,
  //   name: 'My lunch @ Healthy Cafe',
  //   location: 'HK',
  //   type: 'Chinese',
  //   details: 'This is a Healthy Lunch, Healthy Lunch, HealthyHealthyHealthy Lunch',
  //   rating: '90%',
  //   cover: 'img/food3.jpg',
  //   age: 'Within 3 months',
  //   foodie: 'Mike',
  //   foodieimg: 'img/mike.png'
  // },

  // {
  //   //id: 1,
  //   name: 'My Dinner @ Double Cafe',
  //   location: 'Kowloon',
  //   type: 'Westen',
  //   cover: 'img/food1.jpg',
  //   details: ' it is very good  it is very good  it is very good  it is very good  it is very good  it is very good  it is very good ',
  //   rating: '100%',
  //   age: 'Within 6 months',
  //   foodie: 'Mike',
  //   foodieimg: 'img/mike.png'
  // },

  // {
  //   //id: 2,
  //   name: 'Great experience ever in HAHA Restuarant',
  //   location: 'HK',
  //   type: 'Westen',
  //   details: 'bahbahbahb...ahb...habahabahabhabhabhabhahbbabaha<br>bahbhabhbabahabaha...........bbahbahbaha',
  //   rating: '20%',
  //   cover: 'img/food2.jpg',
  //   age: 'Within 3 months',
  //   foodie: 'Perry',
  //   foodieimg: 'img/perry.png'
  // }
  // ];


  var ref = firebase.database().ref().child('posts');
  // var storageRef = firebase.storage.ref();
  var articles = $firebaseObject(ref);
  console.log(articles);

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
        key: newPostKey
      };

      var updates = {};

      updates['/posts/' + newPostKey] = newArticle;
      updates['/user-posts/' + uid + '/' + newPostKey] = newArticle;

      return firebase.database().ref().update(updates);
    },
    remove: function(Article) {
      articles.splice(articles.indexOf(Article), 1);
    },
    bookmark: function(Article) {
      articles.splice(articles.indexOf(Article), 1);
    },
    // This code searching for article ID???
    get: function(ArticleId) {
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].key === parseInt(ArticleId)) {
          return articles[i];
        }
      }
      return null;
    }
  };
}]);
