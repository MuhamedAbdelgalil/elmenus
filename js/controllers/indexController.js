(function(elmenusApp){

    // start controller  for login page
     'use strict';
    elmenusApp.controller("indexController",["$scope","$animate",function($scope,$animate){ 
        $scope.role="Admin";
        $animate.enabled(false)
    }]);

}(elmenusApp));