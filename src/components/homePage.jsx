"use strict";

var React = require('react'); // import react.js

var Homepage = React.createClass({ // create a component
	render: function(){ // render is the one required property in a component
		return ( // use parentheses for multiple lines of markup
				<div className = "jumbotron">
					<h1>Pluralsight Administration</h1>
					<p>React, React Router and Flux to build ultra-responsive web apps.</p>
				</div>
			);
	}
});

module.exports = Homepage;