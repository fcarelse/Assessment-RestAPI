/**
 * Tasks Router
 * Author: Francis Carelse
 *
 * This module handles setting up routes in a Hapi server
 */

const {defaultOptions, defaultMiddleware} = require('./tasksAPI.js');
const Tasks = require('./tasksController.js');

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 *
 * @param server object // Required, hapi type server
 * @param options object // Extra settings
 * @param middleware callback // Optional
 */
module.exports = async (server, options, middleware) => {
	// If middleware not supplied then provide default.
	middleware = middleware || defaultMiddleware;

	// If options not supplied then use default.
	options = options || defaultOptions;

	// Set up controller
	const tasks = await Tasks(options);

	console.log('Init');
	// Create route
	server.route({
		method: "POST",
		path: options.base + "/",
		config: {
			pre: middleware,
			handler: tasks.create
		}
	});

	// Read route
	server.route({
		method: "GET",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.read
		}
	});

	// Update route
	server.route({
		method: "PATCH",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.update
		}
	});

	// Delete route
	server.route({
		method: "DELETE",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.delete
		}
	});

	// List route
	server.route({
		method: "GET",
		path: options.base + "/",
		config: {
			pre: middleware,
			handler: tasks.list
		}
	});

	// Return the server.
	return server;
}
