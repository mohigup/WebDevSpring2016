(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController)

    function SidebarController ($scope, $location) {
            console.log("siderbar");
           /// console.log("logout use statusr sidebar "+$rootScope.user.logged);
    }

})();