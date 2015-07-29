myApp.controller("UserCtrl",["$scope", "$rootScope", "$location", "GamerService","Gamer","GameAccount",function($scope, $rootScope, $location, GamerService,Gamer,GameAccount){

    //process login
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
                $rootScope.tmp_gamer = gamer;
                var params = {
                    iduser : gamer.id
                };
                var request_result = GamerService.getGameAccounts(params);
                request_result.then(function(response){
                    if(response.listAcc !== undefined){
                        var accounts = GameAccount.loadAll(response.listAcc);
                        $rootScope.list_accounts = accounts;
                        $location.path("/user/choice_account");
                    }
                });

            }else{
                alert(response.message)
            }
        });
    };

    //process register
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
                $rootScope.list_accounts = [];
                $location.path("/user/profile");
            }else{
                alert(response.message);
            }
        });
    };

    $scope.goLogin = function(){
        $scope.gamer = null;
        $scope.list_accounts = null;
        $location.path("/user/login");
    };

}]);
