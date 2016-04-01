"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("SlidesController", SlidesController)

    function SlidesController($rootScope, $scope, $routeParams, $location, GitIntService) {

        var vm = this;


        function init() {




            console.log("Inside SlidesController");
            var sha = $routeParams.sha;
            console.log("sha" + sha);
            if (sha) {
                console.log("Inside SlidesController INIT");
                fetchCommits(sha); }
            }

            init();


            function fetchCommits(sha) {
                console.log("fetch sha");
                GitIntService
                    .findCommitsBySHA(sha)
                    .then(function (response) {


                        console.log("response returned");
                        //GitIntService.findRepo(response.repos_url,renderRepo)
                        vm.data = response.data.files[0].patch;
                        //$scope.data = $scope.data.toString()
                        console.log(vm.data)
                        //var anihere = $("#SB2 #SB2112")
                        //console.log(anihere)
                        //var a=$('.row').filter('.panel-default').find('.panel-body')

//                        var strings = [vm.data.replace(/\n/g,"<br/>")];//.split("\n");//.splice(1, 0, "");
                        var strings = [vm.data];//.split("\n");//.splice(1, 0, "");
//                        strings.unshift("");

                        console.log("calling typed")

                        setTimeout(function() {
                            $('.element').typed({

                                strings: strings,//["", "Here you go!"],
                                contentType: 'text',
                                typeSpeed: 0
                            });
                        }, 2000);
                       /* $(function(){
                            $("#typed").typed({
                                strings: vm.data.split("\n"),
                                contentType:'text'
//                                stringsElement: $('#typed-strings')
                            });
                        });*/

                        console.log("ending typed")
                        //localStorage.setItem('c', $scope.data)
                    });
            }

            function renderCommits(response) {



            }

            ////////////////////////////////////////////////////////////

        }

})();