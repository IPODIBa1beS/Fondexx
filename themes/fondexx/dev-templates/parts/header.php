<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
    <div class="<?php print $container_class; ?>">
    
    <div class="navbar-header">
        <div class="toggle-btn-wrapper">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span> 
        </button>
        </div>

        <?php if ($logo): ?>
            <a class="logo navbar-btn" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
                <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
            </a>
        <?php endif; ?>

        <?php if (!empty($primary_nav)): ?>
            <?php print render($primary_nav); ?>
        <?php endif; ?>
        <div class="login-btn-wrapper">
            <a href="#register" id="register" aria-controls="register" role="tab" data-toggle="tab" class="button button-dark-blue button-login">Открыть счет</a>
            <a href="#login" id="login" aria-controls="login" role="tab" data-toggle="tab" class="button button-dark-blue button-login">Вход</a>
        </div>
    </div>
    <div class="header_content">
        <div class="header_links" id="header_links">
            <ul class="header_links-list"></ul>

            <!-- add region for block -->
            <?php if (!empty($page['header_links'])): ?>
                <?php print render($page['header_links']); ?>
            <?php endif; ?>
        </div>
        <div class="header_contacts">
            <div class="header_contacts-wrapper">
            <a href="/study/faq" class="button btn">faq</a>
            </div>
            <ul class="header_contacts-list">
                <li><a href="#" class="header_contacts-link phone">+38 (044)-200-55-21</a></li>
                <li><a href="#" class="header_contacts-link phone">+38 (044)-200-55-21</a></li>
                <li><a href="#" class="header_contacts-link skype">live:fondexx_1</a></li>
            </ul>
        </div>
    </div>
    <!-- Overlay menu -->
    <div class="navbar-collapse collapse">
        <nav role="navigation">
            <i class="ion-ios-close-empty close-overlay"></i>
            <?php if (!empty($primary_nav)): ?>
                <?php print render($primary_nav); ?>
            <?php endif; ?>
          
            <?php if (!empty($secondary_nav)): ?>
                <?php print render($secondary_nav); ?>
            <?php endif; ?>
            
            <?php if (!empty($page['navigation'])): ?>
                <?php print render($page['navigation']); ?>
            <?php endif; ?>
        </nav>
    </div>

    <div id="register_block" class="header-popup">
        <!--(bake register.php)-->
    </div>
    
  </div>
</header>