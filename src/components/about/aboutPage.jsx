"use strict";

var React = require('react');

var Aboutpage = React.createClass({
	statics: {
		willTransitionTo: function(transition, params, query, callback){
			if(!confirm('Do you really want to know anout this app?')){
				transition.abort();
			}
			else{
				callback();
			}
		},
		willTransitionFrom: function(transition, component){
			if(!confirm('Do you really want to leave this informative page?')){
				transition.abort();
			}
		}
	},
	render: function(){
		return (
			<div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</p>
			</div>
		);
	}
});

module.exports = Aboutpage;