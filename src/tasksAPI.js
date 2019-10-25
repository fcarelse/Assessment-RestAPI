const express = require('express')
const router = express.Router()

/**
 * Module returns a builder function.
 * This creates an express router using the provided midddleware.
 * 
 * @param middleware callback
 */
module.exports = function(middleware){
	// Create route
	router.put('/:id', tasks.create(middleware));

	// Read route
	router.get('/:id', tasks.read(middleware));

	// Update route
	router.patch('/:id', tasks.update(middleware));

	// Delete route
	router.delete('/:id', tasks.delete(middleware));

	// List route
	router.get('/', tasks.list(middleware));

	// Return the built router.
	return router;
};

