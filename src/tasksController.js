/**
 * Tasks Controller
 * Author: Francis Carelse
 * 
 */


/**
 * Tasks Controller factory method
 */
module.exports = function(middleware, options){
	// If no middleware provided, but only options
	if(!(middleware instanceof Function)) options = middleware;
	if(!(options instanceof Object) || !options) options = {};

}