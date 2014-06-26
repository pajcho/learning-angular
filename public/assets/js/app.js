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

    $routeProvider.when('/members/groups/:id?/:edit?', {
        templateUrl: '../../templates/groups/groups.html',
        controller: 'GroupsController',
        resolve: {
            groups : function(GroupsService, $route) {
                return GroupsService.get({
                    page: $route.current.params.page || 1
                });
            },
            group : function(GroupsService, $route) {
                if(!isNaN($route.current.params.id) && $route.current.params.edit == 'edit')
                {
                    return GroupsService.getOne($route.current.params.id).error(function(error){
                        FlashService.set(error.message, 'error');
                        $location.path('/members/groups', $location.search());
                    });
                }

                return null;
            }
        }
    });

    $routeProvider.when('/members/:id?/:edit?', {
        templateUrl: '../../templates/members/members.html',
        controller: 'MembersController',
        resolve: {
            members : function(MembersService, $route) {
                return MembersService.get({
                    page: $route.current.params.page || 1
                });
            },
            member : function(MembersService, $route, $location) {
                if(!isNaN($route.current.params.id) && $route.current.params.edit == 'edit')
                {
                    return MembersService.getOne($route.current.params.id).error(function(error){
                        FlashService.set(error.message, 'error');
                        $location.path('/members', $location.search());
                    });
                }

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
            });
        },
        edit: function(id, params){
            return $http.put('/api/members/' + id, params);
        },
        delete: function(id){
            return $http.delete('/api/members/' + id);
        }
    }
});

app.factory("GroupsService", function($http) {
    return {
        get: function(params){
            return $http.get('/api/members/groups', {
                params: params
            });
        },
        getOne: function(id, params){
            return $http.get('/api/members/groups/' + id, {
                params: params
            });
        },
        edit: function(id, params){
            return $http.put('/api/members/groups/' + id, params);
        },
        delete: function(id){
            return $http.delete('/api/members/groups/' + id);
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
            if(typeof type === 'undefined') type = 'info';
            toastr.options.closeButton = true;
            toastr[type](message);
        },
        clear: function() {
            toastr.clear();
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

    // Delete member
    $scope.delete = function(member, index){
        $scope.members.data[index].spin = true;
        MembersService.delete(member.id).success(function(){
            FlashService.set('Member successfully deleted!!', 'success');
            $scope.members.data.splice(index, 1);
        }).error(function(response){
            FlashService.set(response.message, 'error');
            $scope.members.data[index].spin = false;
        });
    };

    // Activate/Deactivate member
    $scope.toggleActive = function(member, index){
        $scope.members.data[index].spinActive = true;

        MembersService.edit(member.id, {'active': (member.active ? 0 : 1)}).success(function(){
            $scope.members.data[index].spinActive = false;
            FlashService.set('Member successfully ' + (member.active ? 'deactivated' : 'activated') + '!!', 'success');
            $scope.members.data[index].active = member.active ? 0 : 1;
        }).error(function(error){
            $scope.members.data[index].spinActive = false;
            FlashService.set(error.message, 'error');
        });
    };

    // Edit member form
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

                    MembersService.edit($scope.member.id, $scope.member).error(function(error){
                        FlashService.set(error.message, 'error');
                        $location.path('/members', $location.search());
                    });
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

app.controller('GroupsController', function($scope, $location, $routeParams, FlashService, GroupsService, $modal, groups, group){
    $scope.groups = {};
    if(!$.isEmptyObject(groups.data.data))
        $scope.groups.data = groups.data.data;
    if(groups.data.meta)
        $scope.groups.pagination = groups.data.meta.pagination;

    // Delete group
    $scope.delete = function(group, index){
        $scope.groups.data[index].spin = true;
        GroupsService.delete(group.id).success(function(){
            FlashService.set('Group successfully deleted!!', 'success');
            $scope.groups.data.splice(index, 1);
        }).error(function(response){
            FlashService.set(response.message, 'error');
            $scope.groups.data[index].spin = false;
        });
    };

    // Edit group form
    if(group && !$.isEmptyObject(group.data.data))
    {
        var $modalInstance = $modal.open({
            backdrop: 'static',
            templateUrl: "../../templates/groups/edit.html",
            controller: function($scope) {
                $scope.group = group.data.data;
                $scope.save = function(){

                    // Temporary remove some date fields until we make them editable
                    delete $scope.group.training;

                    GroupsService.edit($scope.group.id, $scope.group).error(function(error){
                        FlashService.set(error.message, 'error');
                        $location.path('/members/groups', $location.search());
                    });
                    FlashService.set('Group successfully saved!!', 'success');
                    $location.path('members/groups', $location.search());
                    $modalInstance.dismiss();
                };
                $scope.cancel = function(){
                    $location.path('members/groups', $location.search());
                    $modalInstance.dismiss();
                }
            }
        });
    }
});
