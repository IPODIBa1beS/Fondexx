<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup templates
 */
$img_url = null;
?>

<?php if ( !empty($node) ) {
  $style = "";
  if ($node->field_bg) {
    $img_url = drupal_basename($node->field_bg['und'][0]['uri']);
    //$path =  drupal_basename($img_url);
  }
}?>

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
            <a href="/registration" class="button button-dark-blue button-login">Открыть счет</a>
            <a href="http://pc.fondexx.com/" class="button button-dark-blue button-login">Вход</a>
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
                <li><a href="/company/contacts" class="header_contacts-link phone">+38 (044)-332-00-18</a></li>
                <li><a href="/company/contacts" class="header_contacts-link phone">+38 (044)-200-55-21</a></li>
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
        <div>
            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="register">
                    <i class="ion-ios-close-empty close-overlay-popup"></i>
                    <h2>Открыть счет</h2>
                    <?php
                        $register_block = module_invoke('webform', 'block_view', 'client-block-177');
                        print render($register_block['content']);
                    ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="login">
                    <i class="ion-ios-close-empty close-overlay-popup"></i>
                    <h2>Вход</h2>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Пароль</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
                        </div>
                        <div class="checkbox">
                            <a href="#">Забыли пароль?</a>
                        </div>
                        <button type="submit" class="btn btn-default">Вход</button>
                    </form>
                </div>
            </div>

        </div>

    </div>
    
  </div>
</header>

<?php if ($img_url): ?>
    <div id="myid" style="background-image: url('/sites/default/files/<?php print $img_url;?>'); height: 100px;"></div>
<?php endif; ?>

<div class="main-container <?php print $container_class; ?>">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </header> <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <?php if (!empty($breadcrumb)): print $breadcrumb; endif;?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php if (!empty($tabs)): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <?php if (!empty($action_links)): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
    </section>

    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
</div>

<?php if (!empty($page['page_footer'])): ?>
  <div class="col-sm-12">
    <?php print render($page['page_footer']); ?>
  </div>
<?php endif; ?>

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
          <li><a href="https://vk.com/fondexx" target="_blank"><i class="icon icon-vk"></i></a></li>
        <li><a href="https://www.facebook.com/fondexx" target="_blank"><i class="ion-social-facebook"></i></a></li>
<!--        <li><a href="#"><i class="ion-social-googleplus"></i></a></li>-->
    </ul>

    <div class="<?php print $container_class; ?>">
      <?php print render($page['footer']); ?>
    </div>
</footer>

