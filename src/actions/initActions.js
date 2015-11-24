"use strict";

var Dispatcher = require('../dispatcher/appDispatcher')
,	ActionTypes = require('../constants/actionTypes')
,	AuthorApi = require('../api/authorApi')
,	CourseApi = require('../api/courseApi')
;

var InitActions = {
	initData: function(){
		// Action code
		var allAuthors = AuthorApi.getAllAuthors()
		,	allCourses = CourseApi.getAllCourses();
		
		// dispatch the action with a type and the corresponding data
		Dispatcher.dispatch({
			actionType: ActionTypes.INIT_DATA,
			initialData: {
				authors: allAuthors,
				courses: allCourses
			}
		});

	}
};

module.exports = InitActions;