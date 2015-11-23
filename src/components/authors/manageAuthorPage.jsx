"use strict";

var React = require('react')
,	AuthorForm = require('./authorForm.jsx')
,	AuthorStore = require('../../stores/authorStore')
,	AuthorActions = require('../../actions/authorActions')
,	Router = require('react-router')
,	toastr = require('toastr')
;

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation
	],
	getInitialState: function(){
		return {
			author: {
				id: "",
				firstName: "",
				lastName: ""
			},
			errors: {},
			saved: false
		};
	},
	componentWillMount: function(){
		var id = this.props.params.authorId;
		if(id){
			this.setState({author: AuthorStore.getAuthorById(id)});
		}
	},
	statics: {
		willTransitionFrom: function(transition, component){
			var dirtyForm = component.state.author.firstName || component.state.author.lastName;
			if(!component.state.saved && dirtyForm){
				if(!confirm('Discard the data already entered in the form?')){
					transition.abort();
				}
			}
		}
	},
	updateAuthor: function(e){
		var field = e.target.name;
		var value = e.target.value;
		this.state.author[field] = value;
		this.setState({author: this.state.author});
	},
	validEntry: function(author){
		var valid = true;
		this.state.errors = {};
		if(author.firstName.length < 3){
			this.state.errors.firstName = "First name should be at least 3 characters long";
			valid = false;
		}
		if(author.lastName.length < 3){
			this.state.errors.lastName = "First name should be at least 3 characters long";
			valid = false;
		}
		this.setState({errors: this.state.errors});
		return valid;
	},
	saveAuthor: function(e){
		e.preventDefault();
		if(this.validEntry(this.state.author)){
			AuthorActions.saveAuthor(this.state.author);
			this.setState({saved: true});
			toastr.success('Author is saved!');
			this.transitionTo('authors');
		}
	},
	render: function(){
		return (
			<AuthorForm author={this.state.author}
						updateAuthor={this.updateAuthor}
						errors={this.state.errors}
						onSave={this.saveAuthor}/>
		);
	}
});

module.exports = ManageAuthorPage;