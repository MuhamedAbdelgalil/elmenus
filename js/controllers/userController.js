(function(elmenusApp,dataSource){
     'use strict';
     // role user controller
    elmenusApp.controller("userController",["$scope",function($scope){
        // dataSource is aglobal array of objects
       $scope.categoriesList = dataSource.categories;
       
    }]);

}(elmenusApp,dataSource));