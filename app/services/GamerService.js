options = {};
myApp.service("GamerService", function ($http,$q) {
    this.login = function (user) {
        var deferred = $q.defer();
        var data = {
            act: "login",
            username: user.username,
            password: user.password
        };
        $http.post("http://localhost/angular/api.php", data, options)
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
});
