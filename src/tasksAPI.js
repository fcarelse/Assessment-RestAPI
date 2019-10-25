/**
 * Tasks API
 * Author: Francis Carelse
 * 
 */

import router from './tasksRouter.js'
import controller from './tasksController.js'

/**
 * Default Options to be used by router or controller
 */
export const defaultOptions = {
	base: '/tasks',
};

/**
 * Default middleware to be used by router or controller
 */
export const defaultMiddleware = [];

export default {router, controller};