/**
 * Tasks Controller
 * Author: Francis Carelse
 * 
 */


/**
 * Tasks Controller factory method
 */
export default function(middleware, options){
	// If middleware not supplied then provide default.
	middleware = middleware || defaultMiddleware;

	// If options not supplied then use default.
	options = options || defaultOptions;

	// Controller to be returned
	const Ctrl = {};

	/**
	 * Controller for Create request
	 */
	Ctrl.create = (request, reply)=>new Promise((resolve, reject)=>{
		request.payload.task
	})

}