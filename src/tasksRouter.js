/**
 * Tasks Router
 * Author: Francis Carelse
 *
 * This module handles setting up routes in a Hapi server
 */

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 *
 * @param server object // Required, hapi type server
 * @param controller object // Collection of handlers to use for calls
 * @param options object // Extra settings
 */
module.exports = async (server, controller, options) => {
	// Create route
	server.route({
		method: "POST",
		path: options.base + "/",
		config: {
			pre: options.middleware,
			handler: controller.create
		}
	});

	// Read route
	server.route({
		method: "GET",
		path: options.base + "/{id?}",
		config: {
			pre: options.middleware,
			handler: controller.read
		}
	});

	// Update route
	server.route({
		method: "PATCH",
		path: options.base + "/{id?}",
		config: {
			pre: options.middleware,
			handler: controller.update
		}
	});

	// Delete route
	server.route({
		method: "DELETE",
		path: options.base + "/{id?}",
		config: {
			pre: options.middleware,
			handler: controller.delete
		}
	});

	// List route
	server.route({
		method: "GET",
		path: options.base + "/",
		config: {
			pre: options.middleware,
			handler: controller.list
		}
	});

	// Return the server.
	return server;
}
