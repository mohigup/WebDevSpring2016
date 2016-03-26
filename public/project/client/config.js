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
            .when("/profile", {
                templateUrl: "views/admin/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/admin/login.view.html",
                controller : "LoginController",

                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "views/issues/issues.view.html",
                controller : "FormController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/statistics/:user_name/:repo_name", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as model"
            })
            .when("/slidebuilder/", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController",
                controllerAs: "model"
            })
            .when("/slidebuilder/:sha", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController",
                controllerAs: "model"
            })
            .when("/contact/", {
                templateUrl: "views/contact/contact.view.html",

            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

