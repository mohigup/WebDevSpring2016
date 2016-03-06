(function(){

    "use strict";

    angular
        .module("GitApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,  FormService, UserService) {

        $scope.index = -1;

        if($rootScope.user == null){
            $location.path("/home");
        }

        else{
            FormService.findAllFormsForUser($rootScope.user._id,renderUserForms);
        }


        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        function renderUserForms(userAllForms) {
            $scope.issues = userAllForms;
            console.log("render user forms ");
            console.log($scope.issues);
        }


        function addForm(issue){
            console.log("Add form Init");
            if(issue != null) {
                console.log("issue is not null")
                var newForm = {
                    "u_id": $rootScope.user._id,
                    "status": issue.status,
                    "title": issue.title,
                    "desc": issue.desc,
                    "Reported_On": issue.Reported_On,
                    "email_id":issue.email_id};
                console.log("newForm to be added");
                console.log(newForm);

                    FormService.createFormForUser($rootScope.user._id, newForm, renderAddForm);
            }
        }

        function renderAddForm(issue){
            $scope.issue = null;
            console.log("render add forms")
            $scope.issues.push(issue);
        }

        function selectForm(index){
            $scope.index = index;
            var selectedForm = $scope.issues[index];
            $scope.issue = selectedForm;
        }

        function deleteForm(index){
            console.log("delete forms controller")
            FormService.deleteFormById($scope.issues[index].u_id,renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            FormService.findAllFormsForUser($rootScope.user.u_id,renderUserForms);
        }

        function updateForm(issue){
            if($scope.index != -1 && issue != null)
            {
                var selectedForm = $scope.issues[$scope.index];
               // selectedForm.title = formName;
                selectedForm.status = issue.status;
                selectedForm.title = issue.title;
                selectedForm.desc = issue.desc;
                selectedForm.date = issue.date;
                selectedForm.email_id = issue.email_id;
                selectedForm.Reported_On = issue.Reported_On;
                FormService.updateFormById(selectedForm.u_id,selectedForm,renderUpdateForm);
                $scope.index = -1;
                $scope.issue = null;
            }
        }

        function renderUpdateForm (newForm){
            FormService.findAllFormsForUser($rootScope.user._id,renderUserForms);
        }
    }
})();