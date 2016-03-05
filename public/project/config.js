"use strict";
(function () {

    angular
        .module("GitApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller : "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller : "LoginController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller : "FormController"
            })
            .when("/forms-fields", {
                templateUrl: "views/forms/form-fields.view.html",
                controller: "FieldsController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/statistics/:user_name/:repo_name", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as model"
            })
            .when("/slidebuilder/", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController"
            })
            .when("/slidebuilder/:sha", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

