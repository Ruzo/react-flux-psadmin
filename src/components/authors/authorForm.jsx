"use strict";

var React = require('react')
,	Input = require('../common/textinput.jsx')
;

var AuthorForm = React.createClass({
	propTypes: {
		updateAuthor: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
		author: React.PropTypes.object.isRequired,
		errors: React.PropTypes.object
	},
	render: function(){
		return (
			<form>
				<h1>Add Author</h1>
				<Input 	name="firstName"
						label="First Name"
						updateAuthor={this.props.updateAuthor}
						placeholder="Enter author's first name"
						value={this.props.author.firstName}
						error={this.props.errors.firstName}
				/>
				<Input 	name="lastName"
						label="Last Name"
						updateAuthor={this.props.updateAuthor}
						placeholder="Enter author's last name"
						value={this.props.author.lastName}
						error={this.props.errors.lastName}
				/>
				<input 	type="submit"
						value="Save"
						className="btn btn-default"
						onClick={this.props.onSave}
				/>
			</form>
		);
	}
});

module.exports = AuthorForm;