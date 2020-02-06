var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'jupyter-leaflet-sidebar',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'jupyter-leaflet-sidebar',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

