var app = angular.module("blog", ['ngRoute','ngSanitize']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/posts/:entry", {
      templateUrl: "/post.html",
      controller: "postCtrl"
    })
    .when("/", {
      templateUrl: "/home.html",
      controller: "homeCtrl"
    });
}]);

app.controller("postCtrl", ["$http","$scope","$routeParams", function($http,$scope,$routeParams) {

  $http.get("/api/blog/" + $routeParams.entry)
    .success(function(data) {
      $scope.post = data;
    });
}]);

app.controller("homeCtrl", ["$http","$scope", function($http,$scope) {
  $http.get("/api/blog/")
    .success(function(data) {
      $scope.posts = data;
    });
}]);