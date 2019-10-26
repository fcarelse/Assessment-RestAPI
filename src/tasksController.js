/**
 * Tasks Controller
 * Author: Francis Carelse
 *
 */
import { defaultOptions, defaultDB, taskFields } from "./tasksAPI.js";
import * as Knex from "knex";

/**
 * Tasks Controller factory method
 */
export default function(options) {
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
    const id = await knex.insert(newTask, ["id"]);

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
      const task = await knex.select(fields).where({ id });

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
    const id = await knex.where("id", "=", id).update(updateTask);

    // Return created task and return update success status code.
    return reply(updateTask).code(options.updateSuccessCode || 204);
  };
}
