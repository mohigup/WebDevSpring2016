"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        console.log("ProfileController");
        // var model = this;


        var currentUser = $rootScope.user;
        $scope._id = currentUser._id;
        $scope.username = currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;
        $scope.email = currentUser.email;
        $scope.roles = currentUser.roles;

        console.log("logged in user profile");

        console.log($scope.username);
        console.log($scope.firstName);
        console.log($scope.lastName);
        console.log($scope.password);
        console.log($scope._id);
        $scope.update = update;

        function update() {

            console.log("inside update");
            var newUser = {
                "_id": $scope._id,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "username": $scope.username,
                "password": $scope.password,
                "roles": $scope.roles,
                "email": $scope.email
            }
            console.log("calling update service");
            UserService.updateUser($scope._id, newUser, updateprofileview);

        }

        function updateprofileview(user) {
            UserService.setCurrentUser(user);
            console.log("user updated" + user);
            console.log($rootScope.user.logged)
        }
    }
})();