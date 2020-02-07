var widgets = require('@jupyter-widgets/base');
var ipyleaflet = require('jupyter-leaflet')
var _ = require('lodash');
var L = require('leaflet');
var sidebar = require("leaflet-sidebar-v2");
require("@fortawesome/fontawesome-free");
require('../node_modules/leaflet-sidebar-v2/css/leaflet-sidebar.min.css')

// See example.py for the kernel counterpart to this file.


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var SidebarModel = widgets.DOMWidgetModel.extend({
//var SidebarModel = ipyleaflet.LeafletControlModel.extend({
	    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'SidebarModel',
        _view_name : 'SidebarView',
        _model_module : 'jupyter-leaflet-sidebar',
        _view_module : 'jupyter-leaflet-sidebar',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        value : 'Sidebar World!',
		config: {},
    })
});

var panelContent = {
    id: 'userinfo',                     // UID, used to access the panel
    tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
    pane:'<p> Dééééééééédé </p>',        // DOM elements can be passed, too
    title: 'Your Profile',              // an optional pane header
    //position: 'bottom'                  // optional vertical alignment, defaults to 'top'
};	

// Custom View. Renders the widget model.
//var SidebarView = widgets.DOMWidgetView.extend({
var SidebarView = ipyleaflet.LeafletControlView.extend({
    // Defines how the widget gets rendered into the DOM
	initialize: function(parameters){
		SidebarView.__super__.initialize.apply(this, arguments);
		this.map_view = this.options.map_view
	},
    render: function() {
        this.value_changed();
		this.config_changed();
		this.obj.addPanel(panelContent);
        // Observe changes in the value traitlet in Python, and define
        // a custom callback.
        this.model.on('change:value', this.value_changed, this);
        this.model.on('change:config', this.config_changed, this);
    },

    value_changed: function() {
        this.el.textContent = this.model.get('value');
    },

	config_changed: function(){
		console.log(L.Control)
		if(this.obj){
			this.obj.remove()
		}
		var config = this.model.get('config')
		this.obj = L.control.sidebar(config);
		this.obj.addTo(this.map_view.obj).open('userinfo');
	}
});


module.exports = {
    SidebarModel: SidebarModel,
    SidebarView: SidebarView
};
