(function($) {

  /**
   * D8 base_ui scripts.js.
   *
   * @param {*}
   */


  /**
   * Position off-canvas menu.
   */
  Drupal.behaviors.offCanvasMenu = {
    attach: function (context, settings) {

      function offCanvasMenuPosition() {
        // if (true) return;
        $('[menu-mobile] > ul', context).once('offCanvasMenuPosition').each(function () {
          var $menu = $(this);
          // console.log($menu);
          // let status = $menu.attr('off-canvas-status');
          let status = 0;
          let offset = round($menu.outerWidth() * status, 0) + 1;
          // Init position - translateX of menu-width.
          // $menu.css({
          //   // 'left': offset + 'px',
          //   // 'transform': 'translateX(' + offset + 'px)',
          //   'opacity': status,
          // });

          function toggleMenu($menu, status = null) {
            if (status !== null) {
              status = 0;
              console.log('override')
            }
            else {
              status = $menu.parent().attr('off-canvas-status');
              status = status == 0 ? 1 : 0;
            }
            // invert status
            let offset = round($menu.outerWidth() * status * -1, 0) + 1;
            // $menu.velocity({
            //   // 'translateX': (offset * -1) + 'px',
            //   'opacity': status,
            // }, {
            //   duration: 50,
            //   easing: 'easein',
            // });
            $menu.parent().attr('off-canvas-status', status);
            $menu.parent().toggleClass('menu-closed');
            $('body').toggleClass('off-canvas-menu-active');
            // let $logo = $('.site-branding');
            $canvas.toggleClass('active');
          }

          let $burger = $('[action-target="menu-mobile"]').parent();
          $burger.click(function(e){
            toggleMenu($menu);
          });
          let $canvas = $('#menu-canvas');
          $canvas.click(function(e){
            toggleMenu($menu, 0);
          });


        });
      }

      offCanvasMenuPosition();

      var waitForFinalEvent = (function() {
        var timers = {};
        return function(callback, ms, uniqueId) {
          if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
          }
          if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
          }
          timers[uniqueId] = setTimeout(callback, ms);
        };
      })();

      $(window).resize(function() {
        // console.log('resizing');
        waitForFinalEvent(function() {
          offCanvasMenuPosition();
          // $menu.attr('off-canvas-status', 0);
        }, 500);
        $('[menu-mobile]').addClass('menu-closed').attr('off-canvas-status', 0);
      });


    }
  };

  /**
   * Initialize Featherlight Slideshow elements.
   */
  Drupal.behaviors.featherlightSlideshow = {
    attach: function (context, settings) {

      let prev = '<img src="/themes/base_ui/images/arrow-prev.svg">';
      let next = '<img src="/themes/base_ui/images/arrow-next.svg">';
      $('a[featherlight-item]').featherlightGallery({
        previousIcon: prev,
        nextIcon: next,
        galleryFadeIn: 300,
        openSpeed: 300,
        closeOnClick: 'background',
      });

      // Load caption from title attribute...
      // Todo: load from php caption value.
      $.featherlightGallery.prototype.afterContent = function() {
        var caption = this.$currentTarget.find('img').attr('title');
        this.$instance.find('.caption').remove();
        $('<div class="caption">').html('<p>' + caption + '</p>').appendTo(this.$instance.find('.featherlight-content'));
      };

      // $.featherlight.prototype.resize = function(w, h) {
      //   if (w && h) {
      //     /* Reset apparent image size first so container grows */
      //     this.$content.css('width', '').css('height', '');
      //     this.$content.parent().css({
      //       // 'height': 'unset',
      //       // 'width': 'unset',
      //     });

      //     // Change wrapper height & width in order to 'cinch' slideshow items.
      //     let h = $(window).outerHeight() - 200;
      //     let w = $(window).outerWidth() - 200;
      //     let h_diff = h - this.$content.outerHeight();
      //     let w_diff = w - this.$content.outerWidth();
      //     let h_offset = h - h_diff + 'px';
      //     let w_offset = w - w_diff + 'px';
      //     this.$content.parent().css({
      //       // 'height': h_offset,
      //       // 'width': w_offset,
      //     });



          // /* Rescale only if the image does not fit in the window */
          // if (this.$content.parent().width() < w || this.$content.parent().height() < h) {
          //   /* Calculate the worst ratio so that dimensions fit */
          //   /* Note: -1 to avoid rounding errors */
          //   let height_offset = this.$instance.find('.caption').outerHeight();
          //   var ratio = Math.max(
          //     w  / (this.$content.parent().width()-1),
          //     h / (this.$content.parent().height()-1));
          //   /* Resize content */
          //   if (ratio > 1) {
          //     ratio = h / Math.floor(h / ratio); /* Round ratio down so height calc works */
          //     // this.$content.css('width', '' + w / ratio + 'px').css('height', '' + h / ratio + 'px');
          //     // this.$content.css('width', 'auto').css('height', '' + (h / ratio) - height_offset + 'px');
          //     // this.$content.css('width', 'auto').css('height', 'auto');
          //   }
          // }
      //   }
      // };

      // $.featherlightGallery.prototype.afterContent = function() {
      //   let caption_height = this.$instance.find('.caption').outerHeight();
      //   console.log(this.$content);
      //   let new_height = this.$content.outerHeight() - (caption_height * 2);
      //   this.$content.css({
      //     'height': new_height + 'px',
      //     'width': 'auto'
      //   });
      //   console.log(new_height);
      // };

      $.featherlightGallery.prototype.beforeContent = function() {
        if ($('.featherlight-content').parent().attr('id') != 'featherlight-wrapper') {
          // $('.featherlight-content').wrap('<div id="featherlight-wrapper">');
        }
      };

    }
  }

  /**
   * Inititalize page-tab items. Currently only works with one per page.
   */
  Drupal.behaviors.pageTabs = {
    attach: function (context, settings) {
      $('#page-tabs', context).once('pageTabs').each(function () {
        // Create Tabmenu & controls.
        var $pageTabs = $(this);
        let tabs = $pageTabs.find('[page-tab]');
        $pageTabs.find('[page-tab]').first().addClass('active');
        let tabLabelSelector = 'page-tabs__tab-labels';
        let tabLabelWrapper = '<ul id="' + tabLabelSelector + '">';
        $(tabLabelWrapper).insertBefore($pageTabs);
        let $tabLabelWrapper = $('#' + tabLabelSelector);
        $tabLabelWrapper.attr('page-tabs-labels', '');
        $.each(tabs, function(i){
          let $tab = $(this);
          // let $label = $tab.find('.field__label').first();
          let $label = $tab.find('h6').first().addClass('field__label visually-hidden');
          let $tabItem = $('<li><a href="#">');
          $tabLabelWrapper.append($tabItem);
          let $tabLink = $tabLabelWrapper.find('a').last();

          // Insert text from corresponding field-label.
          $tabLink.text($label.text()).attr('page-tab-index', $(this).attr('page-tab'));

          // Click function.
          $tabLink.click(function(e){
            // e.preventDefault();
            let index = $(this).attr('page-tab-index');
            // Reset active link settings.
            $tabLabelWrapper.find('li').removeClass('active-trail').find('a').removeClass('active').parent();
            $(this).addClass('active').parent().addClass('active-trail');
            // Reset active tab settings.
            $pageTabs.find('[page-tab].active').removeClass('active');
            $pageTabs.find('[page-tab="' + index + '"]').addClass('active');
            // @TODO : add ?parameters to allow direct links.
            // var loc = location.href;
            // loc += loc.indexOf("?") === -1 ? "?" : "&";
            // location.href = loc + "?page-tab-index=" + index;
          });

        });

      });
    }
  }

  // /**
  //  * Custom UI for pageTabs menu behavior
  //  */
  // Drupal.behaviors.pageTabsUI = {
  //   attach: function (context, settings) {
  //     // $('[page-tabs-labels]', context).once('pageTabsUI').each(function () {
  //     //   let $labels = $(this);
  //     //   $labels.find('li').first().appendTo($(this)).addClass('hide-on-load');
  //     //   $labels.find('a').click(function(){
  //     //     $labels.find('li').removeClass('hide-on-load');
  //     //   });
  //     // });
  //   }
  // }

  /**
   * Init Masonry grids.
   */
  Drupal.behaviors.masonryInit = {
    attach: function (context, settings) {
      let selector = '.content-type-exhibition .field--name-field-images.field--type-entity-reference-revisions';
      // $(selector, context).once('masonryInit').each(function () {
      //   let $masonry = $(this);
      //   $masonry.imagesLoaded( function() {
      //     $masonry.masonry({
      //       itemSelector: '.masonry-item',
      //       columnWidth: '.masonry-item'
      //     });
      //   });
      // });
    }
  }

  /**
   * Init dropdown menus.
   */
  Drupal.behaviors.dropdownMenu = {
    attach: function (context, settings) {
      $('#main-navigation nav[menu-desktop]', context).once('dropdownMenu').each(function () {

        let $menu = $(this);
        let $canvas = $('#menu-canvas');

        $menu.attr('dropdown-active', 0);
        $menu.find('li a').click(function(e){
          // let $link = $(this);
          let $link = $(this).parent().children('a');
          let $submenu = $(this).parent().children('ul');
          // console.log($link);
          // console.log($submenu);
          // If submenu exists under this link, toggle open.
          // e.preventDefault();
          toggleDropdown($menu, $submenu, $link, e, null, $);
        });

        $canvas.click(function(e){
          toggleDropdown($menu, false, false, e, -1, $);
        });

      });
    }
  }

  /**
   *
   */
  Drupal.behaviors.bodyActions = {
    attach: function (context, settings) {
      $('body', context).once('bodyActions').each(function () {
        $(window).resize(function(e){
          toggleDropdown($('#main-navigation nav[menu-desktop]'), false, false, e, -1, $);
        });


      });
    }
  };

})(jQuery);

function toggleDropdown($menu, $submenu, $link, clickEvent, override = null, $) {
  var $canvas = $('#menu-canvas');
  // var $canvas = document.getElementById('#menu-canvas');
  if (override == -1) {
    $menu.find('a.active').removeClass('active');
    $menu.find('ul.submenu-open').removeClass('submenu-open');
    $menu.attr('dropdown-active', 0);
    $canvas.removeClass('active');
    return false;
  }
  // console.log('submenu maybe')
  // console.log($submenu);
  if ($submenu.length != 0) {

    clickEvent.preventDefault();

    // Toggle out any currently active menus.
    let $siblings = $link.parent().siblings('li');
    $siblings.find('a.active').removeClass('active');
    $siblings.find('ul.submenu-open').removeClass('submenu-open');
    // Toggle active submenu.
    $link.toggleClass('active');
    $submenu.toggleClass('submenu-open');
    // Global menu settings.
    if($menu.find('a.active').length > 0) {
      $menu.attr('dropdown-active', 1);
      $canvas.addClass('active')
    }
    else {
      $menu.attr('dropdown-active', 0);
      $canvas.removeClass('active')
    }
  }
}

function round(number, precision) {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}