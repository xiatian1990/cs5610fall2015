(function(){
    angular
        .module("YumMeApp")
        .controller("ChatController", ChatController);

    function ChatController($scope, $rootScope, $location, UserService){
        $scope.$location = $location;
        UserService.findAllUsers().then(function (users) {
            $scope.userList = users;
        })

        $scope.messages = [{
            message: "Welcome to chat room!",
            user: $rootScope.currentUser.username
        }];

        var socket;

        if ($location.host.indexOf('127.0.0.1') !== -1 ||
             $location.host.indexOf('localhost') !== -1) {
            socket = io.connect('http://localhost:3000')
        } else {
            socket = io.connect('ws://cs5610-xiatian.rhcloud.com:8000')
        }

        socket.on('message', function (data) {
            $scope.$apply(function () {
                $scope.messages.unshift(data);
            });
        });

        $scope.sendMessage = function () {
            var data = {
                message: $scope.message,
                user: $rootScope.currentUser.username
            };
            socket.emit('message', data);
            $scope.messages.unshift(data);

            $scope.message = '';
        }

        $scope.keyPress = function (evt) {
            if (evt.which === 13) {
                $scope.sendMessage()

            }
        }
    }
})();