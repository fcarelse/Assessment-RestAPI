/**
 * Tasks Controller
 * Author: Francis Carelse
 * 
 */
import {defaultOptions, defaultMiddleware, defaultDB} from './tasksAPI.js'
import * as Knex from 'kenx'

/**
 * Tasks Controller factory method
 */
export default function(middleware, options){
	// If middleware not supplied then provide default.
	middleware = middleware || defaultMiddleware;

	// If options not supplied then use default.
	options = options || defaultOptions;

	// If Data Access Object not supplied then use default.
	options.configDB = options.configDB || defaultDB;

	// Controller to be returned
	const Ctrl = {};

	// Database Data Access Object
	const knex = Knex(options.configDB);

	/**
	 * Handler for Create request
	 */
	Ctrl.create = (request, reply)=>
		new Promise((resolve, reject)=>{
			// Retrieve the new task
			const newTask = request.payload.task;
			// Build a query and execute.
			Knex.insert(newTask,['id'])
		})

}