(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope)
    {
        console.log("ProfileController");
        var model = this;
        model.update = update;

        model.user = {userid: "",username:"" ,userid:"" , password:"",email:"", lastname:"",firstname:""};

        var userid = $rootScope.user.userid;
        model.user.username = $rootScope.user.username;
        model.user.email = $rootScope.user.email;
        model.user.firstname = $rootScope.user.firstname;
        model.user.password = $rootScope.user.password;
        model.user.lastname = $rootScope.user.lastname;

        function update()
        {


        }
    };
})();