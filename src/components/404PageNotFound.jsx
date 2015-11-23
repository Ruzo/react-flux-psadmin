"use strict";

var React = require('react')
,	Link = require('react-router').Link
;

var PageNotFound = React.createClass({
	render: function(){
		return (
			<div>
				<h2 className="bg-warning">Oops! The Page Was Not Found!</h2>
				<Link to="app">Back to Home page</Link>
			</div>
		);
	}
});

module.exports = PageNotFound;