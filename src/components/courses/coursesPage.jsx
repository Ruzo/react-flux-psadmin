"use strict";

var React = require('react')
,	CourseStore = require('../../stores/courseStore')
,	CoursesList = require('./CoursesList.jsx')
;

var CoursesPage = React.createClass({
	getInitialState: function(){
		return {
			courses: CourseStore.getAllCourses()
		};
	},
	render: function(){
		return (
			<div>
				<h1>Courses</h1>
				<CoursesList courses = {this.state.courses} />
			</div>
		);
	}
});

module.exports = CoursesPage;