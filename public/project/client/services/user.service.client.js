(function () {
    'use strict';
    angular
        .module("GitApp")
        .factory("UserService", UserService);


    function UserService($http,$rootScope) {/*var mapObj = {
                    USERNAME:user.owner,
                    REPONAME:user.reponame,
                    PGN:c
                };
                var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
                SHA_URL = SHA_URL.replace(re, function(matched){
                    return mapObj[matched];
                });
                $http.get(ALLCOMMITS_URL).success(function (data) {

                });*/
        'use strict';


        var service =
        {

            findUserByCredentials: findUserByCredentials,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            setCurrentGitUser: setCurrentGitUser,
            getCurrentGitUser: getCurrentGitUser,
            updateThisUser: updateThisUser,
            logout: logout

        };

        return service;



        function findUserByCredentials(username, password) {
            var usr;

            console.log("calling login on client- Inside client services");
            console.log(username)
            console.log(password)
            return $http.get(
                '/api/admin/user',
                {
                    params: {
                        'username': username, 'password': password
                    }
                });
        }







        function updateThisUser(userId, user) {
            console.log("calling update on client- Inside client services");
            return $http({
                method: 'PUT',
                url: '/api/admin/user/' + userId,
                data: user
            });
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
            if (user ==null){
              //  $rootScope.user.logged = false;
            }
            else $rootScope.user.logged = true;

        }

        function getCurrentUser() {
            return $rootScope.user;
        }

        function setCurrentGitUser(user){
            $rootScope.CurrentGitUser = user;
        }

        function getCurrentGitUser(){
        return $rootScope.CurrentGitUser;
        }


        function logout(){

            console.log("inside client side logot service")
            return $http.post("/api/admin/logout");
        }
    }

})();