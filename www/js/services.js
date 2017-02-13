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
      console.log('foodieInfo', foodieInfo);
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

      // return foodies;
      
      // // return foodieInfo;
    },

    bookmarkFoodie: function(foodieKey) {
    },

  };

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


  var self = this;
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

    saveArticle: function(downloadURL, article) {
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
        coverImage: downloadURL,
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

    saveImage: function(article) {
      // File or Blob named mountains.jpg

      function b64ToBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }
      
      var base64Image = article.image.split(',')[1];
      console.log('base64Image is: ', base64Image);

      var file = b64ToBlob (base64Image, 'image/jpeg');
      console.log('file is : ', file);
      console.log('img name is : ', file.name);
      console.log('article is : ', article);
      console.log('img is : ', article.image);

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

      var uploadTask = storageRef.child('images/' + file.name).putString(file, 'data_url', {contentType:'image/jpg'});

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

          console.log('download URL is:', downloadURL);
          console.log('self is: ', self.saveArticle());
          return this.saveArticle(downloadURL,article);

        });
    },


    saveArticleWithImage: function(article) {
      // File or Blob named mountains.jpg
      var file = article.image;
      var uid = userData.getUser().uid;
      console.log(uid);
      var newPostKey = firebase.database().ref().child('posts').push().key;

      console.log('img name is : ', file.name);
      console.log('article is : ', article);
      console.log('img is : ', article.image);
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
            console.log('img url downloadURL')
            console.log('will save this to the database', article);
            console.log(newPostKey);
            var newArticle = {
                name: article.name,
                restaurantName: article.restaurantName,
                location: article.location,
                type: article.type,
                contents: article.contents,
                // articleImgs: newArticleImg,
                timestamp: Math.floor(Date.now()/1000),
                coverImage: downloadURL,
                author: uid,
                upVote: 1,
                downVote: 0,
                totalRating: 1,
                key: newPostKey
            };

            var updates = {};

            updates['/posts/' + newPostKey] = newArticle;
            updates['/user-posts/' + uid + '/' + newPostKey] = newArticle;
            updates['/users/' + uid + '/posts/' + newPostKey] = newPostKey;
            return firebase.database().ref().update(updates);

        });
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

