class Azid {
    constructor(game, x, y, luigi) {
        Object.assign(this, { game, x, y });

        this.game.mario = this;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/diablo/azid.png");

        // mario's state variables
        this.size = 0; // 0 = little, 1 = big, 2 = super, 3 = little invincible, 4 = big invincible, 5 = super invincible
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = skidding, 4 = jumping/falling, 5 = ducking
        this.dead = false;

        this.direction = 0;

        const numDirections = 8 // 0 to 7
        const numStates = 4 // Attack, Death, Idle, Walk/Run
        const spriteHeight = 96
        const spriteWidth = 128

        const numAttackFrames = 12
        const numDeathFrames = 24
        const numIdleFrames = 13
        const numRunFrames = 8
        const verticalPixelSeparator = 1 // 1 pixel for each set ("attack", "walk", etc)


        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

        // mario's animations
        this.animations = [];

       /* this.attackAnimation = new Animator(this.spritesheet, 1, 21, spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );*/

        /*this.deathAnimation = new Animator(this.deathSpritesheet, 0, 0, 128, 128, numDeathFrames, 
            0.2,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );
/*
        this.idleAnimation = new Animator(this.idleSpritesheet, 0, 0, 128, 128, numIdleFrames, 
            0.07,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            true, //not reverse
            true // no loop
        );


        this.runAnimation = new Animator(this.runSpritesheet, 0, 0, 128, 128, numRunFrames, 
            0.07,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            true, //not reverse
            true // no loop
        );
  */      
        this.loadAnimations(numStates, numDirections, spriteHeight, spriteWidth, numAttackFrames, numAttackFrames, numIdleFrames, numRunFrames);
    };

