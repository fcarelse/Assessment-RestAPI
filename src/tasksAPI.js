/**
 * Tasks API
 * Author: Francis Carelse
 * 
 */

const express = require('express')
const tasks = require('./tasksController.js');
const defaultOptions = {
	base: '/tasks'
};

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 * 
 * Express middleware function or multiple wrapped in one.
 * Callback arguments: request, response, next, parameters
 * @param server object // Required, hapi type server
 * @param middleware callback // Optional
 * @param options object // Extra settings
 */
module.exports = function(server, middleware, options){
	// If middleware not supplied then options is at that parameter position.
	if(!(middleware instanceof Function)) options = middleware;

	// If options not supplied then use default.
	options = options || defaultOptions;

	// Create route
	server.route({
		method: 'PUT',
		path: '/'
	});
	server.put('/:id', tasks.create(middleware, options));

	// Read route
	server.get('/:id', tasks.read(middleware, options));

	// Update route
	server.patch('/:id', tasks.update(middleware, options));

	// Delete route
	server.delete('/:id', tasks.delete(middleware, options));

	// List route
	server.get('/', tasks.list(middleware, options));

	// Return the server.
	return server;
};

