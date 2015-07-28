myApp.controller("UserCtrl",["$scope", "$rootScope", "$location", "GamerService","Gamer",function($scope, $rootScope, $location, GamerService,Gamer){
    $scope.doLogin = function(){
        var user ={
            username:$scope.login.username,
            password:$scope.login.password
        };
        var result = GamerService.login(user);
        result.then(function(response){
            if(response.status ==0 ){
                var gamer = Gamer.build();
                gamer.load(response['9chau_acc']);
                //redirect to user profile
                $rootScope.gamer = gamer;
                $location.path("/user/profile");
            }else{
                alert(response.message)
            }
        });
    };

    $scope.doRegister = function(){
        var user = {
            username    :$scope.signup.username,
            password    :$scope.signup.password,
            confirm     :$scope.signup.rePassword
        };

        var result = GamerService.register(user);
        result.then(function(response){
            if(response.status ==0){
                var gamer = Gamer.build();
                gamer.load(response['9chau_acc']);
                //redirect to user profile
                $rootScope.gamer = gamer;
                $location.path("/user/profile");
            }else{
                alert(response.message);
            }
        });
    };

}]);
