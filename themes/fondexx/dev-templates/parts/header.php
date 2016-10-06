<header id="navbar" role="banner" class="<?php print $navbar_classes; ?>">
    <div class="<?php print $container_class; ?>">
    
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only"><?php print t('Toggle navigation'); ?></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span> 
        </button>
          
        <?php if ($logo): ?>
            <a class="logo navbar-btn" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
                <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
            </a>
        <?php endif; ?>
        
        <?php if (!empty($primary_nav)): ?>
            <?php print render($primary_nav); ?>
        <?php endif; ?>
        <a href="#" class="button button-dark-blue button-login"> Create Account / Login</a>
    </div>

    <!-- Overlay menu -->
    <div class="navbar-collapse collapse">
        <nav role="navigation">
            <i class="ion-close-round close-overlay"></i>
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
    
  </div>
</header>

<hr>