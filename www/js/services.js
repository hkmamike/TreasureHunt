angular.module('starter.services', [])

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

.factory('Articles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var Articles = [
  {
    id: 0,
    name: 'My lunch @ Healthy Cafe',
    location: 'HK',
    type: 'Chinese',
    rating: '90%',
    cover: 'img/food3.jpg',
    age: 'Within 3 months',
    foodie: 'Mike',
    foodieimg: 'img/mike.png'
  }, 

  {
    id: 1,
    name: 'My Dinner @ Double Cafe',
    location: 'Kowloon',
    type: 'Westen',
    cover: 'img/food1.jpg',
    rating: '100%',
    age: 'Within 6 months',
    foodie: 'Mike',
    foodieimg: 'img/mike.png'
  },

  {
    id: 2,
    name: 'Great experience ever in HAHA Restuarant',
    location: 'HK',
    type: 'Westen',
    rating: '20%',
    cover: 'img/food2.jpg',
    age: 'Within 3 months',
    foodie: 'Perry',
    foodieimg: 'img/perry.png'
  }
  ];

  return {
    all: function() {
      return Articles;
    },
    remove: function(Article) {
      Articles.splice(Articles.indexOf(Article), 1);
    },
    bookmark: function(Article) {
      Articles.splice(Articles.indexOf(Article), 1);
    },
    get: function(ArticleId) {
      for (var i = 0; i < Articles.length; i++) {
        if (Articles[i].id === parseInt(ArticleId)) {
          return Articles[i];
        }
      }
      return null;
    }
  };
})

;
