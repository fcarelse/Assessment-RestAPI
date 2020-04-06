app.factory('Tasks', ['$resource', function ($resource) {

	var Tasks = sys.Tasks = {};

	Tasks.fields = ['id', 'title', 'content', 'stage', 'status'];

	var DAO = Tasks.DAO = $resource('/tasks/:id', {id: '@id'},{
		list: {
			method: 'GET',
			isArray: true
		},
		update: {
			method: 'PATCH',
			isArray: true
		}

	});
	
	Tasks.init = function(){
			if(Tasks.inited) return;
			Tasks.inited = true;
			Tasks.reload(true);
	};

	Tasks.reload = function(){
		DAO.list({filters: [{field:'status',op:'<>',value:'cancelled'}]}).$promise.then(function(tasks) {
			data.tasks = tasks;
			Tasks.stages = ["design", "develop", "test", "deploy"];
			Tasks.statuses = ["todo", "doing", "done"]; // Cancelled is a hidden status
			Tasks.stageStatuses = [];
			// For each stage
			Tasks.stages.forEach(stage=>{
				// Make a stage object with an 'all' parameter containing all tasks for that stage
				data[stage]={all: tasks.filter(t=>t.stage==stage)};
				// For each status
				Tasks.statuses.forEach(status=>{
					// In each stage make a status parameter with a list of tasks with that status for this stage.
					data[stage][status]=data[stage].all.filter(t=>t.status==status)
					// Create entry in stageStatuses
					Tasks.stageStatuses.push({
						id:1+Tasks.stageStatuses.length,
						stage: stage,
						status: status,
					})
				});
			});
			sys.safeApply();
		});
	};

	Tasks.load = function(id){
		data.task = DAO.get({id: id});
		data.task.$promise.then(function(){
			data.page = 'task';
			sys.safeApply();
		});
		return data.task;
	};

	Tasks.save = function(){
		var task = {};
		Tasks.fields.forEach(function(field){task[field] = data.task[field]});
		return DAO.save(task);
	}

	Tasks.delete = function(id){
		// if(!id && data.task.id) id = data.task.id
		DAO.delete({id});
		Tasks.reload();
	}

	Tasks.new = function(){
		data.task = new DAO({stage: 'design', status: 'todo'});
	};

	return Tasks;
}]);