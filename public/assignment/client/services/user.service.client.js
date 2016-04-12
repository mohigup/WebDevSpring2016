(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http,$rootScope) {
        'use strict';


        var service =
        {
            getAllUsers: getAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            // ADDING FOR SESSION
            logout: logout,
            getLoggedUser: getLoggedUser

        };

        return service;

        function getAllUsers() {
          /*  var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };


            users.push(newUser);
            callback(newUser);*/
            return $http.get('/api/assignment/user');
        }


        function findUserByCredentials(username, password) {
          /*  var usr;
            var success = null;
            for (usr in users) {
                if (users[usr].username == username && users[usr].password == password) {
                    success = users[usr];
                    console.log("found user index is " + usr)
                    break;
                }

            }

            callback(success);*/
            console.log("calling login on client- Inside client services");
            console.log(username)
            console.log(password)
            return $http.get(
                '/api/assignment/login',
                {
                    params: {
                        'username': username, 'password': password
                    }
                });
        }

        function findUserById(userId) {
            /*for (var uid in users) {

                if (users[uid]._id == userId) {
                    return users[uid];
                }
            }
            return null;*/

            return $http.get('/api/assignment/user/' + userId);
        }

        function findUserByUsername(username) {
          /*  var user = null;
            for (var uname in users) {

                if (users[uname].username == username) {
                    user = users[uname];
                    break;
                }
            }
            return user;*/
            console.log("client services -calling findUserByUsername")
            console.log(username)
            return $http({
                method: 'GET',
                url: '/api/assignment/user/username',
                params: {
                    'username': username
                }
            });


        }

        function createUser(user) {
            /*var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };

            users.push(newUser);
            callback(newUser);*/
            console.log("client services -calling createUser")
            console.log(user)
            return $http({
                method: 'POST',
                url: '/api/assignment/user',
                data: user
            });

        }

        function deleteUserById(userid) {
          /*  var index = userData.indexOf(findUserById(userId));
            if (index >= 0) {
                userData.splice(index, 1);
            }

            callback(userData);*/
            return $http.delete('/api/assignment/user/' + userid);
        }

        function updateUser(userId, user) {
          /*  var i;
            for (i in users) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    callback(users[i]);
                    break;
                }
            }*/
            console.log("calling update on client- Inside client services");
            return $http({
                method: 'PUT',
                url: '/api/assignment/user/' + userId,
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

        // ADDING FOR SESSION
        function getLoggedUser(){
            console.log("getLoggedUser")
            return $http.get("/api/assignment/user/loggedin");
        }

        function logout(){
            return $http.post("/api/assignment/user/logout");
        }


    }

})();