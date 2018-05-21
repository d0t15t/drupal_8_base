Install drupal 8

composer global require hussainweb/drupal-composer-init

composer drupal-init (TODO or download custom composer)

composer install

(add to devdesktop)

drush si

drush upwd admin password

Create a sites/default/settings.php file with chmod 0666
Create a sites/default/files directory with chmod 0777

Uncomment lines settings.local.php in settings.php

drush config-get "system.site" uuid
drush config-set "system.site" uuid "[[ uuid ]]"

drush ev '\Drupal::entityManager()->getStorage("shortcut_set")->load("default")->delete();'




Enable custom_updates, then:
drush updb