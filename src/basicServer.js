'use strict';

const tasksRouter = require('./tasksRouter.js');
const Hapi = require('@hapi/hapi');

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

let routerInit = tasksRouter(server);	

exports.init = async () => {
	// If the router needs to be initialized
	if(routerInit) await routerInit;

	// Make sure router initialization does not run again
	routerInit = false;

	// Initialize the Hapi server.
	await server.initialize();

	// Chain back the server
	return server;
};

exports.start = async () => {
	// Start the server
	await server.start();

	// Alert that the server is up
	console.log(`Server running at: ${server.info.uri}`);

	// Chain back the server
	return server;
};

process.on('unhandledRejection', (err) => {
	// Log any otherwise unhandled errors
	console.log(err);
	process.exit(1);
});