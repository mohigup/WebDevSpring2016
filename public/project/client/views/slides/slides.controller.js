"use strict";
(function () {
    angular
        .module("GitApp")
        .controller("SlidesController", SlidesController)

    function SlidesController($rootScope, $scope, $routeParams, $location, GitIntService,UserService) {

        var vm = this;
        vm.page =0;
        var count = 0;
        var slides = [];
        var response;
        vm.loadData = loadData;
        function init() {




            console.log("Inside SlidesController");
            var sha = $routeParams.sha;
            console.log("sha" + sha);
            if (sha) {
                vm.sha = sha;
                console.log("Inside SlidesController INIT");
                fetchCommits(sha);
                //vm.showloader = false;
            }
            }

            init();


            function fetchCommits(sha) {
                console.log("fetch sha");
                var setsha = sha;
                console.log("sha set is "+setsha)
                console.log(count)
                response = GitIntService
                    .findCommitsBySHA(setsha,UserService.getCurrentGitUser());

                setTimeout(print, 3000)
                //$scope.$apply();


                  //  .then(function (response) {
/*
                        while (count<3  ){
                            console.log("response returned");
                            console.log(response.data)
                            var obj ={
                                content: response.data.files[0].patch,
                                filename: response.data.files[0].filename
                            }
                            slides.push(obj);
                            count = count +1;
                            console.log('parent sha is')
                            console.log(response.data.parents[0].sha)
                            var newsha = response.data.parents[0].sha
                            fetchCommits(newsha)
                        }*/

                          /*  console.log("slides")
                            console.log(response);
//                            renderCommits(slides);

                        vm.data = response;*/
                       // vm.data = response.data;
                        /*console.log("vm.data set correctly is");
                        console.log(vm.data.files[0].patch)

                        var strings = [vm.data.files[0].patch];

                        console.log("calling typed")

                        setTimeout(function() {
                            $('.element').typed({

                                strings: strings,//["", "Here you go!"],
                                contentType: 'text',
                                typeSpeed: 30
                            });
                        }, 2000);

                        console.log("ending typed")*/

                    //});
            }

        function print(){
            vm.showloader = true;
            console.log("print func ")
            console.log(response);
//                            renderCommits(slides);
            response.reverse();
            vm.data = response[vm.page];
            console.log("vm.data");
            var commit = vm.data;
            var strings = [commit[0].content];
            console.log(strings)
            console.log("calling typed")

            //console.log($(".element").text(''));
            //console.log($("#SB2112").html(""));
            var tobj = {
                strings: strings,
                contentType: 'text',
                typeSpeed: -30
            }
            setTimeout( function(){
                $('.element').typed(tobj);
            }, 2000);
          /*  setTimeout(function(){

                $('.element').typed();
            }, 2000);*/

               /* $('pre code').each(function (i, block) {
                    console.log("calling higlisht")
                    hljs.highlightBlock(block);
                });*/


            console.log("ending typed");
            $scope.$apply();
        }

        function loadData(page){

            console.log("next-------------- button")
            vm.data = response[page];
            console.log("vm.data 2");
            console.log(vm.data);
            var commit = vm.data;
            var strings = [commit[0].content];
            console.log(strings)
            console.log("calling typed 2")
            console.log(  $(".element").text())
            /*------------------------------------------*/
            var options = {
                strings: strings,
                contentType: 'text',
                typeSpeed: -30,
                };
            $(".element").text('');
            $("#SB2112").html("");
            $("#SB2112").append(' <span class="element" style="white-space:pre"></span>');
            $(".element").typed(options);
            /*------------------------------------------*/


            console.log("ending typed 2")
            vm.page = page ;
            console.log("new page no is "+vm.page)

        }






        }

})();