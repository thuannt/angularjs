options = {};
myApp.service("GamerService", ["$http","$q","md5",function ($http,$q,md5) {
    function prepareParam(params){
        params.game_code = game_code;
        params.did=did;
        params.ref=ref;
        return params;
    };

    this.login = function (user) {
        user.password = md5.createHash(user.password);
        var data = prepareParam(user);

        var deferred = $q.defer();
        $http.post("http://apidev.9chau.com/sdk/login", data, options)
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

        $http.post("http://apidev.9chau.com/sdk/signup", data, options)
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
}]);
