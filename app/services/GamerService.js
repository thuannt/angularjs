options = {};
myApp.service("GamerService", ["$rootScope","$http","$q","md5","APP_CONFIG" , 'localStorageService',function ($rootScope,$http,$q,md5,APP_CONFIG, localStorageService) {

	$GAME_CONFIG = localStorageService.get('GAME_CONFIG');

    function getLoginUrl(){
        //return $rootScope.GAME_CONFIG.link_api+"sdk/login";
        return $GAME_CONFIG.link_api+"sdk/login";
    }

    function getRegisterUrl(){
        //return $rootScope.GAME_CONFIG.link_api+"sdk/signup";
        return $GAME_CONFIG.link_api+"sdk/signup";
    }

    function getAccountGetUrl(){
        //return $rootScope.GAME_CONFIG.link_api+"sdk/listacc";
        return $GAME_CONFIG.link_api+"sdk/listacc";
    }
    function getLogActiveUrl(){
        //return $rootScope.GAME_CONFIG.link_api+"sdk/logactive";
        return $GAME_CONFIG.link_api+"sdk/logactive";
    }

    function getRateCUrl(){
        //return $rootScope.GAME_CONFIG.link_api+"sdk/logactive";
        return $GAME_CONFIG.link_api+"sdk/ratec";
    }


    function prepareParam(params){
        for(key in APP_CONFIG.PARAMS){
            params[key] = APP_CONFIG.PARAMS[key]
        }
        return params;
    };

    this.login = function (user) {
        user.password = md5.createHash(user.password);
        var data = prepareParam(user);

        var deferred = $q.defer();
        $http.post(getLoginUrl(), data, options)
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(data);
            });
        return deferred.promise;
    };

    this.register = function (user) {
        var deferred = $q.defer();
        var data = prepareParam(user)

        $http.post(getRegisterUrl(), data, options)
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(data);
            });
        return deferred.promise;
    };

    this.getGameAccounts = function(params){
        var deferred = $q.defer();
        var data = prepareParam(params);
        $http.post(getAccountGetUrl(), data, options)
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(data);
            });
        return deferred.promise;
    }

    this.loginGame = function(params){
        var deferred = $q.defer();
        var data = prepareParam(params);
        $http.post(getLogActiveUrl(), data, options)
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(data);
            });
        return deferred.promise;
    }
	
	
    this.getRateC = function(params){
        var deferred = $q.defer();
        var data = prepareParam(params);
        $http.post(getRateCUrl(), data, options)
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(data);
            });
        return deferred.promise;
    }
}]);
