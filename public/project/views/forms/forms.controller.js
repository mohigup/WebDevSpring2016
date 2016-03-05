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
            $scope.forms = userAllForms;
        }


        function addForm(formName){
            if(formName != null) {
                var newForm = {"_id": null, "title": formName, "userId": null};
                FormService.createFormForUser($rootScope.user._id, newForm, renderAddForm);
            }
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            $scope.forms.push(newForm);
        }

        function selectForm(index){
            $scope.index = index;
            var selectedForm = $scope.forms[index];
            $scope.formName = selectedForm.title;
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id,renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            FormService.findAllFormsForUser($rootScope.user._id,renderUserForms);
        }

        function updateForm(formName){
            if($scope.index != -1 && formName != null)
            {
                var selectedForm = $scope.forms[$scope.index];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id,selectedForm,renderUpdateForm);
                $scope.index = -1;
                $scope.formName = null;
            }
        }

        function renderUpdateForm (newForm){
            FormService.findAllFormsForUser($rootScope.user._id,renderUserForms);
        }
    }
})();