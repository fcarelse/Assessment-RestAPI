'use strict';

const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { after, before, describe, it } = exports.lab = Lab.script();
const tasksAPI = require('../src/tasksAPI.js');
const fs = require('fs');
const path = require('path');

// File name for test Database
const testDB = path.join(process.cwd(), './testTasks.sqlite');

// Remove previous test database
fs.existsSync(testDB) && fs.unlinkSync(testDB);

// Basic Hapi server. 
const server = Hapi.server({
	// Port is irrelevant as will not be started during router testing
	port: 3000,
	host: 'localhost'
});

describe('Testing Tasks Router', () => {

	before(async () => {
		await tasksAPI.init(server, {
			base: '/tasks',
			configDB: {
				client: 'sqlite3',
				connection: {
					filename: testDB,
				},
				useNullAsDefault: true,
			}
		});
		await server.initialize();
	});

	after(async () => {
		await server.stop();
	});

	describe('Testing undefined paths', () => {
		const testTask = {
			status: 'ToDo',
			stage: 'Design',
			title: 'Create Test Task',
			content: 'Test content'
		}

		it('Create task using invalid path', async () => {
			const res = await server.inject({
				method: 'POST',
				url: '/', // Invalid path
				payload: { task: testTask }
			});
			// The injector returns 201 on success
			expect(res.statusCode).to.equal(404);
		});
	});

	describe('Creating Tasks', () => {
		it('Create task ignoring supplied id', async () => {
			const testTask = {
				id: 9999,
				status: 'ToDo',
				stage: 'Design',
				title: 'Create Test Task',
				content: 'Test content'
			}
			const res = await server.inject({
				method: 'POST',
				url: '/tasks/',
				payload: { task: testTask }
			});
			// The injector returns 201 on success
			expect(res.payload.id).to.not.equal(9999);
			expect(res.statusCode).to.equal(201);
		});

		it('Create task without id', async () => {
			const testTask = {
				status: 'ToDo',
				stage: 'Design',
				title: 'Create Test Task',
				content: 'Test content'
			}
			const res = await server.inject({
				method: 'POST',
				url: '/tasks/',
				payload:  { task: testTask }
			});
			// The injector returns 201 on success
			expect(res.statusCode).to.equal(201);
		});

	});

	describe('Listing Tasks', () => {
		it('responds with 200', async () => {
			const res = await server.inject({
				method: 'GET',
				url: '/tasks/',
			});
			expect(res.statusCode).to.equal(200);
		});

		it('responds with 404', async () => {
			const res = await server.inject({
				method: 'get',
				url: '/tasks/0'
			});
			expect(res.statusCode).to.equal(404);
		});

	});
});