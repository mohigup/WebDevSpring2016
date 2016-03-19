"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, UserService, $location, $rootScope) {
        console.log("inside LoginController");
        $scope.login = login;
        console.log("calling login on client");
        function login(uname, pass) {
            var user;
            console.log("calling login on client- calling client services");
            UserService.findUserByCredentials(uname, pass)
                .then (function(response){

                user = response.data;
                console.log(user);
                //console.log("user is " + JSON.parse(user));
                var status = false;
                if (user == null) {

                    alert("no such user");
                }
                else {
                    console.log("user roles" + user.roles);

                    for (var i in user.roles) {
                        if (user.roles[i] == "admin") {
                            status = true;
                            break;
                        }

                    }
                    UserService.setCurrentUser(user);
                    $rootScope.isAdmin = status;
                    console.log("$rootScope.user.isAdmin" + $rootScope.isAdmin);
                    //$rootScope.user = user;
                    //$rootScope.user.logged = true;
                    //user.logged = true;
                    //$rootScope.user.globalusername = user.username;
                    $location.url('/profile');

                }
            });


        }


    }
})();
