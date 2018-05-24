Modules in the /modules/dev folder are not tracked by drupal's main composer.json, and are added to GIT.

When updating to a stable version of the module, add it with Composer and remove the version in the /modules/dev folder and delete it from the GIT repository.