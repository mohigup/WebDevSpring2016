"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $rootScope) {

        $scope.register = register;
        console.log("RegisterController");
        function register(user) {
            console.log(user);

            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifypassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifypassword) {
                $scope.message = "Passwords must match";
                return;
            }
            var usr = UserService.findUserByUsername(user.username);
            if (usr != null) {
                $scope.message = "User Exists Choose Different Username";
                return;
            }


            UserService.createUser(user, function (response) {

                var newUser = response;
                UserService.setCurrentUser(newUser);
                //$rootScope.user = newUser;
                //$rootScope.user.logged = true;
                //$rootScope.user.globalusername = newUser.username;
                $location.url('/profile');
                //console.log($rootScope.user.globalusername);

            });

        }


    }
})();

