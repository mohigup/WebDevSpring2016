(function () {
    'use strict';
    angular
        .module("GitApp")
        .factory("UserService", UserService);


    function UserService($http,$rootScope) {
        var service =
        {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            setCurrentGitUser: setCurrentGitUser,
            getCurrentGitUser: getCurrentGitUser,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateThisUser: updateThisUser,
            addUserSearchById:addUserSearchById,
            // ADDING FOR SESSION
            getLoggedinUser:getLoggedinUser,
            logout: logout

        };

        return service;

        function createUser(user) {
            console.log("client services -calling createUser")
            console.log(user)
            return $http.post("/api/admin/register", user);
        }

        function findUserById(userId) {
            return $http.get('/api/admin/user/' + userId);
        }
        function findUserByUsername(username) {
            console.log("client services -calling findUserByUsername")
            console.log(username)
            return $http({
                method: 'GET',
                url: '/api/admin/user/username',
                params: {
                    'username': username
                }
            });
        }
        function findUserByCredentials(userdata) {
            var usr;
            console.log("calling login on client- Inside client services");
            console.log(userdata.username)
            console.log(userdata.password)
            return $http.post("/api/admin/login", userdata);
           /* return $http.get(
                '/api/admin/login',
                {
                    params: {
                        'username': username, 'password': password
                    }
                });*/
        }

        function updateThisUser(userId, user) {
            console.log("calling update on client- Inside client services");
            return $http({
                method: 'PUT',
                url: '/api/admin/user/' + userId,
                data: user
            });
        }

        function addUserSearchById(userId, user) {
            console.log("calling addUserSearchById on client- Inside client services");
            return $http({
                method: 'PUT',
                url: '/api/admin/add/' + userId,
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

            console.log("inside client side logout service")
            return $http.post("/api/admin/logout");
        }

        function getLoggedinUser(){
            return $http.get("/api/admin/loggedin");
        }
    }

})();