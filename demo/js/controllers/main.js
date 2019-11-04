app.controller('Main', ['Tasks', '$rootScope', '$scope', function (Tasks, $rootScope, $scope) {

	// Passing global objects into angular's base scope.
	$rootScope.data = data;
	$rootScope.sys = sys;

	sys.pageDesc = {
		task: 'Create/Update a Task',
		list: 'List of Tasks',
		kanban: 'Kanban Board',
	}

	var applyQueued;
	$rootScope.safeApply = sys.safeApply = function(){
		if(!$rootScope.$$phase){
			$rootScope.$apply();
			applyQueued = false;
		}
		else {
			if(!applyQueued) setTimeout(sys.safeApply, 1000);
			applyQueued = true;
		}
	};

	Tasks.init();

	sys.submit = function(formTask){
		if(formTask.$invalid) return alert('Required fields not filled in');
		if(data.task.id){
			sys.Tasks.DAO.update(data.task).$promise.then(function(){
				data.page = 'list';
				sys.Tasks.reload();
			});
		}else{
			data.task.$save().then(sys.Tasks.reload);
		}
	};

	sys.initTaskForm = function(){
		if(!data.task.id) sys.Tasks.new();
		else{
			data.task = sys.Tasks.load(data.task.id)
		}
	}

	sys.delTask = function(task){
		sys.Tasks.delete(task.id);
	}

	sys.createTask = function(){
		sys.Tasks.new();
		data.page = 'task';
	}

}]);