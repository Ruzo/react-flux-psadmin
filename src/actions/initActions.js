"use strict";

var Dispatcher = require('../dispatcher/appDispatcher')
,	ActionTypes = require('../constants/actionTypes')
,	AuthorApi = require('../api/authorApi')
;

var InitActions = {
	initData: function(){
		// Action code
		var allAuthors = AuthorApi.getAllAuthors();
		
		// dispatch the action with a type and the corresponding data
		Dispatcher.dispatch({
			actionType: ActionTypes.INIT_DATA,
			initialData: {
				authors: allAuthors
			}
		});

	}
};

module.exports = InitActions;