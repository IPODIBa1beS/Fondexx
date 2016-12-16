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

    <ul class="social-icons">
          <li><a href="https://www.facebook.com/fondexx"><i class="icon icon-vk"></i></a></li>
        <li><a href="https://vk.com/fondexx"><i class="ion-social-facebook"></i></a></li>
<!--        <li><a href="#"><i class="ion-social-googleplus"></i></a></li>-->
    </ul>

    <div class="<?php print $container_class; ?>">
      <?php print render($page['footer']); ?>
    </div>
</footer>
