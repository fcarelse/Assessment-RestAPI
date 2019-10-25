const express = require('express')
const router = express.Router()

module.exports = function(middleware){
	router.put('/:id', tasks.create(middleware));
	router.get('/:id', tasks.read(middleware));
	router.patch('/:id', tasks.update(middleware));
	router.delete('/:id', tasks.delete(middleware));
	router.get('/', tasks.list(middleware));
	return router;
}