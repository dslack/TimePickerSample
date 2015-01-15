// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angularMoment'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

          .state('timepicker', {
            url: '/',
            template: '<home-page></home-page>'
          });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

    })

    .directive('homePage', function(){
      return {
        restrict: "AE",
        scope: {},
        controller: "HomePageCtrl",
        templateUrl:'js/homePage.html'
      }
    })
    .controller("HomePageCtrl", function($scope){
      var nowDate = $scope.nowDate = Date.now();
      $scope.twoHoursFromNow = nowDate + 2*60*60*1000;
      $scope.twoHoursAgo = nowDate - 2*60*60*1000;
    })
  .directive('timePicker', function(){
   return {
     restrict: "AE",
     scope: {
       initialDate: '=',
       maximumDate: '=',
       minimumDate: '='
     },
     templateUrl:'js/timePicker.html',
     controller: "TimePickerCtrl"
   }
})
.controller('TimePickerCtrl', function($scope){
      var times = {
        maxDate : null, minDate: null, currentDate: null
      };

      $scope.times = times;

      $scope.$watch('maximumDate', function(newVal, prevVal){
        if (!times.maxDate || newVal !== prevVal) {
          times.maxDate = moment(newVal);
        }
      });

      $scope.$watch('minimumDate', function(newVal, prevVal){
        if (!times.minDate || newVal !== prevVal) {
          times.minDate = moment(newVal);
        }
      });

      $scope.$watch('initialDate', function(newVal, prevVal){
        if (!times.currentDate || newVal !== prevVal) {
          times.currentDate = moment(newVal);
        }
      });

      $scope.increaseHours = function(){
        var key = 'h', step = 1;
        if (changeAndCheck(key,step)) {
          times.currentDate.add(key,step);
          fireCurrentDateChange ();
        }
      };

      $scope.decreaseHours = function(){
        var key = 'h', step = -1;
        if (changeAndCheck(key,step)) {
          times.currentDate.add(key,step);
          fireCurrentDateChange ();
        }
      };

      $scope.increaseMinutes = function(){
        var key = 'm', step = 1;
        if (changeAndCheck(key,step)) {
          times.currentDate.add(key,step);
          fireCurrentDateChange ();
        }
      };
      $scope.decreaseMinutes = function(){
        var key = 'm', step = -1;
        if (changeAndCheck(key,step)) {
          times.currentDate.add(key,step);
          fireCurrentDateChange();
        }
      };

      function changeAndCheck(key, val) {
        var newDate = times.currentDate.clone();
        if (val < 0) {
          newDate.subtract(key, val*-1);
        } else {
          newDate.add(key, val);
        }

        return withinRange(newDate);
      }

      function fireCurrentDateChange () {
        $scope.initialDate = times.currentDate.valueOf();
      }
      
      /**
       * Checks to see if the passed in newTime is within the min/max range (checking
       * @param newTime
       * @returns {*}
       */
      function withinRange(newTime){
        return (
          newTime.isBetween(times.minDate, times.maxDate, 'minute') ||
          newTime.isSame(times.minDate, 'minute') ||
          newTime.isSame(times.maxDate,'minute')
        );
      }
});
