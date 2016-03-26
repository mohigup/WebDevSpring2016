"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, UserService, $location, $rootScope) {

        var vm = this;
        console.log("inside LoginController");
        vm.login = login;
        function init(){

        }
        init();

        function login(user ) {
            if (!(user && user.username && user.password)) {
                vm.message = "Please provide username and password to login.";
            } else {
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function (response) {

                            var currentUser = response.data;
                            if (currentUser) {
                                UserService.setCurrentUser(currentUser);
                                var status = false;
                                for (var i in user.roles) {
                                    if (user.roles[i] == "admin") {
                                        status = true;
                                        break;
                                    }

                                }
                                UserService.setCurrentUser(user);
                                $rootScope.isAdmin = status;
                                console.log("$rootScope.user.isAdmin" + $rootScope.isAdmin);

                                $location.url("/profile");
                            } else {
                                vm.message = "Invalid username/password";
                            }
                        },
                        function (err) {

                        }
                    );
            }
        }






    }
})();
