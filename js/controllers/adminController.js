(function (elmenusApp) {

    //main controller
    //mange dishes and categories

    elmenusApp.controller("adminController", ["$scope", "$mdDialog", "$log", "$filter", function ($scope, $mdDialog, $log, $filter) {
        $scope.categoriesList = dataSource.categories;
        $scope.animationsEnabled = true;
        $scope.dish = {};
        $scope.category = {};


        // Add New cat
        $scope.addCategory = function () {
            $scope.category = {};
            $mdDialog.show({
                templateUrl: './pages/category.html',
                controller: DialogController,
                locals: {
                    modalTitle: "Add new category",
                    category: $scope.category,
                }
            }) // if add successfuly added 
                .then(function (data) {
                    $scope.category.name = data;
                    $scope.category.id = $scope.categoriesList[$scope.categoriesList.length - 1]["id"]++;
                    $scope.categoriesList.push($scope.category);
                }, function () {
                    $log("User canceled add category");
                });
        }

        ///////////////////////////////////////////////////////////////

        // update category
        $scope.updateCategory = function (category) {
            $scope.category = JSON.parse(JSON.stringify(category));
            $mdDialog.show({
                templateUrl: './pages/category.html',
                controller: DialogController,
                locals: {
                    modalTitle: "update category",
                    category: $scope.category,
                }
            })// if updated
                .then(function (data) {

                    var selectedCategory = $scope.categoriesList.indexOf(category);
                    $scope.categoriesList[selectedCategory].name = data;

                }, function () {
                     $log("User canceled update");
                });
        }

        ///////////////////////////////////////////////////////////////

        // delete category
        $scope.deleteCategory = function (category) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want delete this Category?')
                .textContent('All dishs in this category also will be removed!')
                .ariaLabel('Are you sure?')
                .ok('Yes')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                var selectedCategory = $scope.categoriesList.indexOf(category);
                $scope.categoriesList.splice(selectedCategory, 1);
            }, function () {

            });

        }


        /* ****************  Dishes functions ****************/

        // Add New dish
        $scope.addDish = function (category) {
            $scope.category = JSON.parse(JSON.stringify(category));
            $scope.dish = {};
            $mdDialog.show({
                templateUrl: './pages/dish.html',
                controller: DialogController,
                locals: {
                    modalTitle: "Add new dish",
                    category: $scope.category,
                }
            })// if dish added successfully  
                .then(function (data) {
                    var selectedCategory = $scope.categoriesList.indexOf(category);
                    $scope.categoriesList[selectedCategory]["items"] = $scope.categoriesList[selectedCategory]["items"] || [];
                    $scope.categoriesList[selectedCategory]["items"].push(data);
                }, function () {
                    $log("User canceled add dish");
                });
        }

        ///////////////////////////////////////////////////////////////

        // Update  dish
        $scope.updateDish = function (category, dish) {
            $scope.category = JSON.parse(JSON.stringify(category));
            $scope.category.dish = JSON.parse(JSON.stringify(dish));;
            $mdDialog.show({
                templateUrl: './pages/dish.html',
                controller: DialogController,
                locals: {
                    modalTitle: "Update dish",
                    category: $scope.category,
                }
            })// if updates
                .then(function (data) {
                    var selectedCategory = $scope.categoriesList.indexOf(category);

                    var selectedDish = $scope.categoriesList[selectedCategory]["items"].indexOf(dish);
                    $scope.categoriesList[selectedCategory]["items"][selectedDish] = data;

                }, function () {
                     $log("User canceled update dish");
                });
        }

        ///////////////////////////////////////////////////////////////

        // delete dish
        $scope.deleteDish = function (category, dish) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want delete this Dish?')
                .ariaLabel('Are you sure?')
                .ok('Yes')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                var selectedCategory = $scope.categoriesList.indexOf(category);

                var selectedDish = $scope.categoriesList[selectedCategory]["items"].indexOf(dish);
                $scope.categoriesList[selectedCategory]["items"].splice(selectedDish, 1);

            }, function () {
                 $log("User canceled delete dish");
            });

        }

        /* ****************  End Dishes functions ****************/

        /*===========================================================================================*/


        // this a helper controller to manage ngMaterial modalTitle
        function DialogController($scope, $mdDialog, category, modalTitle) {
            $scope.category = category;
            $scope.modalTitle = modalTitle;
        
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.done = function (data) {
                $mdDialog.hide(data);
            };

        }

    }]);
} (elmenusApp));