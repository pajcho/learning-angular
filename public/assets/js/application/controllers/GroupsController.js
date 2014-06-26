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