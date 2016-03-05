(function () {
    angular
        .module("GitApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
        $scope.hello = "Main Controller";
        console.log("MainController");


    }

})();