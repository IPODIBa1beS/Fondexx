(function ($) {
    $(function() {
        
        /*function disableBootstrapMenuDropdown() {
            $('#navbar .navbar-nav .dropdown-toggle').data('toggle', '').removeAttr('data-toggle');;
        }*/
        
        function wrapCollapse(container, child, header, content) {
            var $conatainer = $(container),
                $child = $conatainer.find(child);
            
            $child.each(function( index ) {
                var $this = $(this);
                    $header = $this.find(header),
                    $content = $this.find(content),
                    $header.wrap( '<a class="" role="button" data-toggle="collapse" href="#collapse' + index + '" aria-expanded="false" aria-controls="collapse' + index + '"></a>');
                    $content.wrap('<div class="collapse" id="collapse' + index + '"></div>');
            });  
        }
        
        function replaceTablePlusMinus2icons() {
            $("table td").filter(function() {
                return $(this).text() === "+";
            }).html("<i class='ion-ios-checkmark-empty'></i>");
            
            $("table td").filter(function() {
                return $(this).text() === "-";
            }).html("<i class='ion-ios-close-empty'></i>");
        }
        
        
        /////////////////////////////////////
        /////////////////////////////////////
        /////////////////////////////////////
        $( document ).ready(function() {  
            // let's disable Bootstrap dropdown beh. for primary nav. We don't need it at all
            //disableBootstrapMenuDropdown();
            
            wrapCollapse('.panels-flexible-row-3-main-row', '.panel-pane', 'h2', '.pane-content');
            replaceTablePlusMinus2icons();
        });


    });
}(jQuery));
