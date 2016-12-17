 /*
 1. ..................................................................INITIALIZE
    FIREBASE CONFIG
    INITIALIZE FIREBASE WEB APP
    REDEFINE GLOBAL DOCUMENT AS LOCAL DOC
 2. ...................................................................VARIABLES
    ACCOUNT PAGE
    ACK / EMAIL ACTION HANDLER PAGE
    PRIVATE PAGE
    PUBLIC PAGE
    SHARED
 3. .............................................................EVENT LISTENERS
    ACCOUNT PAGE
    PRIVATE PAGE
    SHARED
    SOCIAL MEDIA BUTTONS
 4. ............................................................FIREBASE METHODS
    INITIALIZE FIREBASE WEB APP
    FIREBASE AUTH STATE CHANGE METHOD
 5. ...................................................................FUNCTIONS
    ACCOUNT PAGE
    ACK / EMAIL ACTION HANDLER PAGE
    LOGIN PAGE
    PUBLIC PAGE 
    SHARED
 6. ............................................................REVEALED METHODS
    ADD NODES WITH DATA TO REALTIME DATABASE
*/

/*

INITIALIZE

*/
document.addEventListener('DOMContentLoaded', function() {

  // FIREBASE CONFIG
  var config = {
    apiKey: "AIzaSyAohPYbXHNacKk3WZSZHrdGfTZtJuyfO48",
    authDomain: "sponsar-4497d.firebaseapp.com",
    databaseURL: "https://sponsar-4497d.firebaseio.com",
    storageBucket: "sponsar-4497d.appspot.com",
    messagingSenderId: "1035014328412"
  };
  
  //INITIALIZE FIREBASE WEB APP
  firebase.initializeApp(config);
  var db = firebase.database();
  var auth = firebase.auth();

  //need a switch statement later if we use more federated logins
	var provider = new firebase.auth.FacebookAuthProvider();

	//the function that the login button uses
	function authPopup(){
		auth.signInWithPopup(provider).then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
			}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	}
  
  //REDEFINE DOCUMENT AS LOCAL DOC
  //var doc = document;
  //window.snackbarContainer = doc.querySelector('#toast');

 // END
}, false);
