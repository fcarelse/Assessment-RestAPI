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
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'admin',
		password: 'password',
		database: 'tasksapi',
		charset: 'utf8',
	}
}

/**
 * Default Options to be used by router or controller
 */
export const defaultOptions = {
	base: '/tasks',
	configDB: defaultDB,
};

/**
 * Default middleware to be used by router or controller
 */
export const defaultMiddleware = []

export const taskStatuses = ['ToDo', 'Doing', 'Testing', 'Done', 'Cancelled', 'Deleted']
export const taskFields = ['id', 'status', 'title', 'content']

export const taskSchema = async(knex) => {
	const exists = await knex.schema.hasTable('tasks')
	if(!exists){
		await new Promise((resolve, reject)=>{
			knex.schema.createTable('tasks', function(tasks) {
				tasks.increments('id').primary()
				tasks.string('status', 20)
				tasks.string('title', 200)
				tasks.text('content')
			});
		})
	}
}
