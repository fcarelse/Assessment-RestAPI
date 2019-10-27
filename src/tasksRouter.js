/**
 * Tasks Router
 * Author: Francis Carelse
 *
 */

import tasks from "./tasksController.js";

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 *
 * @param server object // Required, hapi type server
 * @param options object // Extra settings
 * @param middleware callback // Optional
 */
export default function(server, middleware, options) {
	// If middleware not supplied then provide default.
	middleware = middleware || defaultMiddleware;

	// If options not supplied then use default.
	options = options || defaultOptions;

	// Create route
	server.route({
		method: "PUT",
		path: options.base + "/",
		config: {
			pre: middleware,
			handler: tasks.create(options)
		}
	});

	// Read route
	server.route({
		method: "GET",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.read(options)
		}
	});

	// Update route
	server.route({
		method: "PATCH",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.update(options)
		}
	});

	// Delete route
	server.route({
		method: "DELETE",
		path: options.base + "/{id?}",
		config: {
			pre: middleware,
			handler: tasks.delete(options)
		}
	});

	// List route
	server.route({
		method: "GET",
		path: options.base + "/",
		config: {
			pre: middleware,
			handler: tasks.list(options)
		}
	});

	// Return the server.
	return server;
}
