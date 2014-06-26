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