'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.EnrollCampaign = functions.database.ref('/User/{UserID}/Input/EnrollCampaign/').onWrite(event => {

	var UserID = event.params.UserID;
	var Input = event.data.val();
	var City = Input.substring(0, Input.indexOf('_'));
	var Campaign = Input;
	var Mission = Input + '_1';

	admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign).on('value', function(snapshot) {

		console.log(snapshot.val());

		if (snapshot.val()==null) {
			//Copy Compaign
			admin.database().ref('/DatabaseInfo/CityCampaignInfo/' + City +'/Campaign/' + Campaign ).on('value', function(snapshot) {
				admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign).set(snapshot.val());
			});

			//Copy Mission1
			admin.database().ref('/DatabaseInfo/MissionInfo/' + Mission).on('value', function(snapshot) {
				admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission).set(snapshot.val());
			});
		}

	});
});

// exports.NextMission = functions.database.ref('/User/{UserID}/Input/NextMission/').onWrite(event => {

// 	var UserID= event.params.UserID;
// 	var Input = event.data.val();
// 	var City = Input.substring(0, Input.indexOf('_'));
// 	var Campaign = Input.substring(0, Input.indexOf('_') + 2);
// 	var Mission = Input;

// 	admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/CampaignType/').on('value', function(snapshot) {
// 		if (snapshot.val() == 'Free' || snapshot.val() == 'Paid Unlocked'){
// 			//Free Campaign or Campaign Paid and Unlocked
// 			admin.database().ref('/User/'+ UserID +'/Unlocked/' + '/Mission/' + Mission).on('value', function(snapshot) {
// 				if (snapshot.val() !== 'XXX') {
// 					//PriorMission Completed
// 					admin.database().ref('/DatabaseInfo/MissionInfo/' + Mission ).on('value', function(snapshot) {
// 						admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/' + Mission).set(snapshot.val());
// 					});
// 				}
// 			});
// 		}
// 		else{ 
// 			//Paid Campaign not being Unlocked
// 		}
// 	});

// });

// exports.ClaimToken = functions.database.ref('/User/{UserID}/Input/ClaimToken/').onWrite(event => {

// 	var UserID= event.params.UserID;
// 	var Input = event.data.val();
// 	var Token = Input.substring(0, Input.indexOf(","));
// 	var TokenCode = Input.substring(Input.indexOf(",") + 1, Input.indexOf(",") + 7);	
// 	var City = Token.substring(0, Token.indexOf("_"));
// 	var Campaign = Token.substring(0, Token.indexOf("_") + 2);
// 	var Mission = Token.substring(0, Token.indexOf("_") + 4);

// 	admin.database().ref('/DatabaseInfo/TokenInfo/' + Token + '/TokenCode/' ).on('value', function(snapshot) {
// 		if (snapshot.val() == TokenCode) {
// 			//Token Valid
// 			admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission +'/Token/'+ Token + '/ClaimStatus').on('value', function(snapshot) {
// 				if (snapshot.val() !== null) {
// 					//Mission Exist
// 					admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission +'/Token/'+ Token + '/ClaimStatus').set('Unlocked');
// 					admin.database().ref('/User/'+ UserID +'/Unlocked/Token/' + Token).set('Unlocked');
// 				} 
// 			});
// 		}
// 		else{
// 			// Console.log ('Invalid TokenCode')
// 			// admin.database().ref('/User/'+ UserID +'/Trial/Token/' + Token).set('Invalid TokenCode');
// 		};
// 	});

// });


exports.NewUser = functions.auth.user().onCreate(event => {
	const userInfo = event.data;
	console.log (userInfo)

	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'UserInfo' + '/' + 'UserEmail'+'/').set(userInfo.email);
	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'UserInfo' + '/'+ 'UserName'+'/').set(userInfo.displayName);
	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'UserInfo' + '/'+ 'UserPict'+'/').set(userInfo.photoURL);
	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'UserInfo' + '/'+ 'UserFB'+'/').set(userInfo.providerData.uid);

	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'Input'+'/' + 'ClaimToken').set('null');
	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'Input'+'/' + 'EnrollCampaign').set('null');
	admin.database().ref('/User/'+ userInfo.uid+'/'+ 'Input'+'/' + 'MissionComplete').set('null');

});


