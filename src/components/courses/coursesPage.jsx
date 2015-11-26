"use strict";

var React = require('react')
,	CourseStore = require('../../stores/courseStore')
,	CourseActions = require('../../actions/courseActions')
,	CoursesList = require('./CoursesList.jsx')
,	Link = require('react-router').Link
,	toastr = require('toastr')
;

var CoursesPage = React.createClass({
	getInitialState: function(){
		return {
			courses: CourseStore.getAllCourses()
		};
	},
	componentWillMount: function(){
		CourseStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		CourseStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState({course: CourseStore.getAllCourses()});
	},
	deleteCourse: function(id){
		console.log('Deleting: ' + id);
		CourseActions.deleteCourse(id);
		toastr.success('Course Deleted!');
	},
	render: function(){
		return (
			<div>
				<h1>Courses</h1>
				<Link to="addCourse" className="btn btn-primary">Add Course</Link>
				<CoursesList
				courses = {this.state.courses}
				deleteCourse = {this.deleteCourse}
				/>
			</div>
		);
	}
});

module.exports = CoursesPage;