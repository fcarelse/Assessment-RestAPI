'use strict';

const server = require('./basicServer.js');

(async()=>{
	await server.init();
	await server.start();	
})();

