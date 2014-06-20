/**
 * Create a confirm modal
 * We want to send an HTTP DELETE request
 *
 * @usage  <a href="posts/2" data-method="delete" data-modal-text="Are you sure you want to delete">
 *
 */
var confirmPopup =
{
    initialize: function()
    {
        this.methodLinks = $('a[data-method]');
        this.registerEvents();
    },

    registerEvents: function()
    {
        this.methodLinks.on('click', this.handleMethod);
    },

    handleMethod: function(e)
    {
        e.preventDefault();
        var link = $(this);

        var httpMethod = link.data('method').toUpperCase();
        var allowedMethods = ['PUT', 'DELETE'];
        var extraMsg = link.data('modal-text');

        // Set default message ending if none is defined
        if(typeof extraMsg == "undefined") extraMsg = "do this?";

        var msg  = '<i class="glyphicon glyphicon-warning-sign modal-icon text-danger"></i>&nbsp;Are you sure you want to&nbsp;' + extraMsg;

        // If the data-method attribute is not PUT or DELETE,
        // then we don't know what to do. Just ignore.
        if ( $.inArray(httpMethod, allowedMethods) === - 1 )
        {
            return;
        }

        bootbox.dialog({
            message: msg,
            title: "Please Confirm",
            buttons: {
                success: {
                    label: "OK",
                    className: "btn-danger",
                    callback: function() {
                        var form =
                            $('<form>', {
                                'method': 'POST',
                                'action': link.attr('href')
                            });

                        var hiddenInput =
                            $('<input>', {
                                'name': '_method',
                                'type': 'hidden',
                                'value': link.data('method')
                            });

                        form.append(hiddenInput).appendTo('body').submit();
                    }
                },
                danger: {
                    label: "Cancel",
                    className: "btn-default"
                }
            }
        });
    }
};

$(document).ready(function(){

    var dateFormat = 'DD.MM.YYYY';
    var timeFormat = 'HH:mm';

    var applicationInit = function()
    {
        $('.datetimepicker input').each(function(){
            $(this).attr('data-format', dateFormat + ' ' + timeFormat);
            $(this).datetimepicker({});
        });

        $('.datepicker input').each(function(){
            $(this).attr('data-format', dateFormat);
            $(this).datetimepicker({
                pickTime: false
            });
        });

        $('.timepicker input').each(function(){
            $(this).attr('data-format', timeFormat);
            $(this).datetimepicker({
                pickDate: false
            });
        });

        $(document).on('submit', '.delete-form', function(){
            return confirm('Are you sure you want to delete this item?');
        });

        // Close alert messages after some time
        // except when message is error
        if($('.alert-message').length > 0)
        {
            $('.alert-message').each(function(){
                if(!$(this).hasClass('alert-danger'))
                {
                    var element = $(this);
                    window.setTimeout(function(){ return $('.close', element).click(); }, 3000);
                }
            });
        }

        // Select2 bindings
        if($('select').length > 0)
        {
            $('select').each(function(){
                $(this).select2({
                    minimumResultsForSearch: 5
                });
            });
        }

        // Tooltips
        $('[title]').tooltip();

        // Confirmation popups
        confirmPopup.initialize();
    }

    applicationInit();

});