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
                console.log(user.searchhistory.length)
                vm.message =" No Recent Git Repositry Search history Found"
            }
            else{
                vm.message = "Recent Git Repository Search History"
                vm.message2 = "Current Git Repo is set to "+user.searchhistory[0][0].repo+" whose author is "+user.searchhistory[0][0].owner
            }

        }

        init();
    }
})();