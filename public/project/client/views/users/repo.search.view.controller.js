(function () {
    angular
        .module("GitApp")
        .controller("RepoSearchHistoryController", RepoSearchHistoryController);

    function RepoSearchHistoryController( GitIntService,UserService) {

        console.log("Loaded RepoSearchHistoryController")
        var vm = this;


        function init() {

            var user = UserService.getCurrentUser();
            vm.sh = user.searchhistory.reverse();
            console.log(user.searchhistory);
            if(user.searchhistory == null || vm.sh.length <=0){
                //console.log(user.searchhistory.length)
                vm.message =" No Recent Git Repository Search History Found"
                vm.message2=" Search History is updated after Logout"
            }
            else{
                vm.message = "Recent Git Repository Search History"
                vm.message2 = "Current Git Repo is set to "+user.recent_reponame+" whose author is "+user.recent_repoowner
            }

        }

        init();
    }
})();