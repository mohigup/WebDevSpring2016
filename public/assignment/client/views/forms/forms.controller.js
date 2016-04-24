(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,  FormService, UserService) {

        var vm = this;
        function init(){

            if(UserService.getCurrentUser() == null){
                $location.path("/home");
            }

            else{
                vm.usr = UserService.getCurrentUser();
                console.log("current user is ")
                console.log(vm.usr)

                FormService
                    .findAllFormsForUser(vm.usr._id)
                    .then(function(response){
                        console.log(response.data)
                        renderUserForms(response.data)
                        vm.$location =$location
                    });
            }
        }
        init()



        vm.selectedForm= null;
        vm.addForm = addForm;
        vm.renderAddForm = renderAddForm;
        vm.renderUserForms = renderUserForms;
        vm.selectForm = selectForm;
        vm.unselectForm = unselectForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;


        function renderUserForms(userAllForms) {
            // might have to edit here
            //$scope.forms = userAllForms;;
            console.log("client controller for forms- receiving forms for current user");
            vm.forms = userAllForms;
            vm.form = null;
            vm.selectedForm = false;
            console.log("renderUserForms  ");
            console.log(vm.forms);
        }


        function addForm(formName){
            if(formName != null) {
                var newForm = {

                    title: formName.title,
                    // _id: (new Date()).getTime()

                };
            }
            else {
                // add form is diff
                // var newForm = {"_id": null, "title":
                // formName, "userId": null};
                var newForm = {
                    title: "New Form"
                    ,
                    // _id: (new Date()).getTime()

                };
            }
                console.log("client controller for add form- receiving formname for current user");
                console.log(vm.usr)
                FormService.createFormForUser(vm.usr._id, newForm)
                    .then(function(response){
                        init();//renderAddForm(response.data)
                    });

        }

        function renderAddForm(newForm){
            vm.forms = newForm;
            console.log("renderING USER  forms ");
            console.log(vm.forms);
            vm.form = null;
            vm.selectedForm = false;

        }

        function selectForm(form){
            vm.form = {
                _id: form._id,
                title: form.title
            };
            vm.selectedForm = true;
        }

        function unselectForm(){
            vm.form = null;
            vm.selectedForm = null;
        }

        function deleteForm(form){
            console.log("--------------------------------------------")
            console.log("Inside deleteForm Client Controller")
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    if(response.data)
                        init();//renderUserForms(response.data);
                });
        }


        function updateForm(form){
            console.log("--------------------------------------------")
            console.log("Inside updateForm Client Controller")
            var updatedForm = {
                title: form.title
            };

            FormService
                .updateFormById(form._id, updatedForm)
                .then(
                    function (response) {
                        init();
                    },
                    function(err){
                        console.log("Error updating form");
                    }
                );
        }

    }
})();