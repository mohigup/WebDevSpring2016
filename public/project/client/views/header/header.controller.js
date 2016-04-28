(function () {
    angular
        .module("GitApp")
        .controller("HeaderController", HeaderController)

    function HeaderController($location, UserService) {

        var vm = this;
        vm.logoutUser = logoutUser;

        function init() {
            console.log("header controller INIT")
            vm.$location = $location;
        }

        init();

        function logoutUser() {

            var flag = false;
            var user = UserService.getCurrentUser();
            console.log(user.recent_reponame);
            vm.sh = user.searchhistory;
            console.log("sadsaf")
            console.log(vm.sh)

            if(user.searchhistory==null){

                UserService
                    .logout()
                    .then(
                        function (response) {
                            console.log("------------------logged out called sh =null-----------")
                            console.log(response)
                            UserService.setCurrentUser(null);
                            $location.url('/home');
                        },
                        function (err) {
                            console.log("Failure");
                        }
                    );
            }

            else {
            if (user.searchhistory.length > 0) {
                for (var v in user.searchhistory) {
                    if (user.recent_reponame == user.searchhistory[v][0].repo && user.recent_repoowner == user.searchhistory[v][0].owner) {
                        flag = true;
                        break;
                    }
                }
            }
            if(user.searchhistory.length <= 0) flag =true;
            if(user.searchhistory.length <= 0 && user.recent_reponame && user.recent_repoowner) flag =false;
            console.log("flag is"+flag)

            if (flag) {
                UserService
                    .logout()
                    .then(
                        function (response) {
                            console.log("------------------logged out called -----------")
                            console.log(response)
                            UserService.setCurrentUser(null);
                            $location.url('/home');
                        },
                        function (err) {
                            console.log("Failure");
                        }
                    );
            }
            else {


                UserService
                    .addUserSearchById(user._id, user)
                    .then(
                        function (response) {
                            var addedUser = response.data;
                            console.log("added last search")
                            console.log(addedUser);
                            if (addedUser) {

                                UserService.setCurrentUser(addedUser);
                                UserService
                                    .logout()
                                    .then(
                                        function (response) {
                                            console.log("------------------logged out called after update -----------")
                                            console.log(response)
                                            UserService.setCurrentUser(null);
                                            $location.url('/home');
                                        },
                                        function (err) {
                                            console.log("Failure");
                                        }
                                    );
                            } else {
                                console.log("error adding")
                            }
                        }
                    );

            }}
        }


    }


})();