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