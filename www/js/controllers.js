angular.module('starter.controllers', [])

.controller('ArticlesCtrl', function($scope, Articles) {

//Foodie Articles

  $scope.Articles = Articles.all();

  $scope.remove = function(Articles) {
    Articles.remove(Articles);
  };

  $scope.bookmark = function(Articles) {
    Articles.bookmark(Articles);
  };

})

.controller('RestaurantsCtrl', function($scope, restaurants) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.restaurants = restaurants.all();
  $scope.remove = function(restaurant) {
    restaurants.remove(restaurant);
  };
})

.controller('RestaurantDetailCtrl', function($scope, $stateParams, restaurants) {
  $scope.restaurant = restaurants.get($stateParams.restaurantId);
})

.controller('FavouritesCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
