"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $location) {
        console.log("siderbar");
        /// console.log("logout use statusr sidebar "+$rootScope.user.logged);
    }

})();