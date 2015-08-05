myApp.controller("UserCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){


	$a = localStorageService.get('gamer');
	if(localStorageService.get('gamer') !== null){
		$location.path("/user/profile");
	}
	 
    //process login
    $scope.doLogin = function(){
		
		//$scope.loginusername = 'zzzz';
		//$scope.loginpassword = 'aaa';
		
		if($scope.login_username == undefined ||  $scope.login_password == undefined){
			alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
			return false;
		}
        var user ={
            username:$scope.login_username,
            password:$scope.login_password
        };
        var result = GamerService.login(user);
        result.then(function(response){
            if(response.status ==0 ){
                var gamer = Gamer.build();
                gamer.load(response['9chau_acc']);
				
				//lưu dữ liệu
				localStorageService.set('gamer', gamer);
				
                //redirect to user profile
                //$rootScope.tmp_gamer = gamer;
				$location.path("/user/choice_account");

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
                $rootScope.tmp_gamer = gamer;
                $rootScope.list_accounts = [];
                $location.path("/user/choice_account");
            }else{
                alert(response.message);
            }
        });
    };


    $scope.loginGame = function(){
        var account = undefined;
        for(key in $rootScope.list_accounts){
            if($rootScope.list_accounts[key].username == $scope.selectd_account){
                account = $rootScope.list_accounts[key];
            }
        }
        if(account!==undefined){
            var params = {
                iduser : $rootScope.tmp_gamer.id,
                username : $scope.selectd_account
            };
            var result = GamerService.loginGame(params)
            result.then(function(response){
                if(response.status==0){
                    $rootScope.gamer = $rootScope.tmp_gamer;
                    $rootScope.gamer_account = account;
                    //fire LoginSuccess event
                    EventService.onLoginSuccess(response);
                }else{
                    alert(response.message);
                }
            });
        }else{
            alert("Bạn chưa chọn tài khoản game!");
        }

    }
    $scope.goLogin = function(){
        $scope.gamer = null;
        $scope.list_accounts = null;
        $rootScope.gamer_account;
        $location.path("/user/login");
    };
	
	$scope.gamer = (localStorageService.get('gamer'));

	


}]);




myApp.controller("ChoiceCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){

	
	if(localStorageService.get('gamer') == null){
		$location.path("/user/login");
	}
	$gamer = (localStorageService.get('gamer'));
	$scope.gamer = $gamer;
		
	var params = {
		iduser : $gamer.id
	};
	var request_result = GamerService.getGameAccounts(params);
	
	request_result.then(function(response){
		if(response.listAcc.length > 0 ){
			var accounts = GameAccount.loadAll(response.listAcc);
			
			//console.log(response.listAcc.length);
			//console.log(response);
			//console.log(accounts);
			//console.log(accounts[0].username);
			
			$scope.list_accounts = accounts;
			$scope.selectd_account = accounts[0].username;
		}
	});

    $scope.changeAddAcc = function(){
		console.log('z');

	}

}]);


myApp.controller("ProfileCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){
	
 	if(localStorageService.get('gamer') == null){
		$location.path("/user/login");
	}

	$gamer = (localStorageService.get('gamer'));
	$scope.gamer = $gamer;
	
	
	    //process login
    $scope.doLogout = function(){
		localStorageService.remove('gamer', 'GAME_CONFIG');
		$location.path("/user/login");
    };

}]);



myApp.controller("PaymentsCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){
	
 	if(localStorageService.get('gamer') == null){
		$location.path("/user/login");
	}

	$gamer = (localStorageService.get('gamer'));
	$scope.gamer = $gamer;
	$scope.GAME_CONFIG = localStorageService.get('GAME_CONFIG');
	
	$scope.toPaymentCard = function(){
		$location.path("/payment/card");
	}
	
	$scope.toPaymentCoin = function(){
		$location.path("/payment/coin");
	}

}]);


myApp.controller("PaymentCCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){
 	if(localStorageService.get('gamer') == null){
		$location.path("/user/login");
	}

	$gamer = (localStorageService.get('gamer'));
	$scope.gamer = $gamer;
	$scope.GAME_CONFIG = localStorageService.get('GAME_CONFIG');
	//console.log($scope.GAME_CONFIG);
	
	
	
	var params = {
		//iduser : $gamer.id
	};
	var request_result = GamerService.getRateC(params);
	
	request_result.then(function(response){
		//var accounts = GameAccount.loadAll(response);
		
		//console.log(response);

		$scope.list_ratec = response;
		//$scope.selectd_account = accounts[0].username;
	});
	
	
	
	
	
	
	
	
	$scope.toPayments = function(){
		$location.path("/payments");
	}
	
	
	
	

}]);



myApp.controller("PaymentCardCtrl",["$scope", "$rootScope", "$location", "GamerService","EventService","Gamer","GameAccount", 'localStorageService',function($scope, $rootScope, $location, GamerService, EventService, Gamer,GameAccount, localStorageService){
 	if(localStorageService.get('gamer') == null){
		$location.path("/user/login");
	}

	$gamer = (localStorageService.get('gamer'));
	$scope.gamer = $gamer;
	$scope.GAME_CONFIG = localStorageService.get('GAME_CONFIG');
	//console.log($scope.GAME_CONFIG);

	$scope.toPayments = function(){
		$location.path("/payments");
	}

}]);

