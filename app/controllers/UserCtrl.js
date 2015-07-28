myApp.controller("UserCtrl",["$scope","GamerService",function($scope,GamerService){
    $scope.user = {
        username: "",
        password:""
    };
    $scope.login = function(){
        var result = GamerService.login($scope.user);
        result.then(function(response){
            if(response.status ==1 ){
                alert("Hello "+ response.data.name +"!");
            }else{
                alert(response.message)
            }
        });
    };
}]);
