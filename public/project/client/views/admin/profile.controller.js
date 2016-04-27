"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        console.log("ProfileController");
        // var model = this;

        var vm = this;

        function init(){
            var usr = UserService.getCurrentUser();
            console.log("profile user")
            console.log(usr)
            if(usr) {
                vm.currentUser = {
                    _id: usr._id,
                    username: usr.username,
                    firstName: usr.firstName,
                    lastName: usr.lastName,
                    password: usr.password,
                    email: usr.email
                };
            }else{
                $location.url("/home");
            }
        }
        init();

        vm.update = update;


        function update(user) {

            if(!vm.changePassword){
                delete user.password;
            }
            console.log("inside update");

            console.log("calling update service");
            UserService
                .updateThisUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        console.log("user received from update service on profile controller.")
                        console.log(updatedUser);
                        if(updatedUser){
                            vm.message = "User updated successfully";
                            UserService.setCurrentUser(updatedUser);
                        }else{
                            vm.message = "Unable to update the user";
                        }
                    },
                    function(err){
                        console.log("API Failure");
                    }
                );

        }


    }
})();