    loadAnimations(numStates, numDirections, spriteHeight, spriteWidth, numAttackFrames, numDeathFrames, numIdleFrames, numRunFrames) {
        for (var i = 0; i < numStates; i++) { // four statess
            this.animations.push([]);
            for (var j = 0; j < numDirections; j++) { // 8 directions
                this.animations[i].push([]);
            }
        }

        /*
        State:
        - 0: Attack
        - 1: Death
        - 2: Idle
        - 3: Run
        
        Direction:
        - 0: E
        - 1: NE
        - 2: N
        - 3: NW
        - 4: W
        - 5: SW
        - 6: S
        - 7: SE
        */

        

        // idle animation for state = 0
        // facing right = 0

        //[state][direction]


        // Attack animation
        // - SOUTH
        
        this.animations[0][6] = new Animator(this.spritesheet, 1, 21,  spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH WEST
        this.animations[0][5] = new Animator(this.spritesheet, 1, 21 + 1* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

            // - WEST
        this.animations[0][4] = new Animator(this.spritesheet, 1, 21 + 2* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH WEST
        this.animations[0][3] = new Animator(this.spritesheet, 1, 21 + 3* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH
        this.animations[0][2] = new Animator(this.spritesheet, 1, 21 + 4* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH EAST
        this.animations[0][1] = new Animator(this.spritesheet, 1, 21 + 5* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - EAST
        this.animations[0][0] = new Animator(this.spritesheet, 1, 21 + 6* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH EAST
        this.animations[0][7] = new Animator(this.spritesheet, 1, 21 + 7* (spriteHeight+1), spriteWidth, spriteHeight, numAttackFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );



        // Death animation
        // - SOUTH
        
        this.animations[1][6] = new Animator(this.spritesheet, 1, 817,  spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH WEST
        this.animations[1][5] = new Animator(this.spritesheet, 1, 817 + 1* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

            // - WEST
        this.animations[1][4] = new Animator(this.spritesheet, 1, 817 + 2* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH WEST
        this.animations[1][3] = new Animator(this.spritesheet, 1, 817 + 3* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH
        this.animations[1][2] = new Animator(this.spritesheet, 1, 817 + 4* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH EAST
        this.animations[1][1] = new Animator(this.spritesheet, 1, 817 + 5* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - EAST
        this.animations[1][0] = new Animator(this.spritesheet, 1, 817 + 6* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH EAST
        this.animations[1][7] = new Animator(this.spritesheet, 1, 817 + 7* (spriteHeight+1), spriteWidth, spriteHeight, numDeathFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


        // IDLE animation
        // - SOUTH
        
        this.animations[2][6] = new Animator(this.spritesheet, 2, 2409,  spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH WEST
        this.animations[2][5] = new Animator(this.spritesheet, 2, 2409 + 1* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

            // - WEST
        this.animations[2][4] = new Animator(this.spritesheet, 2, 2409 + 2* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH WEST
        this.animations[2][3] = new Animator(this.spritesheet, 2, 2409 + 3* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH
        this.animations[2][2] = new Animator(this.spritesheet, 2, 2409 + 4* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH EAST
        this.animations[2][1] = new Animator(this.spritesheet, 2, 2409 + 5* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - EAST
        this.animations[2][0] = new Animator(this.spritesheet, 2, 2409 + 6* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH EAST
        this.animations[2][7] = new Animator(this.spritesheet, 2, 2409 + 7* (spriteHeight+1), spriteWidth, spriteHeight, numIdleFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );
        



        // WALK/RUN animation
        // - SOUTH
        
        this.animations[3][6] = new Animator(this.spritesheet, 2, 4002,  spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH WEST
        this.animations[3][5] = new Animator(this.spritesheet, 2, 4002 + 1* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

            // - WEST
        this.animations[3][4] = new Animator(this.spritesheet, 2, 4002 + 2* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH WEST
        this.animations[3][3] = new Animator(this.spritesheet, 2, 4002 + 3* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH
        this.animations[3][2] = new Animator(this.spritesheet, 2, 4002 + 4* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - NORTH EAST
        this.animations[3][1] = new Animator(this.spritesheet, 2, 4002 + 5* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );


            // - EAST
        this.animations[3][0] = new Animator(this.spritesheet, 2, 4002 + 6* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

        // - SOUTH EAST
        this.animations[3][7] = new Animator(this.spritesheet, 2, 4002 + 7* (spriteHeight+1), spriteWidth, spriteHeight, numRunFrames, 
            0.15,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );
        

        

            // facing left
       // this.animations[0][1] = new Animator(this.attackSpritesheet, 0, 0, 180, 128, numAttackFrames, 0.07, 0, false, true);
        
    };

    updateBB() {
        if (this.size === 0 || this.size === 3) {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        else {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        }
    };

    die() {
        this.velocity.y = -640;
        this.dead = true;
    };

    update() {

    };

    drawMinimap(ctx, mmX, mmY) {
        ctx.fillStyle = "Red";
        ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, PARAMS.SCALE, PARAMS.SCALE * Math.min(this.size + 1, 2));
    }

    

    draw(ctx) {

   /*
    /////////////////////
    // Lecture 9: Animation
   */
  let w = 48*8;
  let h = 48*8;
 // ctx.drawImage(this.idleSpritesheet, 0, 0, 128, 128, 100, 100, w, h);



    //this.attackAnimation.drawFrame(this.game.clockTick, ctx, 400,10, 2);

    //this.animations[0][this.direction].drawFrame(this.game.clockTick, ctx, 400, 300, 2);

    //this.direction = (this.direction + 1) % 6;

    this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0, 1500, 2);
    this.animations[0][1].drawFrame(this.game.clockTick, ctx, 0, 1700, 2);
    this.animations[0][2].drawFrame(this.game.clockTick, ctx, 0, 1900, 2);
    this.animations[0][3].drawFrame(this.game.clockTick, ctx, 0, 2100, 2);
    this.animations[0][4].drawFrame(this.game.clockTick, ctx, 0, 2300, 2);
    this.animations[0][5].drawFrame(this.game.clockTick, ctx, 0, 2500, 2);
    this.animations[0][6].drawFrame(this.game.clockTick, ctx, 0, 2700, 2);

    this.animations[1][0].drawFrame(this.game.clockTick, ctx, 300, 1500, 2);
    this.animations[1][1].drawFrame(this.game.clockTick, ctx, 300, 1700, 2);
    this.animations[1][2].drawFrame(this.game.clockTick, ctx, 300, 1900, 2);
    this.animations[1][3].drawFrame(this.game.clockTick, ctx, 300, 2100, 2);
    this.animations[1][4].drawFrame(this.game.clockTick, ctx, 300, 2300, 2);
    this.animations[1][5].drawFrame(this.game.clockTick, ctx, 300, 2500, 2);
    this.animations[1][6].drawFrame(this.game.clockTick, ctx, 300, 2700, 2);


    this.animations[2][0].drawFrame(this.game.clockTick, ctx, 600, 1500, 2);
    this.animations[2][1].drawFrame(this.game.clockTick, ctx, 600, 1700, 2);
    this.animations[2][2].drawFrame(this.game.clockTick, ctx, 600, 1900, 2);
    this.animations[2][3].drawFrame(this.game.clockTick, ctx, 600, 2100, 2);
    this.animations[2][4].drawFrame(this.game.clockTick, ctx, 600, 2300, 2);
    this.animations[2][5].drawFrame(this.game.clockTick, ctx, 600, 2500, 2);
    this.animations[2][6].drawFrame(this.game.clockTick, ctx, 600, 2700, 2);



    this.animations[3][0].drawFrame(this.game.clockTick, ctx, 900, 1500, 2);
    this.animations[3][1].drawFrame(this.game.clockTick, ctx, 900, 1700, 2);
    this.animations[3][2].drawFrame(this.game.clockTick, ctx, 900, 1900, 2);
    this.animations[3][3].drawFrame(this.game.clockTick, ctx, 900, 2100, 2);
    this.animations[3][4].drawFrame(this.game.clockTick, ctx, 900, 2300, 2);
    this.animations[3][5].drawFrame(this.game.clockTick, ctx, 900, 2500, 2);
    this.animations[3][6].drawFrame(this.game.clockTick, ctx, 900, 2700, 2);

    //this.animations[0][0];
    //var test = this.animations;
    //console.log(test);
    //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 50,0, 3);

/*
   this.idleAnimation.drawFrame(this.game.clockTick, ctx, 0, 150, 3);

   this.deathAnimation.drawFrame(this.game.clockTick, ctx, 0, 300, 3);

   this.runAnimation.drawFrame(this.game.clockTick, ctx, 0, 450, 3);
*/


   /*
   this.animations[1][0][0].drawFrame(this.game.clockTick, ctx, 100,0, 3);
   this.animations[1][1][0].drawFrame(this.game.clockTick, ctx, 200,0, 3);
   this.animations[1][2][0].drawFrame(this.game.clockTick, ctx, 300,0, 3);
   
*/
    // ti
    // idle animation for state = 0
    // facing right = 0
    //this.animations[0][0][0].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, 3);
    //this.animations[0][1][0].drawFrame(this.game.clockTick, this.game.ctx, this.x + 100, this.y, 3);
    //this.animations[0][2][0].drawFrame(this.game.clockTick, this.game.ctx, this.x + 200, this.y, 3);

    //this.animations[0][1][0] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
    //this.animations[0][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);

    // idle animation for state = 0
    // facing right = 0



/*
  let x = 100;
  let y = 100;
  let w = 48;
  let h = 96;
  ctx.strokeStyle = "White";
  //ctx.strokeRect(x, 100, w, 32 * 3);
  ctx.save();

  ctx.drawImage(this.spritesheet, 209, 52, 16, 32, 0, 0, w, h);
 */



    };
};