angular.module('starter.services', [])

.factory('userData', function($q, $firebaseObject, $firebaseArray) {

  var user = {};
  var uid;
  firebase.auth().onAuthStateChanged(function () {
    user = firebase.auth().currentUser;
    uid = firebase.auth().currentUser.uid;
    console.log('position 2', Date.now(), uid);
    console.log('Current User: ', user);
    console.log('Current User uid: ', uid);
  });

  

  return {
    
    getUser: function () {
        // console.log('getUser ', firebase.auth().currentUser);
        return firebase.auth().currentUser;
    },
    
    setUser: function (userparameter) {
        user = userparameter;
    },

    dataPath: function(path) {
      //var uid = firebase.auth().currentUser.uid;
      console.log('/users/' + uid +'/'+ path);
      return $firebaseObject(firebase.database().ref('/users/' + uid +'/'+ path));
    },

    // userFavourite: function() {
    //   var uid=firebase.auth().currentUser.uid;
    //   console.log($firebaseobject(firebase.database().ref('/users/')));
    //   // return $firebaseObject(firebase.database().ref('/users/' + uid +'/'+ path));
    // },


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
      // return foodieInfo;
    },

  };
})


// .factory('getPromise', function($q) {

//   var getMessages = function() {
//     var deferred = $q.defer(); 
//     var totalCount ={};
//     var k = firebase.database().ref('/posts/'+ '-KdKW9C-Cd6H3_UIwDFs' + '/bookmark/').once("value").then(function(snapshot) {
//             var totalCount = snapshot.numChildren();
//             console.log('count',totalCount);
//     });
//     deferred.resolve(k);
//     return deferred.promise;
//   };

//   return {
//     getMessages: getMessages
//   };




//   // var getIfBookmark = function() {
//   //   var deferred = $q.defer();
//   //   var promiseReturn = firebase.database().ref('/posts/'+ '-KdKW9C-Cd6H3_UIwDFs' + '/bookmark/').once("value").then(function(snapshot) {
//   //           totalCount = snapshot.numChildren();
//   //           console.log('count',totalCount);
//   //   });
//   //   deferred.resolve(promiseReturn);
//   //   return deferred.promise;
//   // },

//   // return {
//   //   getIfBookmark: getIfBookmark
//   // };

// })


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

    dataPath: function(path) {
      return $firebaseObject(firebaseRef.ref('/users/' + path));
    },

    getFoodieInfo: function(foodieKey) {
      foodieInfo = $firebaseObject(ref.child(foodieKey).child('info'));
      return foodieInfo;
    },

    createFoodie: function() {
      var currentUserInfo = userData.getUser();
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
    },

    bookmarkFoodie: function(foodieKey) {
    },

  };

}])

