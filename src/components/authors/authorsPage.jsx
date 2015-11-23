"use strict";

var React = require('react')
,	AuthorsList = require('./authorsList.jsx')
,	AuthorStore = require('../../stores/authorStore')
,	AuthorActions = require('../../actions/authorActions')
,	Link = require('react-router').Link
,	toastr = require('toastr')
;

var AuthorsPage = React.createClass({
	getInitialState: function(){
		return {
			authors: AuthorStore.getAllAuthors() // sets initial value for authors' array
		};
	},
	componentWillMount: function(){
		AuthorStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		AuthorStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState({authors: AuthorStore.getAllAuthors()});
	},
	deleteAuthor: function(id, e){
		e.preventDefault();
		console.log('Deleting author ID: ' + id);
		AuthorActions.deleteAuthor(id);
		toastr.success('Author deleted!');
	},
	// render the Authors page by passing authors' state as prop to AuthorsList component
	render: function(){
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<AuthorsList 
					authors={this.state.authors}
					deleteAuthor={this.deleteAuthor}
				/>
			</div>
		);
	}
});

module.exports = AuthorsPage;