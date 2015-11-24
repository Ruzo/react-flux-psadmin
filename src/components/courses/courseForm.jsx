"use strict";

var React = require('react')
,	Input = require('../common/textinput.jsx')
,	Select = require('../common/selectinput.jsx')
, AuthorStore = require('../../stores/authorStore')
;

var CourseForm = React.createClass({
	propTypes: {
		updateCourse: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
		course: React.PropTypes.object.isRequired,
		errors: React.PropTypes.object
	},
	getInitialState: function(){
		authorOptions: AuthorStore.getAllAuthors.map(eachAuthorName, this)
	},
	eachAuthorName: function(author){
		var name = author.firstName + " " + author.lastName;
		var option = {
			value: author,
			label: name
		};
		console.log('Author option' + option);
		return option;
	},
	render: function(){
		return (
			<form>
				<h1>Add Course</h1>
				<Input 	name="title"
						label="Title"
						updateValue={this.props.updateCourse}
						placeholder="Enter course's title"
						value={this.props.course.title}
						error={this.props.errors.title}
				/>
				<Input 	name="watchHref"
						label="Video URL"
						updateValue={this.props.updateCourse}
						placeholder="Enter course's video URL"
						value={this.props.course.watchHref}
						error={this.props.errors.watchHref}
				/>
				<Select name="author"
						label="Author"
						updateValue={this.props.updateCourse}
						options={this.state.authorOptions}
						value={this.props.course.author}
						error={this.props.errors.author}
				/>
				<Input 	name="length"
						label="Length"
						updateValue={this.props.updateCourse}
						placeholder="Enter course's length"
						value={this.props.course.length}
						error={this.props.errors.length}
				/>
				<Input 	name="category"
						label="Category"
						updateValue={this.props.updateCourse}
						placeholder="Enter course's category"
						value={this.props.course.category}
						error={this.props.errors.category}
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

module.exports = CourseForm;