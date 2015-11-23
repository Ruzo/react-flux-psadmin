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
	// action is the payload dispatched by authorActions with actionType and data
	switch(action.actionType){
		case ActionTypes.INIT_DATA: // if actionType is constant INIT_DATA
			_authors = action.initialData.authors; // set authors array to initial data
			AuthorStore.emitChange(); // tell listeners that a change event just happened
			break;
		case ActionTypes.SAVE_AUTHOR: // actionType = SAVE_AUTHOR
			_authors.push(action.author); // add new author from data property to array
			AuthorStore.emitChange();
			break;
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author){ // use lodash remove function to remove author from array
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
		default: // no op
	}
});

module.exports = AuthorStore;