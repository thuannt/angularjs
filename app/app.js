game_code = "sdk";
did = "browser_angular_thuannt";
ref = 0;
myApp = angular.module('myApp', ['ngRoute',"angular-md5", "LocalStorageModule"]);

myApp.constant('APP_CONFIG',{
    PARAMS      :{
        game_code   :   game_code,
        did         :   did,
        ref         :   ref,
        test_mode   :   1
    },
    URLS            :{
        GAME_INFO   :   "http://apidev.9chau.com/sdk/gameinfo"
    }
});

myApp.config(['$httpProvider','$routeProvider',function($httpProvider,$routeProvider) {
    //console.debug("config");
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
    $httpProvider.defaults.transformRequest = [function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }];

    $routeProvider.
        when('/user/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'UserCtrl'
        }).
        when('/user/choice_account', {
            templateUrl: 'app/templates/choice_account.html',
            controller: 'ChoiceCtrl'
        }).
        when('/user/profile', {
            templateUrl: 'app/templates/profile.html',
            controller: 'ProfileCtrl'
        }).
        when('/payments', {
            templateUrl: 'app/templates/payments.html',
            controller: 'PaymentsCtrl'
        }).
        when('/payment/coin', {
            templateUrl: 'app/templates/payment_c.html',
            controller: 'PaymentCCtrl'
        }).
        when('/payment/card', {
            templateUrl: 'app/templates/payment_card.html',
            controller: 'PaymentCardCtrl'
        }).
        otherwise({
            redirectTo: '/user/login'
        });
}]);

myApp.run(["$http","$rootScope","APP_CONFIG", 'localStorageService',function($http, $rootScope, APP_CONFIG, localStorageService){
		$rootScope.ready = false;
    //console.debug("run");

    //load dynamic config
    //$http.post("https://api.9chau.com/sdk/gameinfo", APP_CONFIG.PARAMS, options)
    $http.post(APP_CONFIG.URLS.GAME_INFO, APP_CONFIG.PARAMS, options)
        .success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            //$rootScope.GAME_CONFIG = data;
			
			localStorageService.set('GAME_CONFIG', data);
			//console.log(data);
			$rootScope.ready = true;
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //console.log(data);
        });


}]);

