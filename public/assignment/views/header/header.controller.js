(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController ($scope , $location,$rootScope)
    {
        console.log()
        $scope.logoutUser = logoutUser;
        //$scope.isAdmin=isAdmin;
        //console.log("header"+$rootScope.user)
       // console.log("isAdmin"+$scope.isAdmin())

        console.log("outside logoutsuer");
        function logoutUser()
        {
            //$rootScope.user = null;
            $rootScope.user.logged = false;
            $rootScope.user.firstname = "";
            $rootScope.user.lastname = "";

        }



    }


})();