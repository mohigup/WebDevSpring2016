
"use strict";
(function (){

    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService ($http){

        var api = {

            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById
        };
        return api;


        function findAllUsers(){
            return $http.get("/api/assignment/admin/user/");
        }

        function createUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/"+userId);
        }


        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/"+userId);
        }
    }
})();