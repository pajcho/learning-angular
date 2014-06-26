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