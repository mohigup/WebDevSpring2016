(function(){

    "use strict";

    angular
        .module("GitApp")
        .controller("IssueController", IssueController);

    function IssueController($scope, $location, $rootScope,  FormService, UserService) {



        var vm = this;
        function init(){

            if(UserService.getCurrentUser() == null){
                $location.path("/home");
            }

            else{
                FormService
                    .findAllForms()
                    .then(function(response){
                        console.log(response)
                        console.log(response.data)
                        renderUserForms(response.data)
                        vm.$location = $location
                    });
            }
        }
        init()




        vm.selectedIssue= null;
        vm.addForm = addForm;
        vm.renderAddForm = renderAddForm;
        vm.renderUserForms = renderUserForms;
        vm.selectForm = selectForm;
        vm.unselectIssue = unselectIssue;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;



        function renderUserForms(userAllForms) {
            vm.issues = userAllForms;
            vm.issue = null;
            vm.selectedIssue = false;
            console.log("render user forms ");
            console.log(vm.issues);
        }


        function addForm(issue){
            console.log("Add form Init");
            if(issue != null) {
                console.log("issue is not null")
                var newForm = {
                    "status": issue.status,
                    "title": issue.title,
                    "desc": issue.desc,
                    "email":issue.email};
                console.log("newForm to be added");
                console.log(newForm);

                    FormService.createFormForUser(newForm)
                                .then(function(response){
                                    init();///renderAddForm(response.data)
                                });
            }
        }

        function renderAddForm(userAllForms){
            vm.issues = userAllForms;
            vm.issue = null;
            vm.selectedIssue = false;
            console.log("render user forms ");
            console.log(vm.issues);
        }

        function selectForm(issue){

            vm.issue = {
                _id: issue._id,
                title : issue.title,
                status : issue.status,
                desc : issue.desc,
                email : issue.email,
                created : issue.created
            };
            vm.selectedIssue = true;
        }

        function unselectIssue(issue){
            vm.issue = null;
            vm.selectedIssue = null;
        }

        function deleteForm(issue){
            console.log("delete forms controller")
            FormService
                .deleteFormById(issue._id)
                .then(function(response) {
                    init();//renderUserForms(response.data);
                });
        }


        function updateForm(issue){
            console.log("inside update form client controller")

                var updatedIssue = {
                    title : issue.title,
                    status : issue.status,
                    desc : issue.desc,
                    email : issue.email,
                    created : issue.created
                };
            console.log("form to be updaed is ");
            console.log(issue);
            console.log(issue._id);
                FormService.updateFormById(issue._id,updatedIssue)
                    .then(
                        function (response) {
                            init();
                        },
                        function(err){
                            console.log("Error updating isssue");
                        }
                    );
                vm.index = -1;

        }


    }
})();