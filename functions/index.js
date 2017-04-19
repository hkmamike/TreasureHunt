'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// Keeps track of the length of the 'likes' child list in a separate property.
exports.countlikechange = functions.database.ref('/users/{userID}/missionList/{missionID}/tokenClaimed/{tokenID}').onWrite(event => {
  const collectionRef = event.data.ref.parent;
  const countRef = collectionRef.parent.child('tokenCount');


  return collectionRef.once('value')
  	.then(messagesData => counterRef.set(messagesData.numChildren()));
  }

  // Return the promise from countRef.transaction() so our function 
  // waits for this async event to complete before it exits.
  // return countRef.transaction(current => {
  //   if (event.data.exists() && !event.data.previous.exists()) {
  //     return (current || 0) + 1;
  //   }
  //   else if (!event.data.exists() && event.data.previous.exists()) {
  //     return (current || 0) - 1;
  //   }
  // });
});

// If the number of likes gets deleted, recount the number of likes
// exports.recountlikes = functions.database.ref('/users/{userID}/missionList/{missionID}/tokenCount/').onWrite(event => {
//   if (!event.data.exists()) {
//     const counterRef = event.data.ref;
//     const collectionRef = counterRef.parent.child('tokenClaimed');
    
//     // Return the promise from counterRef.set() so our function 
//     // waits for this async event to complete before it exits.
//     return collectionRef.once('value')
//         .then(messagesData => counterRef.set(messagesData.numChildren()));
//   }
// });




// exports.countchild = functions.database.ref('/users/{userID}/missionList/{missionID}/tokenClaimed/{tokenID}').onWrite(event => {
//       firebaseRef=event.data.ref.parent;
//       return firebaseRef.once('value').then(function(snapshot) {
//         return $firebaseObject(firebase.database().ref().child('users').child(snapshot.val().author).child('info'));
//       });
// });