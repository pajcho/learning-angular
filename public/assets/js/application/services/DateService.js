app.factory("DateService", function($rootScope) {
    return $rootScope.DateService = {
        forDatepicker: function(date){
            if(date == '') return null;
            var date = moment(date, 'YYYY-MM-DD HH:mm:ss');
            return date.toDate();
        },
        forDatabase: function(date){
            if(date == null) return null;
            var date = moment(date);
            return date.format('YYYY-MM-DD HH:mm:ss');
        }
    }
});