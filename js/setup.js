(function($, Fleeting){
    $(function(){
	var search = window.location.search.slice(1).split("=");
	var evaporate = 5000;
	var index = search.indexOf('evaporate')
	if (index !== -1 && search[index + 1]) {
	    evaporate = parseInt(search[index + 1]) || evaporate;
	}

	console.log(evaporate);

        var view = new Fleeting.CharactersView({
            el : $("body"),
            strategy : function(){
                this.hidden(true);
            },
            evaporateTime : evaporate
        });

        (function loop(){
            window.setTimeout(loop, 1000);
            view.tick();
        })();
    });
})(jQuery, Fleeting);
