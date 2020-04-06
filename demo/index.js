'use strict';

const Server = require('../basicServer.js');
const Inert = require('@hapi/inert');

const fs = require('fs');

const defaultTask = {
	title: 'Todo List',
	content: 'Make a todo list of your current set of tasks',
	stage: 'develop',
	status: 'doing',
};

const defaultTask2 = {
	title: 'Kanban',
	content: 'Develop a Kanban interface for your todo list demo',
	stage: 'deploy',
	status: 'done',
};

const defaultTask3 = {
	title: 'Demo Readme',
	content: 'Make a readme with instructions to use the demo Task API Demo',
	stage: 'develop',
	status: 'doing',
};

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

	server.route({
		method: 'GET',
		path: '/reset',
		handler: (request, reply)=>{
			return (async()=>{
				await server.knex('tasks').where('id','!=',0).del();
				await server.knex('tasks').insert(defaultTask, ["id"]);
				await server.knex('tasks').insert(defaultTask2, ["id"]);
				await server.knex('tasks').insert(defaultTask3, ["id"]);
				return reply.response('Done.');
			})();
		}
	});

	await Server.start()

})();

