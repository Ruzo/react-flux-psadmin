"use strict";

var Dispatcher = require('../dispatcher/appDispatcher')
,	ActionTypes = require('../constants/actionTypes')
,	AuthorApi = require('../api/authorApi')
;
// create actions' object with all action functions
var AuthorActions = {
	saveAuthor: function(author){
		// Action code
		var newAuthor = AuthorApi.saveAuthor(author);

		// dispatch the action (payload) with a type and the corresponding data
		Dispatcher.dispatch({
			actionType: ActionTypes.SAVE_AUTHOR,
			author: newAuthor
		});
	}
	deleteAuthor: function(id){
		AuthorApi.deleteAuthor(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id
		});
	}
};

module.exports = AuthorActions;