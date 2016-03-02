(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope) {
        'use strict';
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"], "email":"alice@skype.com"
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"], "email":""
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"], "email":""
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"], "email":""
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"],"email":""
            }
        ];


        var service =
        {
            getAllUsers: getAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            setCurrentUser: setCurrentUser,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return service;

        function getAllUsers() {
            var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };


            users.push(newUser);
            callback(newUser);
        }


        function findUserByCredentials(username, password, callback) {
            var usr;
            var success = null;
            for (usr in users) {
                if (users[usr].username == username && users[usr].password == password) {
                    success = users[usr];
                    console.log("found user index is " + usr)
                    break;
                }

            }

            callback(success);
        }

        function findUserById(userId) {
            for (var uid in users) {

                if (users[uid]._id == userId) {
                    return users[uid];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            var user = null;
            for (var uname in users) {

                if (users[uname].username == username) {
                    user = users[uname];
                    break;
                }
            }
            return user;
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date()).getTime(),
                username: user.username,
                password: user.password
            };

            users.push(newUser);
            callback(newUser);

        }

        function deleteUserById(userid, callback) {
            var index = userData.indexOf(findUserById(userId));
            if (index >= 0) {
                userData.splice(index, 1);
            }

            callback(userData);

        }

        function updateUser(userId, user, callback) {
            var i;
            for (i in users) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    callback(users[i]);
                    break;
                }
            }
        }

        function setCurrentUser (user) {
            $rootScope.user = user;
            $rootScope.user.logged = true;
        }

    }

})();