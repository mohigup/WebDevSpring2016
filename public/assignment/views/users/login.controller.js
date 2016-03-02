"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, UserService, $location, $rootScope)
    {
        console.log("inside LoginController");
        $scope.login = login;
        console.log("calling login");
        function login(uname, pass)
        {
            var user;
            UserService.findUserByCredentials(uname, pass,function(response){

                user = response;
                console.log("respons is"+response);
                console.log("user is "+user);
                var status=false;
                if(user == null)
                {
                    alert("no such user");
                }
                else
                {   console.log("user roles"+user.roles);

                    for (var i in user.roles) {
                        if (user.roles[i] == "admin") {
                            status = true;
                            break;
                        }

                    }
                    UserService.setCurrentUser(user);
                    $rootScope.isAdmin = status;
                    console.log("$rootScope.user.isAdmin"+$rootScope.isAdmin);
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
