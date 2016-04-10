(function(){

    "use strict";

    angular
        .module("GitApp")
        .controller("ContactController", ContactController);

    function ContactController( $location,FormService) {



        var vm = this;
        function init(){

        }
        init()




        vm.selectedIssue= null;
        vm.issue = null;
        vm.addIssue = addIssue;
        vm.renderUserForms = renderUserForms;



        function renderUserForms(userAllForms) {
            vm.issues = userAllForms;
            vm.issue = null;
            vm.selectedIssue = false;
            console.log("render user forms ");
            console.log(vm.issues);
        }


        function addIssue(issue){
            console.log("Add form Init");
            if(issue != null) {
                console.log("issue is not null")
                var newForm = {
                    "status": "New",
                    "title": issue.title,
                    "desc": issue.desc,
                    "email":issue.email};
                console.log("newForm to be added");
                console.log(newForm);

                FormService.createFormForUser(newForm)
                    .then(function(response){
                        vm.issue = null;

                            if(response){
                                vm.message = "Message Sent To GitAnalysis Team. We will get back you in 3 Business Days";

                            }else{
                                vm.message = "Unable to Sent Message because of Server Issues. Please try after some-time";
                            }
                        },
                        function(err){
                            console.log("API Failure");
                        }
                    );
            }
        }



    }
})();