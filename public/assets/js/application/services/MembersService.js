app.factory("MembersService", function($http, FlashService, DateService, $location) {
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

            // Change format of date fields
            if(typeof params.dob != 'undefined') params.dob = DateService.forDatabase(params.dob);
            if(typeof params.dos != 'undefined') params.dos = DateService.forDatabase(params.dos);
            if(typeof params.doc != 'undefined') params.doc = DateService.forDatabase(params.doc);

            return $http.put('/api/members/' + id, params);
        },
        delete: function(id){
            return $http.delete('/api/members/' + id);
        }
    }
});