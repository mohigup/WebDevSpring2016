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
            .otherwise({
                redirectTo: "/home"
            });
    }
    // ADDING FOR SESSION
    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getLoggedUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
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
            .then(function(response){
                console.log("response returned from get logged in");
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

})();