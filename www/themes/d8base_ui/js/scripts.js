(function($) {

  /**
   * Object definition for displaySettings.
   *
   * @param {*}
   */

  Drupal.behaviors.base8_ui = {
    attach: function (context, settings) {
    $('body', context).once('base8_ui').each(function () {
      console.log('d8base.js');
    });
    }
  };
  })(jQuery);