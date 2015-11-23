"use strict";

var React = require('react')
,	Link = require('react-router').Link
;

var AuthorsList = React.createClass({
	propTypes: {
		authors: React.PropTypes.array.isRequired, // do not accept a call to this component without a valid 'authors' array
		deleteAuthor: React.PropTypes.func.isRequired
	},
	handleClick: function(id, e){
		this.props.deleteAuthor(id, e);
	},
	render: function(){
	// Create a new array from prop 'authors' passed by parent component AuthorsPage
		var authorRow = function(author){
			return (
				<tr key={author.id}>
					<td><Link to="manageAuthor" params={{authorId: author.id}}>{author.id}</Link></td>
					<td>{author.firstName}</td>
					<td>{author.lastName}</td>
					<td><a href="#" onClick={this.handleClick.bind(this, author.id)}>Delete</a></td>
				</tr>
			);
		};
        // Display a table while inserting JSX rows from new array 'authors'
		return (
			<div>
				<table className="table">
					<thead>
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th></th>
					</thead>
					<tbody>
					{this.props.authors.map(authorRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = AuthorsList;