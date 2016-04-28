"use strict";
(function () {
    angular
        .module("GitApp")
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
                    .findUserByCredentials({
                        username: user.username,
                        password:user.password
                    })
                    .then(function (response) {

                            var currentUser = response.data;
                            if (currentUser) {
                                console.log("user returned after login is")
                                console.log(currentUser);
                                UserService.setCurrentUser(currentUser);
                                //console.log(user.roles.indexOf('admin'))
                                //$rootScope.isAdmin = true;
                                //console.log("$rootScope.user.isAdmin" + $rootScope.isAdmin);
                                console.log("here 1")
                                $location.url("/profile");

                            } else {
                                vm.message = "Invalid username/password";
                                console.log("here 2")
                            }
                        },
                        function (err) {
                            vm.message = "Invalid Username/Password";
                            console.log("here 3")
                        }
                    );
            }
        }






    }
})();
