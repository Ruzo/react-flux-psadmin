"use strict";

var React = require('react')
,	AuthorApi = require('../../api/authorApi')
;

var AuthorPage = React.createClass({
	getInitialState: function(){
		return {
			author: AuthorApi.getAuthorById(this.props.params.authorId)
		};
	},
	render: function(){
		return (
			<div>
				<h1>Author Page</h1>
				<div className="lead">
				ID: {this.state.author.id}
				<br />
				Name: {this.state.author.firstName} {this.state.author.lastName}
				</div>
			</div>	
		);
	}
});

module.exports = AuthorPage;