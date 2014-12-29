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

  $http.get("/posts/" + $routeParams.entry + ".json")
    .success(function(data) {
      $scope.post = data.html;
  });

  $http.get("/api/blog")
    .success(function(data) {
      $scope.posts = data;
      data.forEach(function(el, i) {
        $scope.count;
        if(el.address === $routeParams.entry) {
          $scope.count = i;
        }
      });
  });
}]);

app.controller("homeCtrl", ["$http","$scope", function($http,$scope) {
  $http.get("/api/blog/")
    .success(function(data) {
      $scope.posts = data;
    });
}]);