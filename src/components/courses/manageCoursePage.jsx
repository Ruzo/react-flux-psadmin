"use strict";

var React = require('react')
,	CourseForm = require('./courseForm.jsx')
,	CourseStore = require('../../stores/courseStore')
,	CourseActions = require('../../actions/courseActions')
,	Router = require('react-router')
;

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],
	getInitialState: function(){
		return {
			course: initialCourse()
		};
	},
	initialCourse: function(){
		var newCourse = {  
			id: "",
			title: "",
			watchHref: "",
			author: {  
				id: "",
				name: ""
			},
			length: "",
			category: ""
		};
		var id = this.props.params.courseId;
		if(id){
			return CourseStore.getCourseById(id);
		}
		else{
			return newCourse;
		};
	},
	updateCourse: function(e){
		var value = e.target.value;
		var field = e.target.name;
		this.state.course[field] = value;
		this.setState({course: this.state.course});
	},
	saveCourse: function(e){
		e.preventDefault();
		CourseActions.saveCourse(this.state.course);
		this.transistionTo('courses');
	},
	render: function(){
		return (
			<CourseForm
				course = {this.course}
				updateCourse = {this.updateCourse}
				onSave = {saveCourse}
			/>
		);
	}
});

module.exports = ManageCoursePage;