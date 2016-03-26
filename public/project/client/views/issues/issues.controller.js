(function(){

    "use strict";

    angular
        .module("GitApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,  FormService, UserService) {



        var vm = this;
        function init(){


        }
        init()

        if(UserService.getCurrentUser() == null){
            $location.path("/home");
        }

        else{
            FormService
                .findAllForms()
                .then(function(response){
                    console.log(response.data)
                    renderUserForms(response.data)
                });
        }


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
                    "u_id": (new Date).getTime(),
                    "status": issue.status,
                    "title": issue.title,
                    "desc": issue.desc,
                    "Reported_On": issue.Reported_On,
                    "email_id":issue.email_id};
                console.log("newForm to be added");
                console.log(newForm);

                    FormService.createFormForUser(newForm)
                                .then(function(response){
                                    renderAddForm(response.data)
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
                u_id: issue.u_id,
                title : issue.title,
                status : issue.status,
                desc : issue.desc,
                email_id : issue.email_id,
                Reported_On : issue.Reported_On
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
                .deleteFormById(issue.u_id)
                .then(function(response) {
                    renderUserForms(response.data);
                });
        }


        function updateForm(issue){
            console.log("inside update form client controller")

                var updatedIssue = {
                    u_id: issue.u_id,
                    title : issue.title,
                    status : issue.status,
                    desc : issue.desc,
                    email_id : issue.email_id,
                    Reported_On : issue.Reported_On
                };
            console.log("form to be updaed is ");
            console.log(issue);
            console.log(issue.u_id);
                FormService.updateFormById(issue.u_id,updatedIssue)
                    .then(function(response) {
                        renderUserForms(response.data);
                    });
                vm.index = -1;

        }


    }
})();