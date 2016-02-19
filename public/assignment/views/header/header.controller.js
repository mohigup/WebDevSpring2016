(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController ($scope , $location,$rootScope)
    {
        $scope.eraseUser = eraseUser;
        console.log($rootScope.user)
        //if ($rootScope.user == null)
        //{
        //    $scope.username = "user name";
        //}
        //else
        //{
        //    $scope.username = "test";
        //}

        function eraseUser()
        {
            //$rootScope.user = null;
            $rootScope.user.logged = false;
            $rootScope.user.firstname = "";
            $rootScope.user.lastname = "";

        }

    }


})();