
# Rest Tasks API (Assessment)

Rest API extendable through middleware and options

Uses Hapi servers and extends the server with a set of routes for the REST implementation for Task records.

Tasks have stages and statuses as well as a title and content

Stages: "Design", "Develop", "Test" and "Deploy"
Statuses: "ToDo", "Doing", "Done" and "Cancelled"

## **Usage:**
 ```javascript
const API = require('./src/tasksAPI.js);
API.init(server);
```

This uses the default database of an sqlite file tasks.sqlite for demo purposes

## **Database Config:**

 E.g. for MySQL
 ```javascript
{
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "admin",
		password: "admin",
		database: "tasksapi",
		charset: "utf8"
	}
}
```

The API is passed an options object for more detailed configuration:

## **Options Parameters:**
E.g. API.init(server, options)
 - options.middleware = takes the Hapi format for middleware such as for user authentication.
 - options.knex = takes the Knex data access object or compatible for use during data operations in the controller
 - options.configDB = takes a database configuration to create a Knex object if one is not supplied
 - options.base = base route to place the API's routes. Defaults to '/tasks'
 - options.createSuccessCode = code to use for successful create operation. Defaults to 201.
 - options.readSuccessCode= code to use for successful create operation. Defaults to 200.
 - options.updateSuccessCode= code to use for successful create operation. Defaults to 204.
 - options.deleteSuccessCode= code to use for successful create operation. Defaults to 202.
 - options.listSuccessCode= code to use for successful create operation. Defaults to 200.

