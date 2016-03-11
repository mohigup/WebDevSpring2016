(function () {
    angular
        .module("GitApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
        $scope.hello = "Main Controller";
        console.log("MainController is loaded with current location"+$location.url());
      /*  if($location.url() =="/home") {

            $rootScope.showSideBar = false;
            console.log("variable set "+$rootScope.showSideBar);
        }
        else $rootScope.showSideBar = true;*/

    }

})();