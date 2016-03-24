function _getErrorCatcher(pkg, env) {
  if (!env['USE_NEWRELIC']) {
    return { catch: function() {} };
  }

  process.env['NEW_RELIC_TRACER_ENABLED'] = false;

  if (env['NEW_RELIC_NO_CONFIG_FILE']) {
    process.env['NEW_RELIC_NO_CONFIG_FILE'] = true;
    process.env['NEW_RELIC_APP_NAME'] = pkg.name;
    if (env['NEW_RELIC_LICENSE_KEY']) {
      process.env['NEW_RELIC_LICENSE_KEY'] = env['NEW_RELIC_LICENSE_KEY'];
    }
  }
  return require('./lib/error_catcher');
}


module.exports = function(pkg, env, serializers) {
  return {
    logger: require('./lib/logger')(pkg, env, serializers),
    errorCatcher: _getErrorCatcher(pkg, env)
  };
};