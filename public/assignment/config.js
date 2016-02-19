(function () {

    angular
        .module("FormBuilderApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                //controller : "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                //controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                //controller : "LoginController"
            })
            .when("/admin", {
                templateUrl: "admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/form/form.view.html",
                //controller : "FormController"
            })

            .when("/form/:userid/:id", {
                templateUrl: "views/field/form-fields.view.html",
                //controller: "FieldController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();