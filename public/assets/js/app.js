var app = angular.module('app', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap.pagination']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '../../templates/dashboard.html',
        controller: 'DashboardController'
    });

    $routeProvider.when('/members', {
        templateUrl: '../../templates/members.html',
        controller: 'MembersController',
        resolve: {
            Members : function(MembersService, $route) {
                return MembersService.get({
                    page: $route.current.params.page || 1
                });
            }
        }
    });

    $routeProvider.when('/members/groups', {
        templateUrl: '../../templates/groups.html',
        controller: 'GroupsController',
        resolve: {
            Groups : function(GroupsService, $route) {
                return GroupsService.get({
                    page: $route.current.params.page || 1
                });
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
});

app.factory("MembersService", function($http) {
    return {
        get: function(params){
            return $http.get('/api/members', {
                params: params
            });
        }
    }
});

app.factory("GroupsService", function($http) {
    return {
        get: function(params){
            return $http.get('/api/members/groups', {
                params: params
            });
        }
    }
});

app.factory("FlashService", function($rootScope) {
    return {
        set: function(message, type) {
            if(typeof $rootScope.flash === 'undefined') $rootScope.flash = [];
            angular.element("#flash-messages").removeClass('hidden');

            switch(type)
            {
                case 'error':
                    $rootScope.flash.push({message: message, type: 'error', alertClass: 'alert-danger', heading: '<i class="glyphicon glyphicon-exclamation-sign"></i> Error'});
                    break;
                case 'success':
                    $rootScope.flash.push({message: message, type: 'success', alertClass: 'alert-success', heading: '<i class="glyphicon glyphicon-ok-sign"></i> Success'});
                    break;
                case 'warning':
                    $rootScope.flash.push({message: message, type: 'warning', alertClass: 'alert-warning', heading: '<i class="glyphicon glyphicon-warning-sign"></i> Warning'});
                    break;
                default:
                    $rootScope.flash.push({message: message, type: 'info', alertClass: 'alert-info', heading: '<i class="glyphicon glyphicon-info-sign"></i> Info'});
                    break;
            }
        },
        remove: function(type) {
            if(typeof type !== 'undefined')
            {
                angular.forEach($rootScope.flash, function(element, key){
                    if(element.type == type) $rootScope.flash.splice(key, 1);
                });
            }
        },
        clear: function() {
            delete $rootScope.flash;
        }
    }
});

app.controller('AppController', function($scope, $location, $routeParams){
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.isActive = function(checkRoute){
        return $location.path() === checkRoute;
    };
});

app.controller('DashboardController', function($scope, $location, FlashService){

});

app.controller('MembersController', function($scope, $location, $routeParams, FlashService, Members){
    $scope.members = {};
    if(!$.isEmptyObject(Members.data.data))
        $scope.members.data = Members.data.data;
    if(Members.data.meta)
        $scope.members.pagination = Members.data.meta.pagination;
});

app.controller('GroupsController', function($scope, $location, FlashService, Groups){
    $scope.groups = {};
    if(!$.isEmptyObject(Groups.data.data))
        $scope.groups.data = Groups.data.data;
    if(Groups.data.meta)
        $scope.groups.pagination = Groups.data.meta.pagination;
});