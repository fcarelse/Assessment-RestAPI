const express = require('express')
const tasks = require('./tasksController.js');

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 * 
 * Express middleware function or multiple wrapped in one.
 * Callback arguments: request, response, next, parameters
 * @param middleware callback
 */
module.exports = function(middleware, options){
	// New router instance to be used with this middleware.
	const router = express.Router()

	// Create route
	router.put('/:id', tasks.create(middleware, options));

	// Read route
	router.get('/:id', tasks.read(middleware, options));

	// Update route
	router.patch('/:id', tasks.update(middleware, options));

	// Delete route
	router.delete('/:id', tasks.delete(middleware, options));

	// List route
	router.get('/', tasks.list(middleware, options));

	// Return the built router.
	return router;
};

