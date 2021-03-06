"use strict";

var React = require('react')
,	Link = require('react-router').Link
;

var CoursesList = React.createClass({
	handleClick: function(id){
		// e.preventDefault();
		this.props.deleteCourse(id);
	},
	render: function(){
		var courseRow = function(course){
			return (
				<tr key={course.id}>
					<td><Link to="manageCourse" params={{courseId: course.id}}>{course.id}</Link></td>
					<td>{course.title}</td>
					<td><a href={course.watchHref}>Video</a></td>
					<td>{course.author.name}</td>
					<td>{course.length}</td>
					<td>{course.category}</td>
					<td><button className="btn btn-default btn-xs" onClick={this.handleClick.bind(this, course.id)}>Delete</button></td>
				</tr>
			);
		};
		return (
			<div>
				<table className="table">
					<thead>
						<th>ID</th>
						<th>Title</th>
						<th>Link</th>
						<th>Author</th>
						<th>Length</th>
						<th>Category</th>
						<th></th>
					</thead>
					<tbody>
						{this.props.courses.map(courseRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = CoursesList;