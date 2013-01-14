/*! fleeting-thoughts - v0.0.0 - 2013-01-14
 * https://github.com/dvberkel/fleeting-thoughts
 * Copyright (c) 2013 Daan van Berkel; Licensed MIT
 */

Fleeting = {
    "version" : "0.0.0"
};

(function($, _, Backbone, f, undefined){
    var Character =  Backbone.Model.extend({
        defaults : {
            strategy : function(){ /* do nothing */ },
            hidden : false
        },
        
        tick : function(){
            this.get("strategy").call(this);
        },
        
        symbol : function(value){
            return this.accessor("symbol", value);
        },

        hidden : function(value){
            return this.accessor("hidden", value);
        },
        
        accessor : function(property, value) {
            if (value !== undefined) {
                this.set(property, value);
            }
            return value || this.get(property);
        }
    });

    var Characters = Backbone.Collection.extend({
        model : Character,

        addCharacter : function(model) {
            var character = new Character(model);
            character.set("strategy", this.strategy());
            this.add(character);
        },


        tick : function(){
            this.each(function(character){ character.tick(); });
        },

        strategy : function(strategy) {
            if (strategy) {
                this._strategy = strategy;
            }
            return strategy || this._strategy;
        }
    });

    var CharacterView = Backbone.View.extend({
        initialize : function(){
            this.render();
            this.model.on("change:hidden", function(){
                if (this.model.hidden()) {
                    this.container().animate({
                        opacity: 0
                    }, this.options.evaporateTime || 3000);
                }
            }, this);
        },

        render : function(){
            var container = this.container();
            container.text(this.model.symbol());
        },

        container : function(){
            if (!this._container){
                this._container = $("<span class='character'/>");
                this._container.appendTo(this.$el);
            }
            return this._container;
        }
    });

    var CharactersView = Backbone.View.extend({
        initialize : function(){
            if (! this.model) {
                this.model = new Characters();
                this.model.strategy(this.options.strategy || function(){ /* do nothing */ });
            }
            this.render();
            this.model.on("add", function(character){
                var container = this.container();
                new CharacterView({ model: character, el : container, evaporateTime : this.options.evaporateTime });
            }, this);
        },

        render : function(){
            var container = this.container();
        },

        container : function(){
            var self = this;
            if (!self._container){
                self._container = $("<div class='characters'/>");
                self._container.appendTo(self.$el);
                $("body").keypress(function(event){
                    self.model.addCharacter({ symbol : String.fromCharCode(event.which) });
                });
            }
            return self._container;
        },

        tick : function(){
            this.model.tick();
        }
    });

    f.Character = Character;
    f.CharacterView = CharacterView;
    f.CharactersView = CharactersView;
})(jQuery, _, Backbone, Fleeting);
