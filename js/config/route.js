(function (elmenusApp) {
    elmenusApp.config(function ($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "./pages/index.html",
                controller: "indexController"
            }).when("/admin", {
                templateUrl: "./pages/admin.html",
                controller: "adminController"
            })
            .when("/user", {
                templateUrl: "./pages/user.html",
                controller: "userController"
            }).otherwise({
                redirectTo: '/'
            });
    });

} (elmenusApp));
