angular.module('starter.controllers', [])

.controller('Controller1', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
        if(LocalStorageService.getStorageList("todo1")){
            $scope.todo1 = JSON.parse(LocalStorageService.getStorageList("todo1"));
        } else {
            $scope.todo1 = [{
			   	task: "A List Item 1",
			   	done: 'false',
			},
			{
				task: "A List Item 2",
			    done: 'false',
			},
			{
				task: "A List Item 3",
			    done: 'false',
			}];
        };

        $scope.addItem = function(){
            $scope.todo1.push({
                task : $scope.newTask,
                done : "false"
            });

            LocalStorageService.setStorageList("todo1", JSON.stringify($scope.todo1));
            $scope.newTask = ""; 
        };

        $scope.deleteItem = function(taskIndex){
            $scope.todo1.splice(taskIndex, 1);
            LocalStorageService.setStorageList("todo1", JSON.stringify($scope.todo1));
        }
        
        $scope.completeItem = function($event, taskIndex){
            $event.target.classList.toggle("completed");
            
            if ($event.target.classList.contains("completed")){
                $scope.todo1[taskIndex].done = 'true';
                $cordovaVibration.vibrate(200);
            } else {
                $scope.todo1[taskIndex].done = 'false';
            }

            var itemsCompleted = 0;           
            for(x in $scope.todo1){
                if($scope.todo1[x].done == 'true'){
                    itemsCompleted++;   
                    if(itemsCompleted == $scope.todo1.length){
						$cordovaLocalNotification.add({
							id: 1,
							title: 'Ionic Midterm App',
							text: 'All Items Completed! :D'
						})
                        for(y=0; y < $scope.todo1.length; y++){
                            $scope.todo1.splice(y);
                        }
                        
                    }
                }
            }
            
            LocalStorageService.setStorageList("todo1", JSON.stringify($scope.todo1));
        }
        
 })

.controller('Controller2', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
        if(LocalStorageService.getStorageList("todo2")){
            $scope.todo2 = JSON.parse(LocalStorageService.getStorageList("todo2"));

        } else {
            $scope.todo2 = [{
			   	task: "A List Item 1",
			   	done: 'false',
			},
			{
				task: "A List Item 2",
			    done: 'false',
			},
			{
				task: "A List Item 3",
			    done: 'false',
			}];
        };
    
        $scope.addItem = function(){
            $scope.todo2.push({
                task : $scope.newTask,
                done : "false"
            });
            LocalStorageService.setStorageList("todo2", JSON.stringify($scope.todo2));
            $scope.newTask = ""; 
        };

        $scope.deleteItem = function(taskIndex){
            $scope.todo2.splice(taskIndex, 1);
            LocalStorageService.setStorageList("todo2", JSON.stringify($scope.todo2));
        }
        
        $scope.completeItem = function($event, taskIndex){
            $event.target.classList.toggle("completed");
            if ($event.target.classList.contains("completed")){
                $scope.todo2[taskIndex].done = 'true';
                $cordovaVibration.vibrate(200);
            } else {
                $scope.todo2[taskIndex].done = 'false';
            }

            var itemsCompleted = 0;           
            for (i in $scope.todo2){
                if ($scope.todo2[i].done == 'true'){
                    itemsCompleted += 1;
                    if (itemsCompleted == $scope.todo2.length){
						$cordovaLocalNotification.add({
							id: 1,
							title: 'Ionic Midterm App',
							text: 'All Items Completed! :D'
						})
                        for (y=0; x < $scope.todo2.length; x++){
                            $scope.todo2.splice(x);
                        }
                    }
                }
            }
            LocalStorageService.setStorageList("todo2", JSON.stringify($scope.todo2));
        }
 })

.controller('Controller3', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
        if(LocalStorageService.getStorageList("todo3")){
            $scope.todo3 = JSON.parse(LocalStorageService.getStorageList("todo3"));

        } else {
            $scope.todo3 = [{
			   	task: "A List Item 1",
			   	done: 'false',
			},
			{
				task: "A List Item 2",
			    done: 'false',
			},
			{
				task: "A List Item 3",
			    done: 'false',
			}];
        };

        $scope.addItem = function(){
            $scope.todo3.push({
                task : $scope.newTask,
                done : "false"
            });

            LocalStorageService.setStorageList("todo3", JSON.stringify($scope.todo3));
            $scope.newTask = ""; 
        };

        $scope.deleteItem = function(taskIndex){
            $scope.todo3.splice(taskIndex, 1);
            LocalStorageService.setStorageList("todo3", JSON.stringify($scope.todo3));
        }
        
        $scope.completeItem = function($event, taskIndex){
			
			$event.target.classList.toggle("completed");
			
            if ($event.target.classList.contains("completed")){
                $scope.todo3[taskIndex].done = 'true';
                $cordovaVibration.vibrate(200);
            } else {
                $scope.todo3[taskIndex].done = 'false';
            }

            var itemsCompleted = 0;           
            for (x in $scope.todo3){
                if ($scope.todo3[x].done == 'true'){
                    itemsCompleted += 1;
                    if (itemsCompleted == $scope.todo3.length){
						$cordovaLocalNotification.add({
							id: 1,
							title: 'Ionic Midterm App',
							text: 'All Items Completed! :D'
						})
                        for (y=0; y < $scope.todo3.length; y++){
                            $scope.todo3.splice(y);
                        }
                    }
                }
            }
            LocalStorageService.setStorageList("todo3", JSON.stringify($scope.todo3));
        }
 })

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('templates/splash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.endSplash = function() {
    $scope.modal.hide();
  };

  $scope.splash = function() {
    $timeout(function() {
      $scope.endSplash();
    }, 1500);
  };
})