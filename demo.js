'use strict';

const server = require('./src/basicServer.js');

(async()=>{
	await server.init();
	await server.start();	
})();

