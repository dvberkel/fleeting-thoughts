(function($, Fleeting){
    $(function(){
        var view = new Fleeting.CharactersView({ el : $("body"), strategy : function(){
            this.hidden(true);
	}});
        
        (function loop(){
            window.setTimeout(loop, 1000);
            view.tick();
        })();
    });
})(jQuery, Fleeting);
