myApp.factory("Gamer",function(){
    function Gamer(){
        this.id = null;
        this.name = null;
        this.email = null;
        this.refund = null;
        this.username = null;
        this.mobile = null;
        this.is_playnow = null;
    }
    Gamer.prototype.isVerified = function(){
        if(this.is_playnow.trim()==1){
            return false;
        }
        return true;
    };

    Gamer.prototype.getDisplay = function(){
        if(this.name === undefined || this.name.trim()==""){
            return this.username;
        }
        return this.name;
    };

    Gamer.prototype.load = function(data){
        if(data.id !== undefined){
            this.id = data.id;
        }
        if(data.name !== undefined){
            this.name = data.name;
        }
        if(data.email !== undefined){
            this.email = data.email;
        }
        if(data.refund !== undefined){
            this.refund = data.refund;
        }
        if(data.username !== undefined){
            this.username = data.username;
        }
        if(data.mobile !== undefined){
            this.mobile = data.mobile;
        }
        if(data.is_playnow !== undefined){
            this.is_playnow = data.is_playnow;
        }
    };

    Gamer.build = function(){
        return new Gamer();
    }

    return Gamer;
});