exports.MissionComplete = functions.database.ref('/User/{UserID}/Input/MissionComplete/').onWrite(event => {

	var UserID= event.params.UserID;
	var Input = event.data.val();
	var City = Input.substring(0, Input.indexOf('_'));
	var Campaign = Input.substring(0, Input.indexOf('_') + 2);
	var CurrentMission = Input;
	var CurrentMissionNumber = Input.substring(Input.indexOf('_') + 3, Input.indexOf('_') + 4);
	var NextMissionNumber = parseInt(CurrentMissionNumber) + 1;
	var NextMission = Campaign + '_' + NextMissionNumber;

	//Check if 4 token Unlocked for Pending Mission
	admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + CurrentMission).on('value', function(snapshot) {
		var MissionStatus = snapshot.val().MissionStatus;
		var AllToken = snapshot.val().Token;
		var TokenUnlocked = 0
		if (AllToken[CurrentMission + '_1'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		if (AllToken[CurrentMission + '_2'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		if (AllToken[CurrentMission + '_3'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		if (AllToken[CurrentMission + '_4'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		if (AllToken[CurrentMission + '_5'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		if (AllToken[CurrentMission + '_6'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
		
		if (TokenUnlocked >= 4 && MissionStatus == 'Current'){
			//Update Current Mission Status to Completed
			admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + CurrentMission + '/MissionStatus/').set('Completed');
			//Check Compaign Paid Status
			admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/CampaignType/').on('value', function(snapshot) {
				if (snapshot.val() == 'Free' || snapshot.val() == 'Paid Unlocked'){
					//Copy Next Mission to User Database
					admin.database().ref('/User/'+ UserID +'/Unlocked/Mission/' + CurrentMission).set(Date());
					admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/MissionCompleted/').set(CurrentMissionNumber);
					admin.database().ref('/DatabaseInfo/MissionInfo/' + NextMission ).on('value', function(snapshot) {	
						admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + NextMission).set(snapshot.val());
					});
				}
			});	
		};

	});

});



// exports.counttokenclaimed = functions.database.ref('/users/{userID}/missionList/{missionID}/tokenClaimed/{tokenID}').onWrite(event => {
//   const collectionRef = event.data.ref.parent;
//   const countRef = collectionRef.parent.child('tokenCount');


//   return collectionRef.once('value')
//   	.then(messagesData => counterRef.set(messagesData.numChildren()));

// });



exports.UnlockToken = functions.database.ref('/User/{UserID}/Input/ClaimToken/').onWrite(event => {

	var UserID= event.params.UserID;
	var Input = event.data.val();
	var Token = Input.substring(0, Input.indexOf(","));
	var TokenCode = Input.substring(Input.indexOf(",") + 1, Input.indexOf(",") + 7);	
	var City = Token.substring(0, Token.indexOf("_"));
	var Campaign = Token.substring(0, Token.indexOf("_") + 2);
	var Mission = Token.substring(0, Token.indexOf("_") + 4);

	admin.database().ref('/DatabaseInfo/TokenInfo/' + Token + '/TokenCode/' ).on('value', function(snapshot) {
		//Check Token Validaty
		if (snapshot.val() == TokenCode) {
			admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission).on('value', function(snapshot) {
				//Check Mission Exist
				if (snapshot.val() !== null) {
					var AllToken = snapshot.val().Token;
					admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission +'/Token/'+ Token + '/ClaimStatus').set('Unlocked');
					admin.database().ref('/User/'+ UserID +'/Unlocked/Token/' + Token).set(Date());
					
					var TokenUnlocked = 0
					if (AllToken[Mission + '_1'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					if (AllToken[Mission + '_2'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					if (AllToken[Mission + '_3'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					if (AllToken[Mission + '_4'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					if (AllToken[Mission + '_5'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					if (AllToken[Mission + '_6'].ClaimStatus == 'Unlocked') { TokenUnlocked = TokenUnlocked + 1};
					
					//Record Unlock
					admin.database().ref('/User/'+ UserID +'/Record/' + City + '/Campaign/' + Campaign + '/Mission/' + Mission +'/TokenUnlocked/').set(TokenUnlocked);					
				} 
			});
		}
		else{
			// Console.log ('Invalid TokenCode')
			// admin.database().ref('/User/'+ UserID +'/Trial/Token/' + Token).set('Invalid TokenCode');
		};
	});

});