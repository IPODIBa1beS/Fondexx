<footer class="footer">
    <?php if ($logo): ?>
      <a class="logo navbar-btn" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
        <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
      </a>
    <?php endif; ?>

    <?php
      $menu_block = module_invoke('system', 'block_view', 'main-menu');
      print render($menu_block['content']);
    ?>

    <div class="social">
      ...
    </div>

    <div class="<?php print $container_class; ?>">
      <?php print render($page['footer']); ?>
    </div>
</footer>
