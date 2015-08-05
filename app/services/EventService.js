options = {};
myApp.service("EventService", ["APP_CONFIG",function (APP_CONFIG) {
    this.onLoginSuccess = function(data){
        console.log("onLoginSuccess");
        console.log(data);

    };

}]);
