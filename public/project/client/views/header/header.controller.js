(function () {
    angular
        .module("GitApp")
        .controller("HeaderController", HeaderController)

    function HeaderController($location, UserService) {

        var vm = this;
        vm.logoutUser = logoutUser;

        function init(){
            console.log("header controller INIT")
            vm.$location = $location;
        }
        init();

        function logoutUser(){

            UserService
                .logout()
                .then(
                    function(response){
                        console.log("------------------logged out called -----------")
                        console.log(response)
                        UserService.setCurrentUser(null);
                        $location.url('/home');
                    },
                    function(err){
                        console.log("Failure");
                    }
                );
        }


    }


})();