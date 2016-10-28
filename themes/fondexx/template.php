<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

function fondexx_preprocess_page(&$vars) {

  // Do we have a node?
  if (isset($vars['node'])) {

    // Ref suggestions cuz it's stupid long.
    $suggests = &$vars['theme_hook_suggestions'];

    // Get path arguments.
    $args = arg();
    // Remove first argument of "node".
    unset($args[0]);

    // Set type.
    $type = "page__type_{$vars['node']->type}";

    // Bring it all together.
    $suggests = array_merge(
      $suggests,
      array($type),
      theme_get_suggestions($args, $type)
    );

    // if the url is: 'http://domain.com/node/123/edit'
    // and node type is 'blog'..
    //
    // This will be the suggestions:
    //
    // - page__node
    // - page__node__%
    // - page__node__123
    // - page__node__edit
    // - page__type_blog
    // - page__type_blog__%
    // - page__type_blog__123
    // - page__type_blog__edit
    //
    // Which connects to these templates:
    //
    // - page--node.tpl.php
    // - page--node--%.tpl.php
    // - page--node--123.tpl.php
    // - page--node--edit.tpl.php
    // - page--type-blog.tpl.php          << this is what you want.
    // - page--type-blog--%.tpl.php
    // - page--type-blog--123.tpl.php
    // - page--type-blog--edit.tpl.php
    //
    // Latter items take precedence.
  }
}

function fondexx_pager_link($variables) {
    $text = $variables['text'];
    $page_new = $variables['page_new'];
    $element = $variables['element'];
    $parameters = $variables['parameters'];
    $attributes = $variables['attributes'];

    $page = isset($_GET['page']) ? $_GET['page'] : '';
    if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
        $parameters['page'] = $new_page;
    }

    $query = array();
    if (count($parameters)) {
        $query = drupal_get_query_parameters($parameters, array());
    }
    if ($query_pager = pager_get_query_parameters()) {
        $query = array_merge($query, $query_pager);
    }

    // Set each pager link title
    if (!isset($attributes['title'])) {
        static $titles = NULL;
        if (!isset($titles)) {
            $titles = array(
                t('« first') => t('Go to first page'),
                t('‹ previous') => t('Go to previous page'),
                t('next ›') => t('Go to next page'),
                t('last »') => t('Go to last page'),
            );
        }
        if (isset($titles[$text])) {
            $attributes['title'] = $titles[$text];
        }
        elseif (is_numeric($text)) {
            $attributes['title'] = t('Go to page @number', array('@number' => $text));
        }
    }

    // @todo l() cannot be used here, since it adds an 'active' class based on the
    //   path only (which is always the current path for pager links). Apparently,
    //   none of the pager links is active at any time - but it should still be
    //   possible to use l() here.
    // @see http://drupal.org/node/1410574
    $attributes['href'] = url($_GET['q'], array('query' => $query));
    return '<a' . drupal_attributes($attributes) . '><span>' . check_plain($text) . '</span></a>';
}