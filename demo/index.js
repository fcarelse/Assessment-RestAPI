'use strict';

const Server = require('../basicServer.js');
const Inert = require('@hapi/inert');

const fs = require('fs');

(async()=>{
	const server = await Server.init();

	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			const indexHtml = fs.readFileSync('demo/index.html');
			console.log('GET /');
			return reply.response(indexHtml).type('text/html');
		}
	});

	await server.register(Inert)

	server.route({
		method: 'GET',
		path: '/js/{file*}',
		handler: {
			directory: { 
				path: 'demo/js'
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/layout/{file*}',
		handler: {
			directory: { 
				path: 'demo/layout'
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/css/{file*}',
		handler: {
			directory: { 
				path: 'demo/css'
			}
		}
	});


	await Server.start()

})();

