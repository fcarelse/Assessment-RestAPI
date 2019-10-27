/**
 * Tasks API
 * Author: Francis Carelse
 *
 * This module handles configurations
 */

/**
 * Default database configuration
 */
export const defaultDB = {
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "admin",
		password: "admin",
		database: "tasksapi",
		charset: "utf8"
	}
};

/**
 * Default Options to be used by router or controller
 */
export const defaultOptions = {
	base: "/tasks",
	configDB: defaultDB
};

/**
 * Default middleware to be used by router or controller
 */
export const defaultMiddleware = [];

/**
 * Task Statuses
 * List of text names for statuses for Tasks.
 * Statuses exist within each stage of task pipeline
 */
export const taskStatuses = ["ToDo", "Doing", "Done", "Cancelled"];

/**
 * Task Stage
 * List of text names for stages for task pipeline.
 */
export const taskStages = ["Design", "Develop", "Test", "Deploy"];

/**
 * Task Fields
 * Property key is field name
 * Property value is javascript data type
 */
export const taskFields = {
	id: "number",
	stage: "string",
	status: "string",
	title: "string",
	content: "string"
};

/**
 * Task Schema
 * Verifys and builds table for tasks
 *
 * @param knex Knex type data access object
 */
export const taskSchema = async knex => {
	// Check if table exists
	const exists = await knex.schema.hasTable("tasks");

	// Only if table does not exist then create it.
	if (!exists)
		await new Promise(resolve => {
			knex.schema.createTable("tasks", function(tasks) {
				tasks.increments("id").primary();
				tasks.string("stage", 20);
				tasks.string("status", 20);
				tasks.string("title", 200);
				tasks.text("content");
				resolve(true);
			});
		});

	// Verify each critical field exists.
	await new Promise(resolve => {
		knex.schema.table("tasks", function(tasks) {
			(async () => {
				//Check for each Column
				if (!(await tasks.hasColumn("id"))) tasks.increments("id").primary();
				if (!(await tasks.hasColumn("stage"))) tasks.string("stage", 20);
				if (!(await tasks.hasColumn("status"))) tasks.string("status", 20);
				if (!(await tasks.hasColumn("title"))) tasks.string("title", 200);
				if (!(await tasks.hasColumn("content"))) tasks.text("content");
				resolve(true);
			})();
		});
	});
};
