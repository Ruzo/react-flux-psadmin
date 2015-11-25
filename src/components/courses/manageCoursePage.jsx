"use strict";

var React = require('react')
,	CourseForm = require('./courseForm.jsx')
,	CourseStore = require('../../stores/courseStore')
,	CourseActions = require('../../actions/courseActions')
, AuthorStore = require('../../stores/authorStore')
,	Router = require('react-router')
,	_ = require('lodash')
;

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],
	getInitialState: function(){
		return {
			authorOptions: AuthorStore.getAllAuthors().map(this.eachAuthorName, this),
			exists: false,
			course: this.initialCourse(),
			errors: {}
		};
	},
	eachAuthorName: function(author){
		var name = author.firstName + " " + author.lastName;
		var option = {
			id: author.id,
			name: name
		};
		return option;
	},
	initialCourse: function(){
		var newCourse = {
			id: "",
			title: "",
			watchHref: "",
			author: "",
			length: "",
			category: ""
		};
		var id = this.props.params.courseId;
		if(id){
			this.setState({exists: true});
			return CourseStore.getCourseById(id);
		}
		else{
			return newCourse;
		}
	},
	updateCourse: function(e){
		var value = e.target.value;
		console.log('value: ' + value);
		var field = e.target.name;
		console.log('field: ' + field);
		if(field === "author"){
			this.state.course[field] = _.find(this.state.authorOptions, {id: value});
		}
		else{
			this.state.course[field] = value;
		}
		this.setState({course: this.state.course});
	},
	saveCourse: function(e){
		e.preventDefault();
		if(this.state.exists){
			CourseActions.updateCourse(this.state.course);
		}
		else{
			CourseActions.saveCourse(this.state.course);
		}
		this.transitionTo('courses');
	},
	render: function(){
		return (
			<CourseForm 
				course = {this.state.course}
				authorOptions = {this.state.authorOptions}
				updateCourse = {this.updateCourse}
				onSave = {this.saveCourse}
				errors = {this.state.errors}
			/>
		);
	}
});

module.exports = ManageCoursePage;