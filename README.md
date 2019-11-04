# Rest Tasks API (Assessment)

Rest API extendable through middleware and options

Uses Hapi servers and extends the server with a set of routes for the REST implementation for Task records.

Tasks have stages and statuses as well as a title and content

Stages: "Design", "Develop", "Test" and "Deploy"
Statuses: "ToDo", "Doing", "Done" and "Cancelled"

## **Usage:**
 ```javascript
const API = require('@fcarelse/hapi-api-tasks-rest');
API.init(server);
```

This uses the default database of an sqlite file tasks.sqlite for demo purposes

## **Database Config:**

 Standard Knex type configuration

 E.g. For MySQL
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

## **Demo:**

Requirements:
 - Node version min 10.x 'https://nodejs.org/'
 - Git 'https://git-scm.com/downloads'

Install:
> `git clone https://github.com/fcarelse/Assessment-RestAPI.git`
> `cd Assessment-RestAPI`
> `npm install`

Run Demo:
> `npm start`
Then open browser at 'http://localhost:3000/'

Reset data:
> At the top right, on the main navigation bar on the page is an option "Reset" to reset the task list.
> In the list view there is also a tab bar to switch between Kanban-board view and Todo-list view.
> Clicking on an item will open it for editting in a basic form.
