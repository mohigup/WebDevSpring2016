"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $rootScope) {

        var vm = this;

        function init(){

        }
        init();

        vm.register = register;
        console.log("RegisterController");
        function register(user) {
            console.log(user);
            var usrFound;
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifypassword) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifypassword) {
                vm.message = "Passwords must match";
                return;
            }/*
            console.log("client controller -calling findUserByUsername")
             UserService.findUserByUsername(user.username).then(function(usr){
                 usrFound = usr.data;
            console.log("user resuult fro findUserByUsername")
            console.log(usrFound)



                 if (usrFound != null) {
                     console.log("match found in clinet register contorller")
                     vm.message = "User Exists Choose Different Username";
                     return;
                 }

                 console.log("no match found in clinet register contorller")*/
                 UserService.createUser(user)
                     .then(function(created){

                         var newUser = created.data;
                         if (newUser == null) {
                             vm.message = "User Exists. Please Choose Different UserName";
                             $location.url('/register');}
                         else{
                             console.log(newUser)
                             UserService.setCurrentUser(newUser);
                             //$rootScope.user = newUser;
                             //$rootScope.user.logged = true;
                             //$rootScope.user.globalusername = newUser.username;
                             $location.url('/profile');
                             //console.log($rootScope.user.globalusername);
                         }


                     });

            /// });



        }


    }
})();

