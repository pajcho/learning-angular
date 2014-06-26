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