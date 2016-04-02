(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController(UserService, $location) {
        // ADDING FOR SESSION

    /*    $scope.logoutUser = logoutUser;
        //$scope.isAdmin=isAdmin;
        //console.log("header"+$rootScope.user)
        // console.log("isAdmin"+$scope.isAdmin())

        console.log("outside logout user");
        function logoutUser() {
            $rootScope.user = null;
            //$rootScope.user.logged = false;
            //$rootScope.user.firstname = "";
            //$rootScope.user.lastname = "";

        }*/

        var vm = this;

        vm.logoutUser = logoutUser;

        function init(){
            vm.$location = $location;
        }
        init();

        function logoutUser(){
            console.log("calling logout user ")
            UserService
                .logout()
                .then(
                    function(response){
                        console.log("seeting user to null ")
                        UserService.setCurrentUser(null);
                        $location.url('/home');
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }

    }





})();