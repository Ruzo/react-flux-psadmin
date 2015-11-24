"use strict";

var ActionTypes = require('../constants/actionTypes')
,	Dispatcher = require('../dispatcher/appDispatcher')
,	CourseApi = require('../api/courseApi')
;

var CourseActions = {
	saveCourse: function(course){
		CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.SAVE_COURSE,
			course: course
		});
	},

	deleteCourse: function(id){
		CourseApi.deleteCourse(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			id: id
		});
	}
};

module.exports = CourseActions;