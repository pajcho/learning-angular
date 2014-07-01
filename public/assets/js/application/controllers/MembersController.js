app.controller('MembersController', function($scope, $location, $routeParams, FlashService, DateService, MembersService, GroupsService, $modal, members, member, groups){
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
            size: 'lg',
            templateUrl: "../../templates/members/edit.html",
            controller: function($scope) {
                $scope.groups = groups.data.data;

                $scope.member = member.data.data;
                $scope.member.dob = DateService.forDatepicker($scope.member.dob);
                $scope.member.dos = DateService.forDatepicker($scope.member.dos);
                $scope.member.doc = DateService.forDatepicker($scope.member.doc);

                $scope.save = function(){
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