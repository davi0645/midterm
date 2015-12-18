//review services notes,  make sure services.js is imported in index.html

angular.module('starter.services', [])

.factory('LocalStorageService', function($localStorage){
    
    return{
        setStorageList : function(key, value){
            $localStorage[key] = value;
        },
        getStorageList : function(key) {

            return $localStorage[key];
        },
      
    };
});