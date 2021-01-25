// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
/*
Purpose of Game Engine is to handle the main Update-Render loop of the game
- Almost all games follow this (Update-Draw loop)

Game Engine gives entities time to update and draw.


For your game, you may need to change the type of input you accept



*/
class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // D-Pad Input
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;
    };


    /*
    We want to setup some of the things in our game engine AFTER the page has loaded.
    For instance, the context, which is where we are going to draw things on the canvas, we want to make sure the canvas element has already been loaded before
      we set that up. If we don't, and then we try to read the width and height (this.surfaceWidth), we will get errors, because those elements don't 
      exist yet.

    this init allows us to wait until after the page is loaded to do critical things for the game engine.
    */
    init(ctx) { // called after page has loaded
        this.ctx = ctx; // context
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        // the "that" variable refers back up to the "this" above, which refers to the gameengine
        var that = this;
        /*
        Here we create a function, called gameLoop

        */
        (function gameLoop() {
            // so we call the loop() method in the gameengine
            that.loop();
            /* We pass in the gameLoop function that we defined here into requestAnimFrame
            The reason why we are engaged in an Update-Render loop is because we actually have to maintain the game serially - we can't let everything
              update at the same time- we don't have the processing power to do that. So we have to update them all in order in some list. 
            And in order to do that, we have to take a segment of time away and do that. And then when we do that, we can now draw and do it again.
            And what that means is that we are trying to simulate continuous time, with little slivers of discrete time.
            Those little slivers of discrete time we call "ticks".

            We're trying to time our updates with the monitor that is projecting and drawing the information.
             - If we go too fast, we're doing updates that don't get presented on the monitor.
             - We also don't want to go too slow.

            This sets up a recursive infinite loop with the browser.
             - We update our game, draw the loop, and then it goes again.
            
             RequestAnimationFrame is handled by the browser, and it will wait until the monitor is ready for a refresh.
            */
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })(); // by putting the function in brackets: (function), and then calling it with (), we are calling that function we just defined.
        // We only need to call it once to start the infinite loop, so we can define the function once on-the-fly.
    };

    startInput() {
        var that = this;

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyZ":
                case "Comma":
                    that.B = true;
                    break;
                case "KeyX":
                case "Period":
                    that.A = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyZ":
                case "Comma":
                    that.B = false;
                    break;
                case "KeyX":
                case "Period":
                    that.A = false;
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    /*
    Gives every entity a chance to update
    Before it updates an entity, it clears the entire canvas.
    As soon as we clear the canvas, we immediately ask all of our entities to redraw themselves, so it is never visibly seen. 

    *********
    Things that are drawn later are drawn at the top (so Mario is drawn last)
    - In our draw() method, the entities draw in the order that they exist in our entities list
    - So to draw Mario on top of other things, Mario must appear later than those other things.
        - (See sceneManeger.js)

    Sometimes it may be better to split entities into different lists (say Background, Foreground, etc) to fix issues.

    

    */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    /*
    Calls update() on every entity, and removes the entities that should be removed (have removeFromWorld flag set to true or 1)
    */
    update() {
        var entitiesCount = this.entities.length;

        
        // Go through all of our entities (counting up)
        // This first loop goes through every entity in our entity list and asking for it to update
        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            // if entity is not going to be removed, then we can update it. Otherwise, don't update it (skip if statement)
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        // Our 2nd loop is counting down backwards.
        // This is something we typically do if we are going to be removing entities from the list as we iterate over it.
        //  (If you try and iterate up a list while you are trying to remove elements from it, if you do that you will end up skipping over element by accident)
        //  (if you go backwards, you won't miss any elements)
        
        
        for (var i = this.entities.length - 1; i >= 0; --i) {
        // we're checking each entity for this removeFromWorld flag (boolean)
        //  For most entities, it will be TRUE or NULL.
        //  - If NULL (an element is in the gameWorld), removeFromWorld will be False
        //  - If TRUE (1), then it will enter into the if statement
            if (this.entities[i].removeFromWorld) {
                // splice is a special array method in JS that allows you to insert and delete out of a list.
                // This is saying delete out the element starting at index i, and delete a sublist of length 1.
                // - This is a pretty intuitive way of saying "just delete out element i", and it will shuffle everything else down.

                // So we're just deleting the element if it says "removeFromWorld".
                this.entities.splice(i, 1);
            }
        }
    };

    /*
    our loop() function does one iteration of the Update and Draw loop
    */
    loop() {
        /* 
        clockTick is our timer, or how long has it been since the last tick. This will be use by our various animators to decide how far to move Mario,
         which frame we are on in our animations and so on. 
        We will record that once for each tick, which is how long it has been since the last tick (~1/60th of a second)
        */
        this.clockTick = this.timer.tick(); 
        this.update(); // call on gameengine ("this")
        this.draw(); // call on gameengine ("this")
    };
};