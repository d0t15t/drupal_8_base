(function($) {

  /**
   * Object definition for displaySettings.
   *
   * @param {*}
   */

  Drupal.behaviors.gallery1_ui = {
    attach: function (context, settings) {
      $('body', context).once('gallery1_ui').each(function () {
        console.log('gallery1_ui/scripts.js');
      });
    }
  };
  })(jQuery);