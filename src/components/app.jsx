/*eslint-disable strict*/
//Disabling check because we can't run strict mode. Need jQuery as global vars for Bootstrap

$ = jQuery = require('jquery');
var React = require('react')
,	Header = require('./common/header.jsx')
,	RouteHandler = require('react-router').RouteHandler
;

var App = React.createClass({ // main component to render
	render: function(){
		return (
			<div>
				<Header />
				<div className="container-fluid">
					<RouteHandler />
				</div>
			</div>
		);
	}
});

module.exports = App;