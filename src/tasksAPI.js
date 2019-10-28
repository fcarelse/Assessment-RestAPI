/**
 * Tasks API config
 * Author: Francis Carelse
 *
 * This module handles configurations
 */

// The tasks API tools to be returned
const API = module.exports = {};

/**
 * Default database configuration
 */
API.defaultDB = {
	client: 'sqlite3',
	connection: {
		filename: './tasks.sqlite',
	},
	useNullAsDefault: true,
};

/**
 * Example configuration for MySQL
 */
/*
  {
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "admin",
		password: "admin",
		database: "tasksapi",
		charset: "utf8"
	}
};
*/


/**
 * Default Options to be used by router or controller
 */
API.defaultOptions = {
	base: "/tasks",
	configDB: API.defaultDB
};

/**
 * Default middleware to be used by router or controller
 */
API.defaultMiddleware = [];

/**
 * Task Statuses
 * List of text names for statuses for Tasks.
 * Statuses exist within each stage of task pipeline
 */
API.taskStatuses = ["ToDo", "Doing", "Done", "Cancelled"];

/**
 * Task Stage
 * List of text names for stages for task pipeline.
 */
API.taskStages = ["Design", "Develop", "Test", "Deploy"];

/**
 * Task Fields
 * Property key is field name
 * Property value is javascript data type
 */
API.taskFields = {
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
API.taskSchema = async (knex) => {
	// If table does not exist then create it.
	if (! await knex.schema.hasTable("tasks"))
	 await knex.schema.createTable("tasks", tasks=>{
		 tasks.increments("id").primary();
		 tasks.string("stage", 20);
		 tasks.string("status", 20);
		 tasks.string("title", 200);
		 tasks.text("content");
	 });

	if(! await knex.schema.hasColumn('tasks', 'id'))
		await knex.schema.table('tasks', tasks=>tasks.increments("id").primary());

	if(! await knex.schema.hasColumn('tasks', 'stage'))
		await knex.schema.table('tasks', tasks=>tasks.string("stage", 20));

	if(! await knex.schema.hasColumn('tasks', 'status'))
		await knex.schema.table('tasks', tasks=>tasks.string("status", 20));

	if(! await knex.schema.hasColumn('tasks', 'title'))
		await knex.schema.table('tasks', tasks=>tasks.string("title", 200));

	if(! await knex.schema.hasColumn('tasks', 'content'))
		await knex.schema.table('tasks', tasks=>tasks.text("content"));

	return knex;
};
