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

const testTask = {
	status: 'todo',
	stage: 'design',
	title: 'Test Task',
	content: 'Test content'
}

const safePassJson = (string)=>{
	try{
		return JSON.parse(string || '{}');
	}catch(err){
		return {};
	}
}

describe('Testing Tasks API -', () => {

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
		it('Create task using invalid path', async () => {
			const res = await server.inject({
				method: 'POST',
				url: '/', // Invalid path
				payload: { task: {...testTask} } // Copy the testTask
			});
			// The injector returns 201 on success
			expect(res.statusCode).to.equal(404);
		});

	});

	describe('Creating Tasks', () => {
		it('Create task ignoring supplied id', async () => {
			const res = await server.inject({
				method: 'POST',
				url: '/tasks/',
				payload: { task: {id:9999, ...testTask} } // Copy the testTask adding id
			});
			// Extract the payload
			const payload = safePassJson(res.payload);
			// The id of returned task should not be 9999
			expect(payload.id).to.not.equal(9999);
			// The injector returns 201 on success
			expect(res.statusCode).to.equal(201);
		});

		it('Create task without id', async () => {
			const res = await server.inject({
				method: 'POST',
				url: '/tasks/',
				payload:  { task: {...testTask} } // Copy the testTask
			});
			// Extract the payload
			const payload = safePassJson(res.payload);
			// Expect object to be returned
			expect(payload instanceof Object).to.be.true();
			// The injector returns 201 on success
			expect(res.statusCode).to.equal(201);
		});
	});

	describe('Reading Tasks', () => {
		it('Read task using supplied id', async () => {
			const res = await server.inject({
				method: 'GET',
				url: '/tasks/1',
			});
			// Extract the payload
			const payload = safePassJson(res.payload);
			// Expect object to be returned
			expect(payload instanceof Object).to.be.true();
			// Test for id of 1 if there is a returned object
			if(payload instanceof Object) expect(payload.id).to.equal(1);
			// The injector returns 200 on success
			expect(res.statusCode).to.equal(200);
		});

		it('Get 404 on read with invalid id', async () => {
			const res = await server.inject({
				method: 'GET',
				url: '/tasks/0',
			});
			// The injector returns 404 on success
			expect(res.statusCode).to.equal(404);
		});
	});

	describe('Updating Tasks', () => {
		it('Update task using supplied id', async () => {
			const res = await server.inject({
				method: 'PATCH',
				url: '/tasks/1',
				payload: { task: {status: 'Cancelled'} }
			});
			// Must have knex to check database with
			expect(tasksAPI.knex instanceof Object).to.be.true();
			// Block of tests when knex is available
			if(tasksAPI.knex instanceof Object){
				// Retrieve task from the database
				const [task] = await tasksAPI.knex('tasks').where({ id: 1 }).select(['status']);
				// The database record's status is changed correctly
				expect(task.status).to.equal('Cancelled');
			}
			// The injector returns 204 on success
			expect(res.statusCode).to.equal(204);
		});

		it('Get 404 on update with invalid id', async () => {
			const res = await server.inject({
				method: 'PATCH',
				url: '/tasks/0',
				payload: { task: {status: 'Cancelled'} }
			});
			// The injector returns 404 on failure
			expect(res.statusCode).to.equal(404);
		});
	});

	describe('Deleting Tasks', () => {
		it('Delete task using supplied id', async () => {
			const res = await server.inject({
				method: 'DELETE',
				url: '/tasks/1',
			});
			// The injector returns 202 on success
			expect(res.statusCode).to.equal(202);
		});

		it('Get 404 on delete with invalid id', async () => {
			const res = await server.inject({
				method: 'DELETE',
				url: '/tasks/0',
			});
			// The injector returns 404 on failure
			expect(res.statusCode).to.equal(404);
		});
	});

	describe('Listing Tasks', () => {
		it('Returns an array and responds with 200', async () => {
			const res = await server.inject({
				method: 'GET',
				url: '/tasks/',
			});
			// Extract the payload
			const payload = safePassJson(res.payload);
			// Expect array to be returned
			expect(payload instanceof Array).to.be.true();
			// The injector returns 200 on success
			expect(res.statusCode).to.equal(200);
		});
	});
});