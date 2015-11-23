"use strict";

var Dispatcher = require('../dispatcher/appDispatcher')
,	ActionTypes = require('../constants/actionTypes')
,	EventEmitter = require('events').EventEmitter // using Node's EventEmitter for event listeners
,	objectAssign = require('object-assign') // using a ponyfill of ES6 ObjectAssign to add EventEmitter functions to AuthorStore
,	_ = require('lodash') // using lodash for _authors array manipulation
;

var _authors = []; // set virtual data record

// functions for components to use listeners and get data
var AuthorStore = objectAssign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	},
	emitChange: function(){
		this.emit('change');
	},
	getAllAuthors: function(){
		return _authors;
	},
	getAuthorById: function(id){
		console.log('getting author by ID');
		return _.find(_authors, {id: id});
	}
});

// registration of action types and related steps with dispatcher
Dispatcher.register(function(action){
	// action is the payload sent by authorActions with type and data
	switch(action.actionType){
		case ActionTypes.INIT_DATA:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.SAVE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author){
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
		default: // no op
	}
});

module.exports = AuthorStore;