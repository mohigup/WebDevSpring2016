"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $location,$rootScope) {
        console.log("siderbar called");
        console.log("sidebar rootescope"+$rootScope.repo_url);
        /// console.log("logout use statusr sidebar "+$rootScope.user.logged);
    }

})();