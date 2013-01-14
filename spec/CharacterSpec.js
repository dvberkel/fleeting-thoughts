describe("Character", function(){
    it("should be created with a symbol", function(){
        var character = new Fleeting.Character({ symbol : "A" });

        expect(character.symbol()).toBe("A");
    });

    it("should be created with a hide strategy", function(){
        var character = new Fleeting.Character({ strategy : function(){
            this.hidden(true);
        }});

        character.tick();

        expect(character.hidden()).toBeTruthy();
    });

    describe("View", function(){
        var character;

        beforeEach(function(){
            loadFixtures("viewport.html");
        });

        beforeEach(function(){
            character = new Fleeting.Character({ 
                symbol : "A",
                strategy : function(){
                    this.hidden(true);
                }
            });
            new Fleeting.CharacterView({ model : character, el : $("#viewport") });
        });

        it("should have a span.character", function(){
            expect($("span.character")).toExist();
        });

        xit("should hide span.character when character is hidden", function(){
            character.hidden(true);

            expect($("span.character")).toBeHidden();
        });
    });
});

describe("Characters", function(){
    describe("View", function(){
        beforeEach(function(){
            loadFixtures("viewport.html");
        });

        beforeEach(function(){
            new Fleeting.CharactersView({ el : $("#viewport") });
        });

        it("should have a div.characters", function(){
            expect($("div.characters")).toExist();
        });
 
        it("should add a character on a keypress", function(){
            $("body").keypress();

            expect($("span.character")).toExist();
        });
    });
});
