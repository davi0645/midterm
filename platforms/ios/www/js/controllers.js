angular.module('starter.controllers', [])
/*
    Author:    Devon Cook cook0246
    
    
    TODO:
        set up local notification instead of cordovadialog
    
        go through bower dependencies and gitignore
        fix the css for the add button
        use ion-toggle instead of the css I set up for the toggle switch
        
        duplicate list1Controller for list 2 and list 3   (also the html for both)
        
        test the app on a physical android device with Android 5.1.1 or higher
        
        
*/

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});    

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('List1Controller', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
    //INITIALIZE THE LIST
        if(LocalStorageService.getStorageList("list1")){
            $scope.list1 = JSON.parse(LocalStorageService.getStorageList("list1"));

        } else {
            $scope.list1 = [
                {
                   task: "1: Tap a task to mark it as complete:",
                   done: 'false',
                },
                {
                   task: "I am a completed task",
                   done: 'true',
                },
                {
                   task: "2: Double tap a task to delete it:",
                   done: 'false',
                },
                {
                   task: "Double tap me :D",
                   done: 'true',
                },
                {
                   task: "3: List will be cleared when all tasks are completed",
                   done: 'false'
                }
            ];
        };

    //INITIALIZE THE SETTINGS
        if(LocalStorageService.getStorageList("Settings")){
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));

        } else {
            $scope.Settings = [
                {
                    Status: true,
                },
                {
                    Status: true,
                }
            ];

            LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));
        };
    
    //ADDING A TASK
        $scope.addTask = function(){
            $scope.list1.push({
                task : $scope.newTask,
                done : "false"
            });

            LocalStorageService.setStorageList("list1", JSON.stringify($scope.list1));
            $scope.newTask = ""; 
        };

    //DELETING A TASK
        $scope.deleteTask = function(taskIndex){
            
            $scope.list1.splice(taskIndex, 1);
            LocalStorageService.setStorageList("list1", JSON.stringify($scope.list1));
        }
        
    //COMPLETING A TASK
        $scope.completeTask = function($event, taskIndex){
            
            //Refresh the settings (in case the user changed the setting then returned to this page)
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));
            
            //triggers change in css style (ng-class needs this to function when screen inits)
            $event.target.classList.toggle("completed");
            

            //syncs completion status of task with the scope
            if ($event.target.classList.contains("completed")){
                $scope.list1[taskIndex].done = 'true';
                
                    //Triggers device to vibrate when task is complete (only if the setting is true)
                    if($scope.Settings[0].Status == true){
                        $cordovaVibration.vibrate(200);
                    }
            }else{
                $scope.list1[taskIndex].done = 'false';
            }

            //checks if all tasks in the list are completed
            var numCompleted = 0;           
            for(x in $scope.list1){
               
                if($scope.list1[x].done == 'true'){
                    numCompleted++;
    
                    if(numCompleted == $scope.list1.length){
                        //only alert the user if the setting for push notification is enabled.
                        if($scope.Settings[1].Status == true){
                            $cordovaLocalNotification.add({
                                id: 1,
                                title: 'ToDo Midterm App',
                                text: 'All tasks completed, Clearing the list..'
                              })
                        }
                                                
                        //loop through and delete each task (this works better than deleting the list all at once 
                        // due to the user not being forced to see the default tasks again)
                        for(y=0; y < $scope.list1.length; y++){
                            $scope.list1.splice(y);
                        }
                        
                    }
                }
            }
            
            LocalStorageService.setStorageList("list1", JSON.stringify($scope.list1));
        }
        
 })

.controller('List2Controller', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
     //INITIALIZE THE LIST
        if(LocalStorageService.getStorageList("list2")){
            $scope.list2 = JSON.parse(LocalStorageService.getStorageList("list2"));

        } else {
            $scope.list2 = [
                {
                   task: "I am a task you have not completed yet",
                   done: 'false',
                },
                {
                   task: "I am a completed task :) ",
                   done: 'true',
                }
            ];
        };

    //INITIALIZE THE SETTINGS
        if(LocalStorageService.getStorageList("Settings")){
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));

        } else {
            $scope.Settings = [
                {
                    Status: true,
                },
                {
                    Status: true,
                }
            ];

            LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));
        };
    
    //ADDING A TASK
        $scope.addTask = function(){
            $scope.list2.push({
                task : $scope.newTask,
                done : "false"
            });

            LocalStorageService.setStorageList("list2", JSON.stringify($scope.list2));
            $scope.newTask = ""; 
        };

    //DELETING A TASK
        $scope.deleteTask = function(taskIndex){
            
            $scope.list2.splice(taskIndex, 1);
            LocalStorageService.setStorageList("list2", JSON.stringify($scope.list2));
        }
        
    //COMPLETING A TASK
        $scope.completeTask = function($event, taskIndex){
            
            //Refresh the settings (in case the user changed the setting then returned to this page)
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));
            
            //triggers change in css style (ng-class needs this to function when screen inits)
            $event.target.classList.toggle("completed");
            

            //syncs completion status of task with the scope
            if ($event.target.classList.contains("completed")){
                $scope.list2[taskIndex].done = 'true';
                
                    //Triggers device to vibrate when task is complete (only if the setting is true)
                    if($scope.Settings[0].Status == true){
                        $cordovaVibration.vibrate(200);
                    }
            }else{
                $scope.list2[taskIndex].done = 'false';
            }

            //checks if all tasks in the list are completed
            var numCompleted = 0;           
            for(x in $scope.list2){
               
                if($scope.list2[x].done == 'true'){
                    numCompleted++;
    
                    if(numCompleted == $scope.list2.length){
                        //only alert the user if the setting for push notification is enabled.
                        if($scope.Settings[1].Status == true){
                            $cordovaLocalNotification.add({
                                id: 1,
                                title: 'ToDo Midterm App',
                                text: 'All tasks completed, Clearing the list..'
                              })
                        }
                                                
                        //loop through and delete each task (this works better than deleting the list all at once 
                        // due to the user not being forced to see the default tasks again)
                        for(y=0; y < $scope.list2.length; y++){
                            $scope.list2.splice(y);
                        }
                        
                    }
                }
            }
            
            LocalStorageService.setStorageList("list2", JSON.stringify($scope.list2));
        }
        
 })