.factory('restaurants', function() {

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

.factory('tokens',['$rootScope', '$q','userData', '$firebaseObject', '$firebaseArray', function( $rootScope, $q, userData, $firebaseObject, $firebaseArray) {
  var self = this;
  var firebaseRef = firebase.database();
  var ref = firebase.database().ref().child('tokens');
  var articles = $firebaseObject(ref);

  return {

    getTokenLocation: function(token) {
      tokenLocation = $firebaseObject(ref.child(token).child('location'));
      return tokenLocation;
    },

    getTokenMessage: function(token) {
      tokenMessage = $firebaseObject(ref.child(token).child('message'));
      return tokenMessage;
    },

    getTokenPrize: function(token) {
      tokenPrize = $firebaseObject(ref.child(token).child('prize'));
      return tokenPrize;
    },

    claimToken: function(token) {
      var currentUserInfo = userData.getUser();
      var uid = currentUserInfo.uid;

      return firebase.database().ref('/tokens/' + token + '/missionCode/').once('value').then(function(snapshot) {
       
        //this checks the token against the valid token list automatically because a null result does not trigger 'then'
        var tokenToClaim = snapshot.val();
        var updates = {};

        console.log('claiming this token : ', tokenToClaim);
        updates['/users/' + uid + '/tokenClaimed/' + token] = tokenToClaim;
        firebase.database().ref().update(updates);
      });
    },

  };
}])

.factory('articles',['userData', '$firebaseObject', '$firebaseArray', function( userData, $firebaseObject, $firebaseArray) {
  var self = this;
  var firebaseRef = firebase.database();
  var ref = firebase.database().ref().child('posts');
  var articles = $firebaseObject(ref);

  return {

    all: function() {
      return articles;
    },

    getArticle: function(articleKey) {
      return $firebaseObject(ref.child(articleKey));
    },

    dataPath: function(path) {
      console.log(path);
      console.log($firebaseObject(firebaseRef.ref('/posts/' + path)));
      return $firebaseObject(firebaseRef.ref('/posts/' + path));
    },

    getArticleAuthor: function(articleKey) {

      var firebaseRef = firebase.database().ref('/posts/' + articleKey);

      return firebaseRef.once('value').then(function(snapshot) {
        return $firebaseObject(firebase.database().ref().child('users').child(snapshot.val().author).child('info'));
      });

    },

    saveArticleWithImage: function(article) {
      return new Promise (function(resolve, reject) {

        // File or Blob named mountains.jpg
        var file = article.image;
        var uid = userData.getUser().uid;
        console.log(uid);
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // For checking image upload
        //console.log('img is : ', article.image);

        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        };

        var storageRef = firebase.storage().ref();

        // console.log(file,  file.name);

        // Upload file and metadata to the object 'images/mountains.jpg'
        // var uploadTask = storageRef.child('images/' + file.name).putString(file);
        filebase64 = file.replace(/^data:image\/(png|jpeg);base64,/, "");
        // var uploadTask = storageRef.child('images/' + file.name).putString(filebase64, 'base64', {contentType:'image/jpg'});

        var uploadTask = storageRef.child('images/' + newPostKey + '/' + file.name).putString(file, 'data_url', {contentType:'image/jpg'});

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, function() {
            // Upload completed successfully, now we can get the download URL

              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log('img url downloadURL');
              console.log('will save this to the database', article);
              console.log(newPostKey);

              console.log ('article name is:', article.name);

              var newArticleImg = {
                1:downloadURL,
                2:downloadURL,
                3:downloadURL};

              var newArticle = {
                  name: article.name,
                  bookmark: {counter:0},
                  rate: {counter:0},
                  restaurantName: article.restaurantName,
                  location: article.location,
                  type: article.type,
                  contents: article.contents,
                  // articleImgs: newArticleImg,
                  timestamp: Math.floor(Date.now()/1000),
                  coverImage: downloadURL,
                  author: uid,
                  key: newPostKey
              };

              var updates = {};

              updates['/posts/' + newPostKey] = newArticle;
              updates['/user-posts/' + uid + '/' + newPostKey] = newArticle;
              updates['/users/' + uid + '/posts/' + newPostKey] = newPostKey;

              firebase.database().ref().update(updates);
              // this.rateArticle(newPostKey,1) ;
              console.log(Date.now());

              resolve(article);
              //return firebase.database().ref().update(updates);
            }
          );
      });
    },



    bookmarkArticle: function(articleKey,bookmark) {
      var uid = userData.getUser().uid;
      var bookmarkTime = Math.floor(Date.now()/1000);
      var counterRef;
      // var currentBookmarkCount = $firebaseObject(firebase.database().ref('/posts/' + articleKey + '/bookmarkCount/'));

      // c
      // console.log(currentBookmarkCount.$value);
      // var bookmarkCount = currentBookmarkCount.$value

      // if (bookmark){
      //   var updates = {};
      //   var bookmarkCount = bookmarkCount + 1;
      //   updates['/users/' + uid + '/bookmark/' + articleKey] =  1;
      //   updates['/posts/' + articleKey + '/bookmarkCount/'] = bookmarkCount;
      //   return firebase.database().ref().update(updates);
      // }

      // else {

      //   firebase.database().ref('/users/' + uid + '/bookmark/'+ articleKey).remove();
      //   var bookmarkCount = bookmarkCount - 1;
      //   var updates = {};
      //   updates['/posts/' + articleKey + '/bookmarkCount/'] = bookmarkCount;
      //   return firebase.database().ref().update(updates);

      // }


      // });
    
      if (bookmark){

        counterRef = firebase.database().ref('/posts/' + articleKey + '/bookmark/counter');
          counterRef.transaction(function(currentCount) {
          console.log('currentCount',currentCount);
          return currentCount + 1;
        });

        var updates = {};
        updates['/users/' + uid + '/bookmark/' + articleKey] =  articleKey;
        updates['/posts/' + articleKey + '/bookmark/' + uid] = bookmarkTime;
        return firebase.database().ref().update(updates);
      }

      else {

        counterRef = firebase.database().ref('/posts/' + articleKey + '/bookmark/counter');
          counterRef.transaction(function(currentCount) {
          console.log('currentCount',currentCount);
          return currentCount - 1;
        });

        firebase.database().ref('/users/' + uid + '/bookmark/'+ articleKey).remove();
        firebase.database().ref('/posts/' + articleKey + '/bookmark/' + uid).remove();
      }
      
    },

    isBookmarkArticle: function(articleKey) {
      var uid = userData.getUser().uid;
      var firebaseRef = firebase.database().ref('/users/' + uid + '/bookmark/'+ articleKey);
      var bookmarkedArticle = $firebaseObject(firebaseRef);
      return bookmarkedArticle;
    },


    rateArticle: function(articleKey,rate) {
      var uid = userData.getUser().uid;
      var updates = {};
      var rateTime = Math.floor(Date.now()/1000);
      // var currentUserRating =0;
      var currentRating = $firebaseObject(firebase.database().ref('/users/' + uid + '/rate/' + articleKey));
      console.log(currentRating);
      // var currentUserRating = $firebaseObject(firebase.database().ref('/users/' + uid + '/rate/'+ articleKey));
      // var currentRating = 0;
      // var currentUserRating = 0;

      // currentRating.$loaded().then(function () {
      //   console.log(currentRating.$value);
      // });

      currentRating.$loaded().then(function () {
      var currentUserRating = currentRating.$value;
      console.log(articleKey,rate,currentUserRating);

        // firebase.database().ref('/users/' + uid + '/rate/'+ articleKey + '/up/').remove();
        // firebase.database().ref('/users/' + uid + '/rate/'+ articleKey + '/down/').remove();

        firebase.database().ref('/users/' + uid + '/rate/'+ articleKey).remove();
        firebase.database().ref('/posts/' + articleKey + '/rate/up/'+ uid).remove();
        firebase.database().ref('/posts/' + articleKey + '/rate/down/'+ uid).remove();

      var counterRef;

      if (currentUserRating==rate) {

        if(rate==1) {   //cancel rate up
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/up/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
        }

        else {  //cancel rate down
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/down/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
        }

      }

      else if (currentUserRating === null) {

        updates['/users/' + uid + '/rate/' + articleKey] =  rate;

        if(rate==1) {

          updates['/posts/' + articleKey + '/rate/up/' + uid] = rateTime;

          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/up/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
        }

        else {
          
          updates['/posts/' + articleKey + '/rate/down/' + uid] = rateTime;

          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/down/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
        }

      }

      else if (currentUserRating !== null) {

        updates['/users/' + uid + '/rate/' + articleKey] =  rate;
        
        if(rate==1) { //from rate down to rate up

          updates['/posts/' + articleKey + '/rate/up/' + uid] = rateTime;

          ounterRef = firebase.database().ref('/posts/' + articleKey + '/rate/down/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/up/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 2;
          });
        }

        else {  //from rate up to rate down
          
          updates['/posts/' + articleKey + '/rate/down/' + uid] = rateTime;

          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/up/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/down/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount + 1;
          });
          counterRef = firebase.database().ref('/posts/' + articleKey + '/rate/counter');
            counterRef.transaction(function(currentCount) {
            console.log('currentCount',currentCount);
            return currentCount - 2;
          });
        }

      }

        return firebase.database().ref().update(updates);
      
    });
      
    },

    isRateArticle: function(articleKey) {
      var uid = userData.getUser().uid;
      var firebaseRef = firebase.database().ref('/users/' + uid + '/rate/' + articleKey);
      var ratedUpArticle = $firebaseObject(firebaseRef);
      return ratedUpArticle;
    },

    // isRateUpArticle: function(articleKey) {
    //   var uid = userData.getUser().uid;
    //   var firebaseRef = firebase.database().ref('/posts/' + articleKey + '/rate/up/'+ uid);
    //   var ratedUpArticle = $firebaseObject(firebaseRef);
    //   return ratedUpArticle;
    // },

    // isRateDownArticle: function(articleKey) {
    //   var uid = userData.getUser().uid;
    //   var firebaseRef = firebase.database().ref('/posts/' + articleKey + '/rate/down/'+ uid);
    //   var ratedDownArticle = $firebaseObject(firebaseRef);
    //   return ratedDownArticle;
    // },

    articleScole: function(articleKey) {

    var totalUp = firebase.database().ref('/posts/'+ articleKey + '/rate/up/').once("value").then(function(snapshot) {
            totalCount = snapshot.numChildren();
            console.log('count',totalCount);
            return(totalCount);
    });


    var totalDown = firebase.database().ref('/posts/'+ articleKey + '/rate/down/').once("value").then(function(snapshot) {
            totalCount = snapshot.numChildren();
            console.log('count',totalCount);
            return(totalCount);
    });

      return (2*totalUp/(totalUp+totalDown) - 1 )*100;
    },

    articleBookmark: function(articleKey) {

    var k = firebase.database().ref('/posts/'+ articleKey + '/bookmark/').once("value").then(function(snapshot) {
            totalCount = snapshot.numChildren();
            console.log('count',totalCount);
            return(totalCount);
    });

    return k;

    },
  };
}]);

