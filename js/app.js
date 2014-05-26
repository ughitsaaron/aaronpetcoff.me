(function() {
  var app = angular.module('portfolio', []);
  
  // changes angular interpolation to avoid conflicts with liquid templating used by jekyll
  app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });

  app.controller('ResumeController', ['$scope', '$http', function($scope, $http) {
    $http.get('/js/resume.json').success(function(data){
      $scope.resume = data;
    });
  }]);
})();