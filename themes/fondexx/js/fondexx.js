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

        function imgToSVG(){
            /*
             * Replace all SVG images with inline SVG
             */

            jQuery('img.svg').each(function(){
                var $img = jQuery(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');

                jQuery.get(imgURL, function(data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = jQuery(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    if(typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if(typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass+' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                    }

                    // Replace image with new SVG
                    $img.replaceWith($svg);

                }, 'xml');

            });
        }

        function validateEmail(emailId) {
            var emailValue = $(emailId).val();
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(emailValue.length !== 0 && re.test(emailValue)) {
                $(emailId).css('border', '1px solid #bdc2d4');
                return true;
            } else {
                $(emailId).css('border', '1px solid red');
                return false;
            }
        }

        function validateTel(telId) {
            var telValue = $(telId).val().trim();
            var re = /^((8|0|((\+|00)\d{1,2}))[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
            if(re.test(telValue) ){
                $(telId).css('border', '1px solid #bdc2d4');
                return true;
            } else {
                $(telId).css('border', '1px solid red');
                return false;
            }

        }

        function validateNotEmpty(id){
            var value = $(id).val();
            if( value.length !== 0){
                $(id).css('border', '1px solid #bdc2d4');
                return true;
            } else {
                $(id).css('border', '1px solid red');
                return false
            }
        }

        function validateCheckbox(checkboxId, labelId){
            var checked = $(checkboxId).is(':checked');
            console.log('checked '+checked);
            if(checked){
                $(labelId).css('border', '0 none');

                return true;
            } else {
                $(labelId).css('border', '1px solid red');
                return false;
            }
        }
        function disableSubmit (selector) {
            $(selector).prop('disabled', true);
            $(selector).css({
                "opacity": "0.2",
                "cursor": "default"
            });
        }

        function enableSubmit (selector) {
            $(selector).prop('disabled', false);
            $(selector).css({
                "opacity": "1",
                "cursor": "pointer"
            });
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
            imgToSVG();

            //
            //disableSubmit(".page-trade-demo .pane-webform-client-block-177 #webform-client-form-177 .form-submit");
            //disableSubmit("#register_block #webform-client-form-177 .form-submit");
            //disableSubmit(".page-study-initial-point #block-system-main .form-submit");
            //disableSubmit(".page-study-pro #block-system-main .form-submit");
            //disableSubmit(".page-analytics-traderhub #block-system-main .form-submit");
            //disableSubmit(".page-node-107 #block-system-main .form-submit");


            /////////////////////////
            ///4 CRM code

            var config1 = {
                fields: {
                    "Name": ".page-trade-demo .pane-webform-client-block-177 #edit-submitted-imya", // Имя посетителя, заполнившего форму
                    "UsrSurname": ".page-trade-demo .pane-webform-client-block-177 #edit-submitted-familiya",
                    "Email": ".page-trade-demo .pane-webform-client-block-177 #edit-submitted-e-mail", // Email посетителя
                    "MobilePhone": ".page-trade-demo .pane-webform-client-block-177 #edit-submitted-telefon", // Телефон посетителя
                },
                landingId: "62ff6948-1e98-4bdd-b84c-6666c121bf94",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: "http://pc.fondexx.com/"
            };

            var config2 = {
                fields: {
                    "Name": "#register_block #edit-submitted-imya", // Имя посетителя, заполнившего форму
                    "UsrSurname": "#register_block #edit-submitted-familiya",
                    "Email": "#register_block #edit-submitted-e-mail", // Email посетителя
                    "MobilePhone": "#register_block #edit-submitted-telefon", // Телефон посетителя
                },
                landingId: "62ff6948-1e98-4bdd-b84c-6666c121bf94",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: "http://pc.fondexx.com/"
            };

            var config3 = {
                fields: {
                    "Name": ".page-study-initial-point #block-system-main #edit-submitted-imya", // Имя посетителя, заполнившего форму
                    "UsrSurname": ".page-study-initial-point #block-system-main #edit-submitted-familiya", // Email посетителя
                    "Email": ".page-study-initial-point #block-system-main #edit-submitted-e-mail", // Почтовый индекс посетителя
                    "MobilePhone": ".page-study-initial-point #block-system-main #edit-submitted-telefon", // Телефон посетителя
                },
                landingId: "8e05cb22-cbd3-4b0e-b5bb-8145640a2704",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: "http://pc.fondexx.com/ "
            };

            var config4 = {
                fields: {
                    "Name": ".page-study-pro #block-system-main #edit-submitted-imya", // Имя посетителя, заполнившего форму
                    "UsrSurname": ".page-study-pro #block-system-main #edit-submitted-familiya", // Email посетителя
                    "Email": ".page-study-pro #block-system-main #edit-submitted-e-mail", // Почтовый индекс посетителя
                    "MobilePhone": ".page-study-pro #block-system-main #edit-submitted-telefon", // Телефон посетителя
                },
                landingId: "37b0f213-6187-4fa0-98ca-7d34407c6526",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: "http://fondexx.com/study/pro/thankyou1 "
            };

            var config5 = {
                fields: {
                    "Name": ".page-analytics-traderhub #block-system-main #edit-submitted-imya", // Имя посетителя, заполнившего форму
                    "UsrSurname": ".page-analytics-traderhub #block-system-main #edit-submitted-familiya", // Email посетителя
                    "Email": ".page-analytics-traderhub #block-system-main #edit-submitted-e-mail", // Почтовый индекс посетителя
                    "MobilePhone": ".page-analytics-traderhub #block-system-main #edit-submitted-telefon", // Телефон посетителя
                },
                landingId: "e61f656d-66c9-4eca-be60-c529946d80c7",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: " http://fondexx.com/analytics/traderhub/thankyou3 "
            };

            var config6 = {
                fields: {
                    "Name": ".page-node-107 #block-system-main #edit-submitted-fio", // Имя посетителя, заполнившего форму
                    "UsrSurname": ".page-node-107 #block-system-main #edit-submitted-fio", // Email посетителя
                    "Email": ".page-node-107 #block-system-main #edit-submitted-email", // Почтовый индекс посетителя
                    "MobilePhone": ".page-node-107 #block-system-main #edit-submitted-phone", // Телефон посетителя
                },
                landingId: "8b14fd9d-0466-44cc-992d-ea5a64ecd432",
                serviceUrl: "https://fondexx.bpmonline.com/0/ServiceModel/GeneratedWebFormService.svc/SaveWebFormLeadData",
                redirectUrl: "http://fondexx.com/company/job/thankyou4"
            };

            ///Page trade-demo
            $( ".page-trade-demo .pane-webform-client-block-177 #webform-client-form-177 .form-submit").on("click", function() {
                var name = validateNotEmpty('.page-trade-demo .pane-webform-client-block-177 #edit-submitted-imya');
                var lastName = validateNotEmpty('.page-trade-demo .pane-webform-client-block-177 #edit-submitted-familiya')
                var email = validateEmail(' .page-trade-demo .pane-webform-client-block-177 #edit-submitted-e-mail');
                var tel = validateTel('.page-trade-demo .pane-webform-client-block-177 #edit-submitted-telefon');
                var checkbox = validateCheckbox('.page-trade-demo .pane-webform-client-block-177 #edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1', '.page-trade-demo .pane-webform-client-block-177 .webform-component--ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami')

                if (name && lastName && email && tel && checkbox) {
                  landing.createLeadFromLanding(config1);
                }
            });


            $( "#register_block #webform-client-form-177 .form-submit").on("click", function() {
                var name = validateNotEmpty('#register_block #edit-submitted-imya');
                var lastName = validateNotEmpty('#register_block #edit-submitted-familiya');
                var email = validateEmail('#register_block #edit-submitted-e-mail');
                var tel = validateTel('#register_block #edit-submitted-telefon');
                var checkbox =   validateCheckbox('#register_block #edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1','#register_block .webform-component--ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami');
                if ( name && lastName && email && tel && checkbox) {
                 landing.createLeadFromLanding(config2);
                }
            });


            //nyse init point
            $( ".page-study-initial-point #block-system-main .form-submit").on("click", function() {
                var name = validateNotEmpty('.page-study-initial-point #block-system-main #edit-submitted-imya');
                var lastName = validateNotEmpty('.page-study-initial-point #block-system-main #edit-submitted-familiya');
                var email = validateEmail('.page-study-initial-point #block-system-main #edit-submitted-e-mail');
                var tel = validateTel('.page-study-initial-point #block-system-main #edit-submitted-telefon');
                var checkbox =   validateCheckbox('.page-study-initial-point #block-system-main #edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1','.page-study-initial-point #block-system-main .webform-component--ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami');
                if ( name && lastName && email && tel && checkbox) {
                 landing.createLeadFromLanding(config3);
                }
            });

            //study-pro
            $( ".page-study-pro #block-system-main .webform-client-form-180 .form-submit").on("click", function() {

                if (
                    validateNotEmpty('.page-study-pro #block-system-main #edit-submitted-imya') &&
                    validateNotEmpty('.page-study-pro #block-system-main #edit-submitted-familiya') &&
                    validateEmail('.page-study-pro #block-system-main #edit-submitted-e-mail') &&
                    validateTel('.page-study-pro #block-system-main #edit-submitted-telefon') &&
                    validateCheckbox('.page-study-pro #block-system-main #edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1', '.page-study-pro #block-system-main label[for="#edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1"]')
                ) {
                    landing.createLeadFromLanding(config4);
                }
            });

            //idea trade hub
            $( ".page-analytics-traderhub #block-system-main .form-submit").on("click", function() {
                var name = validateNotEmpty('.page-analytics-traderhub #block-system-main #edit-submitted-imya');
                var lastName = validateNotEmpty('.page-analytics-traderhub #block-system-main #edit-submitted-familiya');
                var email = validateEmail('.page-analytics-traderhub #block-system-main #edit-submitted-e-mail');
                var tel = validateTel('.page-analytics-traderhub #block-system-main #edit-submitted-telefon');
                var checkbox =  validateCheckbox('.page-analytics-traderhub #block-system-main #edit-submitted-ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami-1', '.page-analytics-traderhub #block-system-main .webform-component--ya-oznakomlena-so-vsemi-reglamentiruyushchimi-dokumentami');

                if (name && lastName && email && tel && checkbox) {
                  landing.createLeadFromLanding(config5);
                }
            });

            //vacancy
            $( ".page-node-107 #block-system-main .form-submit").on("click", function() {
               var name = validateNotEmpty('.page-node-107 #block-system-main #edit-submitted-fio');
               var email = validateEmail('.page-node-107 #block-system-main #edit-submitted-email');
               var tel = validateTel('.page-node-107 #block-system-main #edit-submitted-phone');
                if ( name && email && tel) {
                    landing.createLeadFromLanding(config6);
                }
            });

            ///////////////////
            ///END 4 crm code block

            $(".dropdown-toggle").on('click', function (e) {
                e.stopImmediatePropagation();

                preventDropdown();
            });

            $('.close-overlay').on('click', function(e){
                $('.navbar-collapse').removeClass('in');
            });

            $('#login').on('click', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $('#register_block').addClass('overlay');
            });

            $('.show-signup').on('click', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $('#register_block').addClass('overlay');
            });

            $('#register').on('click', function(){
                $('#register_block').addClass('overlay');
            });

            $("#open_demo_account, #open_real_account").on('click', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $('#register_block').addClass('overlay');
            });

            $('.close-overlay-popup').on('click', function(e){
                $('#register_block').removeClass('overlay');
            });

            var body = $("body");
            if(body.hasClass('page-node-96') || body.hasClass('node-type-article')){
                insertHeaderItemsForType(0);
            }

            if(body.hasClass('page-node-99') || body.hasClass('page-node-100') || body.hasClass('page-node-101') || body.hasClass('page-node-102')){
                insertHeaderItemsForType(1);
            }

            if(body.hasClass('node-type-study-article')){
                insertHeaderItemsForType(2);
            }

            if(body.hasClass('node-type-analytics')){
                insertHeaderItemsForType(3);
            }

            if(body.hasClass('page-study-faq') || body.hasClass('page-study-start') || body.hasClass('page-study-pro')){

                $("a[data-toggle=collapse]").on('click', function (e) {

                    $(this).toggleClass('is-open');
                });
            }

            $(function () {
                $.scrollIt({
                    upKey: 38,             // key code to navigate to the next section
                    downKey: 40,           // key code to navigate to the previous section
                    easing: 'easeInBounce',      // the easing function for animation
                    scrollTime: 1000,       // how long (in ms) the animation takes
                    activeClass: 'active', // class given to the active nav element
                    onPageChange: null,    // function(pageIndex) that is called when page is changed
                    topOffset: -60           // offste (in px) for fixed top navigation
                });
            });

            setTimeout(function(){
                $('.panels-flexible-row-3-1').attr('data-scroll-index', '1');
                $('.pane-webform-client-block-180').attr('data-scroll-index', '1');
            }, 300);
        });
    });
}(jQuery));
