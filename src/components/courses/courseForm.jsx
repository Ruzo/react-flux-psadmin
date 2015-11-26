"use strict";

var React = require('react')
,	Input = require('../common/textinput.jsx')
,	Select = require('../common/selectinput.jsx')
;

var CourseForm = React.createClass({
	propTypes: {
		updateValue: React.PropTypes.func.isRequired,
		onSave: React.PropTypes.func.isRequired,
		course: React.PropTypes.object.isRequired,
		authorOptions: React.PropTypes.array.isRequired,
		errors: React.PropTypes.object
	},
	render: function(){
		return (
			<form>
				<h1>Add Course</h1>
				<Input 	name="title"
						label="Title"
						updateValue={this.props.updateValue}
						placeholder="Enter course's title"
						value={this.props.course.title}
						error={this.props.errors.title}
				/>
				<Input 	name="watchHref"
						label="Video URL"
						updateValue={this.props.updateValue}
						placeholder="Enter course's video URL"
						value={this.props.course.watchHref}
						error={this.props.errors.watchHref}
				/>
				<Select name="author"
						label="Author"
						value={this.props.course.author.id}
						updateValue={this.props.updateValue}
						options={this.props.authorOptions}
						error={this.props.errors.author}
				/>
				<Input 	name="length"
						label="Length"
						updateValue={this.props.updateValue}
						placeholder="Enter course's length"
						value={this.props.course.length}
						error={this.props.errors.length}
				/>
				<Input 	name="category"
						label="Category"
						updateValue={this.props.updateValue}
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