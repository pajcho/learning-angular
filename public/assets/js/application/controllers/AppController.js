app.controller('AppController', function($scope, $location, $routeParams){
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.isActive = function(checkRoute){
        return $location.path() === checkRoute;
    };
});