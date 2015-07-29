myApp.factory("GameAccount",function(){
    function GameAccount(){
        this.id = null;
        this.username = null;
        this.usernameDisplay = null;
    }

    GameAccount.prototype.load = function(data){
        if(data.id !== undefined){
            this.id = data.id;
        }
        if(data.username !== undefined){
            this.username = data.username;
        }
        if(data.usernameDisplay !== undefined){
            this.usernameDisplay = data.usernameDisplay;
        }
    };

    GameAccount.build = function(){
        return new GameAccount();
    };

    GameAccount.loadAll = function(data){
        var result = [];
        for(key in data){
            var account = new GameAccount();
            account.load(data[key]);
            result.push(account);
        }
        return result;
    }

    return GameAccount;
});
