"use strict";

var React = require('react')
,	CourseForm = require('./courseForm.jsx')
,	CourseStore = require('../../stores/courseStore')
,	CourseActions = require('../../actions/courseActions')
, 	AuthorStore = require('../../stores/authorStore')
,	Router = require('react-router')
,	_ = require('lodash')
,	toastr = require('toastr')
;

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],
	getInitialState: function(){
		return {
			authorOptions: [],
			exists: false,
			course: {
				id: "",
				title: "",
				watchHref: "",
				author: "",
				length: "",
				category: ""
			},
			errors: {}
		};
	},
	componentWillMount: function(){
		var id = this.props.params.courseId;
		if(id){
			this.setState({
				exists: true,
				course: CourseStore.getCourseById(id)
			});
		}
		this.setState({authorOptions: AuthorStore.getAllAuthors().map(this.eachAuthorName, this)});
		
	},
	eachAuthorName: function(author){
		var name = author.firstName + " " + author.lastName;
		var option = {
			id: author.id,
			name: name
		};
		return option;
	},
	updateValue: function(e){
		var value = e.target.value;
		var field = e.target.name;
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
			toastr.success('Course updated!');
		}
		else{
			CourseActions.saveCourse(this.state.course);
			toastr.success('Course saved!');
		}
		this.transitionTo('courses');
	},
	render: function(){
		return (
			<CourseForm 
				course = {this.state.course}
				authorOptions = {this.state.authorOptions}
				updateValue = {this.updateValue}
				onSave = {this.saveCourse}
				errors = {this.state.errors}
			/>
		);
	}
});

module.exports = ManageCoursePage;