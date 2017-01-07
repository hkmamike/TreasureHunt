angular.module('starter.services', ['firebase'])

.factory('userData', function() {
  var user ={};
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

.factory('articles',['userData', '$firebaseObject', function(userData, $firebaseObject) {
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
  var articles = $firebaseObject(ref);

  return {
    all: function() {
      return articles;
    },
    saveArticle: function(article) {
      console.log('will save this to the database', article);
      var newArticle = {
         name: article.name,
         location: article.location,
         type: article.type,
         details: article.details,
         rating: article.rating
      };

      var newPostKey = firebase.database().ref().child('posts').push().key;
      console.log(newPostKey);
      var updates = {};
      var uid = userData.getUser().uid;
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
    get: function(ArticleId) {
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].id === parseInt(ArticleId)) {
          return articles[i];
        }
      }
      return null;
    }
  };
}]);
