(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope) {
        'use strict';
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];


        //var i;
        //$rootScope.user = { userid:"", username: "", password: "" , email : "", firstname : "" , lastname :"" };
        var service =
        {
            getAllUsers: getAllUsers ,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return service;

        function getAllUsers()
        {

        }

        function findAllUsers(cb_fn)
        {
            return(null);

        }

        function findUserByCredentials(username , password , callback )
        {
            var usr;
            var success = null;
            for(usr in users){
                if(users[usr].username==username && users[usr].password==password)
                {
                    success = users[usr];
                    console.log("found user index is "+usr)
                    break;
                }

            }

            callback(success);
        }

        function createUser(user)
        {

        }

        function deleteUserById (userid,ca_fn)
        {

        }

        function updateUser(userId, user, callback) {
            var i;
            for(i in users){
                if(users[i]._id==userId){
                    users[i]=user;
                    callback(users[i]);
                    break;
                }
            }
        }

    }

})();