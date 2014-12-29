var app = angular.module("blog", ['ngRoute','ngSanitize']);

app.factory("date", ["$filter", function($filter) {
  return function(post) {
    return $filter("date")(post.date, "d" + "." + "M" + "." + "yy");
  };
}]);

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

app.controller("homeCtrl", ["$http","$scope","date", function($http,$scope,date) {
  $http.get("/api/blog/")
    .success(function(data) {
      $scope.posts = data;
      $scope.date = date;
    });
}]);

app.controller("postCtrl", ["$http","$scope","$routeParams","date", function($http,$scope,$routeParams,date) {

  $http.get("/posts/" + $routeParams.entry + ".json")
    .success(function(data) {
      $scope.post = data;
      $scope.date = date;
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