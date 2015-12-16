(function(){
    angular
        .module("YumMeApp", ["ngRoute", "ngCookies"])
        .controller('MainController', function ($rootScope, $cookies) {
           $rootScope.currentUser = $cookies.getObject('user');
        })
})();