(function () {
    angular
        .module("GitApp")
        .controller("HomeController", HomeController)

    function HomeController($location, UserService) {

      /*  var h1 = "Search Repo and View Commits"
        var tobj = {
            strings: h1,
            contentType: 'text',
            typeSpeed: -30
        }
        var t = '.element'

        console.log("start")
        //setTimeout( function(){
            $(t).typed(tobj);
        //},1000)
        console.log("end")*/
        var vm = this;
        if(UserService.getCurrentUser()){

            vm.href ="#/signedinlearn"
        }
        else vm.href ="#/learn"

    }


})();