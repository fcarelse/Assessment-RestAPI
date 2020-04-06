'use strict';

// For a simple demo just using global objects as scopes.
var data = {}; // Global data
var sys = {}; // Global system

// Defining the demo app.
var app = angular.module('demo', ['ngResource']);

// Just fixing some default behaviour to help work with REST.
app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

/**
 * When the app is fully loaded
 */
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#';

	// Booting up the Angular Web App demo to the scope of the entire document
	angular.bootstrap(document, ['demo']);
});

