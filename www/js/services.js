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
});
