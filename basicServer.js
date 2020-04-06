'use strict';

const tasksAPI = require('./src/tasksAPI.js');
const Hapi = require('@hapi/hapi');

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

let initAPI = tasksAPI.init(server);

exports.init = async () => {
	// If the API needs to be initialized
	if(initAPI) await initAPI;

	// Make sure API initialization does not run again
	initAPI = false;

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