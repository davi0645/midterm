angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.list1', {
    url: '/list1',
    views: {
      'menuContent': {
        templateUrl: 'templates/list1.html',
        controller:'Controller1'
      } 
    }
  })

  .state('app.list2', {
    url: '/list2',
    views: {
      'menuContent': {
        templateUrl: 'templates/list2.html',
        controller: 'Controller2'
      }
    }
  })

  .state('app.list3', {
      url: '/list3',
      views: {
        'menuContent': {
          templateUrl: 'templates/list3.html',
          controller: 'Controller3'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/list1');
});
