<footer class="footer">
    <?php if ($logo): ?>
      <a class="logo navbar-btn" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
        <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
      </a>
    <?php endif; ?>

    <?php if (!empty($primary_nav)): ?>
      <?php print render($primary_nav); ?>
    <?php endif; ?>

    <div class="social">
      ...
    </div>

    <div class="<?php print $container_class; ?>">
      <?php print render($page['footer']); ?>
    </div>
</footer>
