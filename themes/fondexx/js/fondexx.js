(function ($) {
    $(function() {
        
        function disableBootstrapMenuDropdown() {
            $('#navbar .navbar-nav .dropdown-toggle').data('toggle', '').removeAttr('data-toggle');;
            console.log('run1');
        }
        
        $( document ).ready(function() {
            disableBootstrapMenuDropdown();
        });


    });
}(jQuery));
