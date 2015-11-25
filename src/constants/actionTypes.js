"use strict";

var keyMirror = require('react/lib/keyMirror'); // utility that copies all keys to their value counterparts

module.exports = keyMirror({
	// null is put in place of the values in order to let keyMirror replace them with their respective keys
	INIT_DATA: null,
	SAVE_AUTHOR: null,
	DELETE_AUTHOR: null,
	SAVE_COURSE: null,
	DELETE_COURSE: null,
	UPDATE_COURSE: null
});