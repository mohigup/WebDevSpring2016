"use strict";
(function () {
    // ADDING FOR SESSION
    angular
        .module("FormBuilderApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller : "RegisterController",
                controllerAs :"model",
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs :"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController",
                controllerAs :"model",
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller : "FormController",
                controllerAs :"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/fields.view.html",
                controller:"FieldsController",
                controllerAs :"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve:{
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function(UserService, $q, $location){
        var deferred = $q.defer();
        UserService
            .getLoggedUser()
            .success(function(user){
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }else{
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    };

    // ADDING FOR SESSION
    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getLoggedUser()
            .success(function(user) {
                if(user !== '0') {
                    console.log("User logged in")
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    console.log("User not logged in")
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }

    function getLoggedIn(UserService, $q){
        var deferred = $q.defer();

        UserService
            .getLoggedUser()
            .success(function(user){
                if(user !== '0'){
                    console.log("User logged out")
                    UserService.setCurrentUser(user);
                }
                deferred.resolve();
            });
        return deferred.promise;
    }

})();