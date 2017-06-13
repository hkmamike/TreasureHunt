angular.module('starter.controllers', [])


.controller('TempCtrl', function($scope, FirebaseUpload) {
	$scope.updateDatabase=function(){
		FirebaseUpload.updateDatabase();
	};
})


.controller('AppCtrl', function($scope, $firebaseObject, $ionicModal, $ionicSideMenuDelegate) {


// SIDE MENU------------------------------------------------------------------------
	$scope.toggleRightSideMenu = function() {
	$ionicSideMenuDelegate.toggleRight();
	};
// ---------------------------------------------------------------------------------


// LOGIN MODAL----------------------------------------------------------------------
	$scope.loginData = {};
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.login = modal;
	});
	$scope.closeLogin = function() {
		$scope.login.hide();
	};
	$scope.openlogin = function() {
		$scope.login.show();
	};
	$scope.authPopup = function () {
		auth.signInWithRedirect(provider);
	};

	firebase.auth().getRedirectResult().then(function(result) {
		userData.setUser(auth.currentUser);
	}).catch(function(error) {
	});
// ---------------------------------------------------------------------------------

// USER INFO------------------------------------------------------------------------
	firebase.auth().onAuthStateChanged(function () {
		var FirebaseUser = firebase.auth().currentUser;
		$scope.UserInfo = $firebaseObject(firebase.database().ref('/User/' + FirebaseUser.uid + '/UserInfo/'));
		$scope.UserRecord = $firebaseObject(firebase.database().ref('/User/' + FirebaseUser.uid + '/Record/'));
		UserID = FirebaseUser.uid;
	});
// ---------------------------------------------------------------------------------


// USER ACTION----------------------------------------------------------------------

	$scope.EnrollCampaign= function(CampaignID) {
		console.log(CampaignID);
		firebase.database().ref('/User/'+ UserID +'/Input/' + '/EnrollCampaign/').set(CampaignID);
	};

	$scope.ClaimToken= function(TokenID, TokenPW) {
		console.log('Claim this token: ', TokenID, TokenPW);
		console.log('UserID: ', UserID);
		firebase.database().ref('/User/'+ UserID +'/Input/' + '/ClaimToken/').set(TokenID + ',' + TokenPW);
	};
// ---------------------------------------------------------------------------------

	$scope.CampaignList = $firebaseObject(firebase.database().ref('/DatabaseInfo/' + '/CityCampaignInfo/'));

})


.controller('ListCtrl', function($scope, $stateParams, $ionicModal) {
	$scope.SelectedCity = $stateParams.CityID;
	$scope.SelectedCampaign = $stateParams.CampaignID;
	$scope.SelectedMission = $stateParams.MissionID;

	// CLAIM TOKEN MODAL----------------------------------------------------------------
	$scope.TokenClaimData = {};
	$ionicModal.fromTemplateUrl('templates/tokenClaim.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.TokenClaim = modal;
	});
	$scope.closeTokenClaim = function() {
		$scope.TokenClaim.hide();
	};
	$scope.openTokenClaim = function(TokenNumber) {
		$scope.TokenClaim.show();
		$scope.TokenNumber = TokenNumber;
	};
	// ---------------------------------------------------------------------------------

	// SEE TOKEN HINTS MODAL----------------------------------------------------------------
	$scope.TokenHintsData = {};
	$ionicModal.fromTemplateUrl('templates/tokenHints.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.Hints = modal;
	});
	$scope.closeHints = function() {
		$scope.Hints.hide();
	};
	$scope.openHints = function(TokenNumber) {
		$scope.Hints.show();
		$scope.TokenNumber = TokenNumber;
	};
	// ---------------------------------------------------------------------------------

});


