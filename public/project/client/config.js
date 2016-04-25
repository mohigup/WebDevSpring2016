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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/admin/login.view.html",
                controller : "LoginController",

                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "views/issues/issues.view.html",
                controller : "IssueController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",

            })
            .when("/commits", {
                templateUrl: "views/slides/commits.view.html",
                controller: "CommitsController",
                controllerAs: "model",
                resolve:{
                    isSession: isSession
                }
            })
            .when("/statistics/:user_name/:repo_name", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as model",
                resolve:{
                    isSession: isSession
                }
            })
            .when("/slidebuilder/", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController",
                controllerAs: "model",
                resolve:{
                    isSession: isSession
                }
            })
            .when("/slidebuilder/:sha/:flag", {
                templateUrl: "views/slides/slides.view.html",
                controller: "SlidesController",
                controllerAs: "model",
                resolve:{
                    isSession: isSession
                }
            })

            .when("/contact/", {
                templateUrl: "views/contact/contact.view.html",
                controller: "ContactController",
                controllerAs: "model"

            })
            .when("/release/", {
                templateUrl: "views/details/release.details.view.html",
                controller: "ReleaseDetailsController",
                controllerAs: "model"

            })
            .when("/release/:username/:repository", {
                templateUrl: "views/details/release.details.view.html",
                controller: "ReleaseDetailsController",
                controllerAs: "model",
                resolve:{
                    isSession: isSession
                }

            })
            .when("/issuesdashboard", {
                templateUrl: "views/dashboard/issues.dashboard.html",
                controller: "IssueDashBoardController",
                resolve:{
                    isSession: isSession
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $q, $location) {
            var deferred = $q.defer();
            UserService
                .getLoggedinUser()
                .success(function(user) {
                    if(user !== '0') {
                        UserService.setCurrentUser(user);
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
                .getLoggedinUser()
                .success(function(user){
                    if(user !== '0'){
                        UserService.setCurrentUser(user);
                    }
                    deferred.resolve();
                });
            return deferred.promise;
        }
    }
    var isSession = function(UserService, $q, $location){
        var deferred = $q.defer();
        var usr= UserService
            .getCurrentGitUser();

                if (usr)
                {
                    console.log("user session "+usr)
                    deferred.resolve();
                }else{
                    console.log("user session not there "+usr)
                    deferred.reject();
                    $location.url("/home");
                }
        return deferred.promise;
    };

})();

