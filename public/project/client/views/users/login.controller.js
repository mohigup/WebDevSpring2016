"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("UserLoginController", UserLoginController)

    function UserLoginController($scope, UserService, $location, $rootScope) {

        var vm = this;
        console.log("inside UserLoginController");
        vm.login = login;
        function init() {

        }

        init();

        function login(user) {
            if (!(user && user.username && user.password)) {
                vm.message = "Please provide username and password to login.";
            } else {
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function (response) {

                            var currentUser = response.data;
                            console.log("user returned after login is")
                            console.log(response)
                            console.log(response.data)
                            if (currentUser) {
                                console.log("logged in first");
                                console.log(currentUser)
                                UserService.setCurrentUser(currentUser);
                                var status = false;
                                for (var i in currentUser.roles) {
                                    if (currentUser.roles[i] == "admin") {
                                        status = true;
                                        break;
                                    }

                                }
                                //UserService.setCurrentUser(user);
                                $rootScope.isAdmin = status;
                                console.log("$rootScope.user.isAdmin" + $rootScope.isAdmin);

                                $location.url("/profile");
                            } else {
                                vm.message = "Invalid username/password";
                            }
                        },
                        function (err) {
                            vm.message = "Invalid username/password";
                        }
                    );
            }
        }


    }
})();
