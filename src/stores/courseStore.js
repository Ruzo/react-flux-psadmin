"use strict";

var ActionTypes = require('../constants/actionTypes')
,	Dispatcher = require('../dispatcher/appDispatcher')
,	EventEmitter = require('events').EventEmitter
,	objectAssign = require('object-assign')
,	_ = require('lodash')
;

var _courses = [];

var CourseStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	},
	emitChange: function(){
		this.emit('change');
	},
	getAllCourses: function(){
		return _courses;
	},
	getCourseById: function(id){
		return _.find(_courses, {id: id});
	}
});

Dispatcher.register(function(action){
	switch(action.actionType) {
		case	ActionTypes.INIT_DATA:
				_courses = action.initialData.courses;
				CourseStore.emitChange();
				break;
		case	ActionTypes.SAVE_COURSE:
				_courses.push(action.course);
				CourseStore.emitChange();
				break;
		case	ActionTypes.DELETE_COURSE:
				_.remove(_courses, function(course){
				return course.id === action.id;
				});
				CourseStore.emitChange();
				break;
		case	ActionTypes.UPDATE_COURSE:
				var index = _.findIndex(_courses, {id: action.course.id});
				_courses[index] = action.course;
				CourseStore.emitChange();
				break;
				default: // no op
	}
});

module.exports = CourseStore;