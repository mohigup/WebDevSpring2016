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
            var usrFound;
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
            console.log("client controller -calling findUserByUsername")
             UserService.findUserByUsername(user.username).then(function(usr){
                 usrFound = usr.data;
            console.log("user resuult fro findUserByUsername")
            console.log(usrFound)



                 if (usrFound != null) {
                     console.log("match found in clinet register contorller")
                     $scope.message = "User Exists Choose Different Username";
                     return;
                 }

                 console.log("no match found in clinet register contorller")
                 UserService.createUser(user)
                     .then(function(created){

                         var newUser = created.data;
                         console.log(newUser)
                         UserService.setCurrentUser(newUser);
                         //$rootScope.user = newUser;
                         //$rootScope.user.logged = true;
                         //$rootScope.user.globalusername = newUser.username;
                         $location.url('/profile');
                         //console.log($rootScope.user.globalusername);

                     });

             });



        }


    }
})();

