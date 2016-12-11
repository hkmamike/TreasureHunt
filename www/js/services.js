angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
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
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
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
    Location: 'HK',
    Type: 'Chinese',
    Foodie: 'Mike'
  }, 

  {
    id: 1,
    name: 'My Dinner @ Double Cafe',
    Location: 'Kowloon',
    Type: 'Westen',
    Foodie: 'Mike'
  },

  {
    id: 2,
    name: 'Great experience ever in HAHA Restuarant',
    Location: 'HK',
    Type: 'Westen',
    Foodie: 'Alex'
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
