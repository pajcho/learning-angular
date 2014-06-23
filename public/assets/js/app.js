/**
 * Custom UI Bootstrap templates
 */
angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pagination.html",
       "<div class=\"btn-group\">" +
            "<button class=\"btn btn-sm btn-default\" ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\" ng-click=\"selectPage(1)\">{{getText('first')}}</button>" +
            "<button class=\"btn btn-sm btn-default\" ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\" ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</button>" +
            "<button class=\"btn btn-sm btn-default\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\" ng-click=\"selectPage(page.number)\">{{page.text}}</button>" +
            "<button class=\"btn btn-sm btn-default\" ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\" ng-click=\"selectPage(page + 1)\">{{getText('next')}}</button>" +
            "<button class=\"btn btn-sm btn-default\" ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\" ng-click=\"selectPage(totalPages)\">{{getText('last')}}</button>" +
        "</div>"
    );
}]);

var app = angular.module('app', ['angular-loading-bar', 'ngAnimate', 'ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: '../../templates/dashboard.html',
        controller: 'DashboardController'
    });

    $routeProvider.when('/members/groups', {
        templateUrl: '../../templates/groups.html',
        controller: 'GroupsController',
        resolve: {
            groups : function(GroupsService, $route) {
                return GroupsService.get({
                    page: $route.current.params.page || 1
                });
            }
        }
    });

    $routeProvider.when('/members/:id?/:edit?', {
        templateUrl: '../../templates/members.html',
        controller: 'MembersController',
        resolve: {
            members : function(MembersService, $route) {
                return MembersService.get({
                    page: $route.current.params.page || 1
                });
            },
            member : function(MembersService, $route) {
                if(!isNaN($route.current.params.id) && $route.current.params.edit == 'edit')
                    return MembersService.getOne($route.current.params.id);

                return null;
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});


app.factory("MembersService", function($http, FlashService, $location) {
    return {
        get: function(params){
            return $http.get('/api/members', {
                params: params
            });
        },
        getOne: function(id, params){
            return $http.get('/api/members/' + id, {
                params: params
            }).error(function(error){
                FlashService.set(error.message, 'error');
                $location.path('/members', $location.search());
            });
        },
        edit: function(id, params){
            return $http.put('/api/members/' + id, params).error(function(error){
                FlashService.set(error.message, 'error');
                $location.path('/members', $location.search());
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

app.factory("FlashService", function($rootScope) {
    return $rootScope.FlashService = {
        set: function(message, type) {
            if(typeof $rootScope.flash === 'undefined') $rootScope.flash = [];
            angular.element("#flash-messages").removeClass('hidden');

            var messageObject = $rootScope.flash.push({
                remove: function(index){
                    return $rootScope.FlashService.remove(index);
                }
            });
            messageObject = $rootScope.flash[messageObject-1];

            switch(type)
            {
                case 'error':
                    angular.extend(messageObject, {message: message, type: 'error', alertClass: 'alert-danger', heading: '<i class="glyphicon glyphicon-exclamation-sign"></i> Error'});
                    break;
                case 'success':
                    angular.extend(messageObject, {message: message, type: 'success', alertClass: 'alert-success', heading: '<i class="glyphicon glyphicon-ok-sign"></i> Success'});
                    break;
                case 'warning':
                    angular.extend(messageObject, {message: message, type: 'warning', alertClass: 'alert-warning', heading: '<i class="glyphicon glyphicon-warning-sign"></i> Warning'});
                    break;
                default:
                    angular.extend(messageObject, {message: message, type: 'info', alertClass: 'alert-info', heading: '<i class="glyphicon glyphicon-info-sign"></i> Info'});
                    break;
            }
        },
        remove: function(index) {
            $rootScope.flash.splice(index, 1);
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

app.controller('MembersController', function($scope, $location, $routeParams, FlashService, MembersService, $modal, members, member){
    $scope.members = {};
    if(!$.isEmptyObject(members.data.data))
        $scope.members.data = members.data.data;
    if(members.data.meta)
        $scope.members.pagination = members.data.meta.pagination;

    if(member && !$.isEmptyObject(member.data.data))
    {
        var $modalInstance = $modal.open({
            backdrop: 'static',
            templateUrl: "../../templates/members/edit.html",
            controller: function($scope) {
                $scope.member = member.data.data;
                $scope.save = function(){

                    // Temporary remove some date fields until we make them editable
                    delete $scope.member.dob;
                    delete $scope.member.dos;
                    delete $scope.member.doc;

                    MembersService.edit($scope.member.id, $scope.member);
                    FlashService.set('Member successfully saved!!', 'success');
                    $location.path('members', $location.search());
                    $modalInstance.dismiss();
                };
                $scope.cancel = function(){
                    $location.path('members', $location.search());
                    $modalInstance.dismiss();
                }
            }
        });
    }
});

app.controller('GroupsController', function($scope, $location, FlashService, groups){
    $scope.groups = {};
    if(!$.isEmptyObject(groups.data.data))
        $scope.groups.data = groups.data.data;
    if(groups.data.meta)
        $scope.groups.pagination = groups.data.meta.pagination;
});
