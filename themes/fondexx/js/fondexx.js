(function ($) {
    $(function() {
        
        /*function disableBootstrapMenuDropdown() {
            $('#navbar .navbar-nav .dropdown-toggle').data('toggle', '').removeAttr('data-toggle');;
        }*/
        
        function wrapCollapse(container, child, header, content) {
            var $container = $(container),
                $child = $container.find(child);
            
            $child.each(function( index ) {
                var $this = $(this);
                    $header = $this.find(header),
                    $content = $this.find(content),
                    $header.wrap( '<a class="" role="button" data-toggle="collapse" href="#collapse' + index + '" aria-expanded="false" aria-controls="collapse' + index + '"></a>');
                    $content.wrap('<div class="collapse" id="collapse' + index + '"></div>');
            });  
        }
        
        function wrapTabs(container, child, header, content) {
            var $conatainer = $(container),
                $child = $conatainer.find(child);
                
            
            $(container).prepend('<div class="tab-content"></div>');
            $(container).prepend('<ul class="nav nav-tabs" role="tablist"></ul>');
            
            $child.each(function( index ) {
                var $this = $(this);
                    $header = $this.find(header),
                    $content = $this.find(content);
                    activeclass = '';
                    
                    if (index === 0) {
                        activeclass = 'active';
                    } else {
                        activeclass = '';
                    }
                    
                    $header.wrap('<li role="presentation" class="nav-li ' + activeclass + '"><a href="#tab' + index + '" aria-controls="tab' + index + '" role="tab" data-toggle="tab"></a></li>');
                    $(container).find('li.nav-li').appendTo($(container).find('ul.nav-tabs'));
                    
                    $content.wrap('<div role="tabpanel" class="tab-pane ' + activeclass + '" id="tab' + index +'"></div>');
                    $(container).find('.tab-pane').appendTo($(container).find('.tab-content'));
            });        
        };
        
        function replaceTablePlusMinus2icons() {
            $("table td").filter(function() {
                return $(this).text() === "+";
            }).html("<i class='ion-ios-checkmark-empty'></i>");
            
            $("table td").filter(function() {
                return $(this).text() === "-";
            }).html("<i class='ion-ios-close-empty'></i>");
        }

        function preventDropdown(){
            var link = $(this).siblings('.dropdown-menu').find('.first>a').attr('href');
            location.href = link;
        }

        function showHeaderDropdownItems(){
            var listItems = $('.navbar-header .active-trail>.dropdown-menu').children();
            $(".header_links-list").html(listItems);
        }

        function insertHeaderItemsForType(menuOrder){
            var dropdowns = $('.navbar-header .dropdown>.dropdown-menu');
            var dropdownsTitle = $('.navbar-header .dropdown>.dropdown-toggle');
            $(dropdownsTitle[menuOrder]).addClass('active active-trail');
            var listItems = $(dropdowns[menuOrder]).children();
            $(".header_links-list").html(listItems);
        }
        /////////////////////////////////////
        /////////////////////////////////////
        /////////////////////////////////////
        $( document ).ready(function() {  
            // let's disable Bootstrap dropdown beh. for primary nav. We don't need it at all
            //disableBootstrapMenuDropdown();
            
            wrapCollapse('#fondexx-start-landing .panels-flexible-row-3-main-row', '.panel-pane', 'h2', '.pane-content');
            wrapCollapse('.panels-flexible-5 .panels-flexible-row-5-main-row', '.panel-pane', 'h2', '.pane-content');
            wrapTabs('#front-panel .panels-flexible-row-7-1', '.panel-pane', 'h2', '.pane-content');
            replaceTablePlusMinus2icons();
            showHeaderDropdownItems();

            $(".dropdown-toggle").on('click', function (e) {
                e.stopImmediatePropagation();

                preventDropdown();
            });

            $('.close-overlay').on('click', function(e){
                $('.navbar-collapse').removeClass('in');
            });

            var body = $("body");
            if(body.hasClass('page-node-96') || body.hasClass('node-type-article')){
                insertHeaderItemsForType(0);
            }

            if(body.hasClass('page-node-99') || body.hasClass('page-node-100') || body.hasClass('page-node-101') || body.hasClass('page-node-102')){
                insertHeaderItemsForType(1);
            }

            if(body.hasClass('node-type-analytics')){
                insertHeaderItemsForType(3);
            }

            if(body.hasClass('page-study-faq') || body.hasClass('page-study-start') || body.hasClass('page-study-pro')){

                $("a[data-toggle=collapse]").on('click', function (e) {

                    $(this).toggleClass('is-open');
                });
            }
        });
    });
}(jQuery));
