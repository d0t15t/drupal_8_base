(function($) {

  /**
   * Object definition for displaySettings.
   *
   * @param {*}
   */

  Drupal.behaviors.psMainForms = {
    attach: function (context, settings) {

      // On node title input, copy value to menu title.
      $('input#edit-menu-title', context).once('psMainForms').each(function () {
        let $menuInput = $(this);
        let $titleInput = $('form #edit-title-0-value');
        $titleInput.onkeyup = function(){
          $menuInput.val($menuInput.val());
        }
      });

    }
  };
  })(jQuery);