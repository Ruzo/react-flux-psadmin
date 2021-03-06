"use strict";

var React = require('react')
,	Router = require('react-router')
,	routes = require('./routes.jsx')
,	InitActions = require('./actions/initActions')
;

InitActions.initData();

Router.run(routes, function(Handler){
	React.render(<Handler />, document.getElementById('app'));
});