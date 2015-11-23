(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "./views/register/register.view.html"
                })
                .when("/login", {
                    templateUrl: "./views/login/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "./views/profile/profile.view.html"
                })
                .when("/form", {
                    templateUrl: "./views/form/form.view.html"
                })
                .when("/user/:userId/form/:formId/fields", {
                    templateUrl: "./views/field/field.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });

    }
})();