.controller('List3Controller', function($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification){
   //INITIALIZE THE LIST
        if(LocalStorageService.getStorageList("list3")){
            $scope.list3 = JSON.parse(LocalStorageService.getStorageList("list3"));

        } else {
            $scope.list3 = [
                {
                   task: "Welcome to List3! :D",
                   done: 'false',
                },
                {
                   task: "I am a completed task in List 3 :)",
                   done: 'true',
                }
            ];
        };

    //INITIALIZE THE SETTINGS
        if(LocalStorageService.getStorageList("Settings")){
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));

        } else {
            $scope.Settings = [
                {
                    Status: true,
                },
                {
                    Status: true,
                }
            ];

            LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));
        };
    
    //ADDING A TASK
        $scope.addTask = function(){
            $scope.list3.push({
                task : $scope.newTask,
                done : "false"
            });

            LocalStorageService.setStorageList("list3", JSON.stringify($scope.list3));
            $scope.newTask = ""; 
        };

    //DELETING A TASK
        $scope.deleteTask = function(taskIndex){
            
            $scope.list3.splice(taskIndex, 1);
            LocalStorageService.setStorageList("list3", JSON.stringify($scope.list3));
        }
        
    //COMPLETING A TASK
        $scope.completeTask = function($event, taskIndex){
            
            //Refresh the settings (in case the user changed the setting then returned to this page)
            $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));
            
            //triggers change in css style (ng-class needs this to function when screen inits)
            $event.target.classList.toggle("completed");
            

            //syncs completion status of task with the scope
            if ($event.target.classList.contains("completed")){
                $scope.list3[taskIndex].done = 'true';
                
                    //Triggers device to vibrate when task is complete (only if the setting is true)
                    if($scope.Settings[0].Status == true){
                        $cordovaVibration.vibrate(200);
                    }
            }else{
                $scope.list3[taskIndex].done = 'false';
            }

            //checks if all tasks in the list are completed
            var numCompleted = 0;           
            for(x in $scope.list3){
               
                if($scope.list3[x].done == 'true'){
                    numCompleted++;
    
                    if(numCompleted == $scope.list3.length){
                        //only alert the user if the setting for push notification is enabled.
                        if($scope.Settings[1].Status == true){
                            $cordovaLocalNotification.add({
                                id: 1,
                                title: 'ToDo Midterm App',
                                text: 'All tasks completed, Clearing the list..'
                              })
                        }
                                                
                        //loop through and delete each task (this works better than deleting the list all at once 
                        // due to the user not being forced to see the default tasks again)
                        for(y=0; y < $scope.list3.length; y++){
                            $scope.list3.splice(y);
                        }
                        
                    }
                }
            }
            
            LocalStorageService.setStorageList("list3", JSON.stringify($scope.list3));
        }
        
 })

.controller('SettingsController', function($scope, LocalStorageService){

    
     if(LocalStorageService.getStorageList("Settings")){
        $scope.Settings = JSON.parse(LocalStorageService.getStorageList("Settings"));
 
    } else {
        $scope.Settings = [
            {
                Status: true, 
            },
            {
                Status: true,
            }
        ];
        
        LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));
    };    
    
  
    
    $scope.Setting1Tapped = function(){
        
        $scope.Settings[0].Status = !$scope.Settings[0].Status;
        LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));

    }
    
    
    $scope.Setting2Tapped = function(){

        $scope.Settings[1].Status = !$scope.Settings[1].Status;
        LocalStorageService.setStorageList("Settings", JSON.stringify($scope.Settings));
    }       
    
})
