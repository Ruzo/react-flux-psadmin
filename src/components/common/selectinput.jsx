"use strict";

var React = require('react')
;

var Option = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		updateValue: React.PropTypes.func.isRequired,
		options: React.PropTypes.array.isRequired,
		value: React.PropTypes.string,
		error: React.PropTypes.string
	},
	render: function(){
		var wrapperClass = (this.props.error && this.props.error.length > 0) ? 'form-group has-error' : 'form-group';
		var eachOption = function(option){
			return (
				<option value={option.value}>{option.label}</option>
			);
		},
		return (
			<div className={wrapperClass}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<div className="field">
					<select required
							name={this.props.name}
							className="form-control"
							ref={this.props.name}
							value={this.props.value}
							onChange={this.props.updateValue}
					>
						{this.props.options.map(eachOption, this)}
					</select>
					<div className="input">{this.props.error}</div>
				</div>
			</div>
		);
	}
});

module.exports = Option;