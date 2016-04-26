"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("UserProfileController", UserProfileController);

    function UserProfileController($scope, UserService, $location, $rootScope) {
        console.log("UserProfileController");
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
                    email: usr.email,
                    roles: usr.roles
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
            console.log("currently looged user updating form ")
            console.log(user)
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        console.log("user received from update service on profile controller.")
                        console.log(updatedUser);
                        if(updatedUser){
                            vm.message = "User Profile Updated";
                            UserService.setCurrentUser(updatedUser);
                        }else{
                            vm.message = "Unable to update the User Profile";
                        }
                    },
                    function(err){
                        console.log("API Failure");
                    }
                );

        }


    }
})();
