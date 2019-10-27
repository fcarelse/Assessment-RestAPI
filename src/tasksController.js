/**
 * Tasks Controller
 * Author: Francis Carelse
 *
 */
import { defaultOptions, defaultDB, taskFields } from "./tasksAPI.js";
import * as Knex from "knex";

// Operator list for validating filters
const operators = ["=", "<", ">", "<=", ">=", "<>"];


/**
 * Tasks Controller factory method
 */
export default function(options) {
	// If options not supplied then use default.
	options = options || defaultOptions;

	// If Data Access Config not supplied then use default.
	options.configDB = options.configDB || defaultDB;

	// Controller to be returned
	const Ctrl = {};

	// Database Data Access Object
	const knex = Knex(options.configDB);

	/**
	 * Handler for Create request
	 */
	Ctrl.create = (request, reply) => async () => {
		// Retrieve the input task fields
		const inputTask = request.payload.task;

		// Extract the standard field names
		const fields = Object.keys(taskFields);

		// Limit to standard fields
		const newTask = {};
		fields.forEach(field => {
			newTask[field] = inputTask[field];
		});

		// remove id field in case something was put in there
		delete newTask.id;

		// Build a query and execute.
		const id = await knex('tasks').insert(newTask, ["id"]);

		// Return created task and return create success status code.
		return reply({ id, ...newTask }).code(options.createSuccessCode || 201);
	};

	/**
	 * Handler for Read request
	 */
	Ctrl.read = (request, reply) => async () => {
		// Retrieve the id for the task to return
		const id = request.query.id;

		// Extract the standard field names
		const fields = Object.keys(taskFields);

		// Catch errors
		try {
			// Build a query and execute.
			const task = await knex('tasks').where({ id }).select(fields);

			// If no error return the retrieved task and read success status code
			return reply(task).code(options.readSuccessCode || 200);

			// Catch any error
		} catch (err) {
			// If error return not found code
			return reply({ error: 404, message: "Not found" }).code(404);
		}
	};

	/**
	 * Handler for Update request
	 */
	Ctrl.update = (request, reply) => async () => {
		// Retrieve the input task fields
		const inputTask = request.payload.task;

		// Extract the standard field names
		const fields = Object.keys(taskFields);

		// Limit to standard fields
		const updateTask = {};
		fields.forEach(field => {
			updateTask[field] = inputTask[field];
		});

		// Extract id
		const id = updateTask.id;

		// Remove id from fields to update
		delete updateTask.id;

		// Build a query and execute.
		const id = await knex('tasks').where("id", "=", id).update(updateTask);

		// Return created task and return update success status code.
		return reply(updateTask).code(options.updateSuccessCode || 204);
	};

	/**
	 * Handler for Delete request
	 */
	Ctrl.delete = (request, reply) => async () => {
		// Retrieve the id for the task to be deleted
		const id = request.query.id;

		// Catch errors
		try {
			// Build a query and execute.
			const task = await knex('tasks').where({ id }).del();

			// If no error return the retrieved task and read success status code
			return reply(task).code(options.deleteSuccessCode || 202);

			// Catch any error
		} catch (err) {
			// If error return not found code
			return reply({ error: 404, message: "Not found" }).code(404);
		}
	};

	/**
	 * Handler for List request
	 */
	Ctrl.list = (request, reply) => async () => {
		// Retrieve the filter
		const filters = request.payload.filters;

		// Must be an array
		if(!(filters instanceof Array)) filters = [];
		// Validate all filters
		filters = filters.filter(Ctrl.validateFilter);

		// Catch errors
		try {
			// Build a query.
			let query = knex('tasks');

			// Process filters
			for(let i=0;i<filters.length;i++){
				// Extract a filter
				let filter = filters[i];

				// Check if first index
				if(i==0){
					// Primary filter is simple where
					query = query.where(filter.field, filter.op, filter.value);
				} else {
					// Each secondary filter is anded
					query = query.andWhere(filter.field, filter.op, filter.value);
				}
			}

			// Execute query
			const tasks = await query.select('*');

			// If no error return the retrieved tasks and read success status code
			return reply(tasks).code(options.readSuccessCode || 200);

			// Catch any error
		} catch (err) {
			// If error return not found code
			return reply({ error: 404, message: "Not found" }).code(404);
		}
	};

	/**
	 * Method to validate or correct filter
	 * 
	 * Each filter must have a field and value
	 * Default operator is '='
	 */
	Ctrl.validateFilter = filter => {
		// Filter must be an object
		if(!(filter instanceof Object)) return false;

		// Validate field parameter
		if (
			// Field value provided
			!filter.field ||
			// Field must be a string
			!(filter.field instanceof String) ||
			// Field naming constraints
			filter.field.match(/[^a-zA-Z0-9_]/)
		)
			return false;

		// If no operator then add an operator
		if (!filter.op) filter.op = "=";
		// if operator not recognized filter invalid
		if (!operators.contains(filter.op)) return false;

		// Simple equivalence to null checks for null and undefined value
		if (filter.value == null) return false;

		// Default to true
		return true;
	};
}
