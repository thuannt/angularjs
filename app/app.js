game_code = "sdk";
did = "browser_angular_thuannt";
ref = 0;
myApp = angular.module('myApp', ['ngRoute',"angular-md5"]);
myApp.config(['$httpProvider','$routeProvider',function($httpProvider,$routeProvider) {
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
        when('/user/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'UserCtrl'
        }).
        when('/user/profile', {
            templateUrl: 'app/templates/profile.html',
            controller: 'UserCtrl'
        }).
        otherwise({
            redirectTo: '/user/login'
        });
}]);