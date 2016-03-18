(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,  FormService, UserService) {

        $scope.index = -1;

        if($rootScope.user == null){
            $location.path("/home");
        }

        else{
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(renderUserForms);
        }


        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;

        function renderUserForms(userAllForms) {
            // might have to edit here
            //$scope.forms = userAllForms;;
            console.log("client controller for forms- receiving forms for current user");
            console.log(userAllForms.data);
            $scope.forms = userAllForms.data;
        }


        function addForm(formName){
            if(formName != null) {
                // add form is diff
               // var newForm = {"_id": null, "title": formName, "userId": null};
                var newForm = {

                    title: formName,
                    // _id: (new Date()).getTime(),
                };
                console.log("client controller for add form- receiving formname for current user");
                FormService.createFormForUser($rootScope.user._id, newForm)
                    .then(renderAddForm);
            }
        }

        function renderAddForm(newForm){
            $scope.formName = null;
            // might have to edit here
            $scope.forms.push(newForm.data);
        }

        function selectForm(index){
            $scope.index = index;
            var selectedForm = $scope.forms[index];
            $scope.formName = selectedForm.title;
        }

        function deleteForm(index){
            console.log("--------------------------------------------")
            console.log("Inside deleteForm Client Controller")
            console.log("Index found from UI IS")
            console.log($scope.forms[index]._id)
            FormService.deleteFormById($scope.forms[index]._id)
                .then(renderdeleteForm);
        }

        function renderdeleteForm(allforms){
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(renderUserForms);
        }

        function updateForm(formName){
            console.log("--------------------------------------------")
            console.log("Inside updateForm Client Controller")
            if($scope.index != -1 && formName != null)
            {
                var selectedForm = $scope.forms[$scope.index];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id,selectedForm)
                    .then(renderUpdateForm);
                $scope.index = -1;
                $scope.formName = null;
            }
        }

        function renderUpdateForm (newForm){
            // might have to edit here
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(renderUserForms);
        }
    }
})();