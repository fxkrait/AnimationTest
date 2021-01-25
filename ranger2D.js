class Ranger2D {
    constructor(game, x, y, luigi) {
        Object.assign(this, { game, x, y });

        this.game.mario = this;

        // spritesheet
        this.attackSpritesheet = ASSET_MANAGER.getAsset("./sprites/spr_ArcherAttack_strip_NoBkg.png");
        this.deathSpritesheet = ASSET_MANAGER.getAsset("./sprites/spr_ArcherDeath_strip_NoBkg.png");
        this.idleSpritesheet = ASSET_MANAGER.getAsset("./sprites/spr_ArcherIdle_strip_NoBkg.png");
        this.runSpritesheet = ASSET_MANAGER.getAsset("./sprites/spr_ArcherRun_strip_NoBkg.png");

        // mario's state variables
        this.size = 0; // 0 = little, 1 = big, 2 = super, 3 = little invincible, 4 = big invincible, 5 = super invincible
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = skidding, 4 = jumping/falling, 5 = ducking
        this.dead = false;


        const numAttackFrames = 14
        const numDeathFrames = 24
        const numIdleFrames = 8
        const numRunFrames = 8


        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

        // mario's animations
        this.animations = [];

        this.attackAnimation = new Animator(this.attackSpritesheet, 0, 0, 180, 128, numAttackFrames, 
            0.07,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            true, //not reverse
            true // no loop
        );

        this.deathAnimation = new Animator(this.deathSpritesheet, 0, 0, 128, 128, numDeathFrames, 
            0.2,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            false, //not reverse
            true // no loop
        );

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
        
        this.loadAnimations(numAttackFrames, numAttackFrames, numIdleFrames, numRunFrames);
    };

    loadAnimations(numAttackFrames, numDeathFrames, numIdleFrames, numRunFrames) {
        for (var i = 0; i < 4; i++) { // four statess
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // 2 directions
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
        - 0: Right
        - 1: Left
        */

        

        // idle animation for state = 0
        // facing right = 0

        //[state][size][direction]


        // Attack animation
        // facing right
        this.animations[0][0] = new Animator(this.attackSpritesheet, 0, 0, 180, 128, numAttackFrames, 
            0.07,// make is slower animation speed, (lower = faster, larger = slower)
            0, // frame padding
            true, //not reverse
            true // no loop
        );

        // facing left
        this.animations[0][1] = new Animator(this.attackSpritesheet, 0, 0, 180, 128, numAttackFrames, 0.07, 0, false, true);
/*
        // run animation
        // facing right
        this.animations[2][0][0] = new Animator(this.spritesheet, 239, 0, 16, 16, 3, 0.05, 14, false, true);
        this.animations[2][1][0] = new Animator(this.spritesheet, 239, 52, 16, 32, 3, 0.05, 14, true, true);
        this.animations[2][2][0] = new Animator(this.spritesheet, 237, 122, 16, 32, 3, 0.05, 9, true, true);

        // facing left
        this.animations[2][0][1] = new Animator(this.spritesheet, 89, 0, 16, 16, 3, 0.05, 14, true, true);
        this.animations[2][1][1] = new Animator(this.spritesheet, 90, 52, 16, 32, 3, 0.05, 14, false, true);
        this.animations[2][2][1] = new Animator(this.spritesheet, 102, 122, 16, 32, 3, 0.05, 9, false, true);

        // slide animation
        // facing right
        this.animations[3][0][0] = new Animator(this.spritesheet, 59, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[3][1][0] = new Animator(this.spritesheet, 329, 52, 16, 32, 1, 0.33, 14, false, true);
        this.animations[3][2][0] = new Animator(this.spritesheet, 337, 122, 16, 32, 1, 0.33, 14, false, true);

        // facing left
        this.animations[3][0][1] = new Animator(this.spritesheet, 330, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[3][1][1] = new Animator(this.spritesheet, 60, 52, 16, 32, 1, 0.33, 14, false, true);
        this.animations[3][2][1] = new Animator(this.spritesheet, 52, 122, 16, 32, 1, 0.33, 14, false, true);

        // jump animation
        // facing right
        this.animations[4][0][0] = new Animator(this.spritesheet, 359, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[4][1][0] = new Animator(this.spritesheet, 359, 52, 16, 32, 1, 0.33, 14, true, true);
        this.animations[4][2][0] = new Animator(this.spritesheet, 362, 122, 16, 32, 1, 0.33, 9, true, true);

        // facing left
        this.animations[4][0][1] = new Animator(this.spritesheet, 29, 0, 16, 16, 1, 0.33, 14, true, true);
        this.animations[4][1][1] = new Animator(this.spritesheet, 30, 52, 16, 32, 1, 0.33, 14, false, true);
        this.animations[4][2][1] = new Animator(this.spritesheet, 27, 122, 16, 32, 1, 0.33, 9, false, true);

        // duck animation
        // facing right
        this.animations[5][0][0] = new Animator(this.spritesheet, 209, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[5][1][0] = new Animator(this.spritesheet, 389, 48, 16, 32, 1, 0.33, 14, false, true);
        this.animations[5][2][0] = new Animator(this.spritesheet, 389, 118, 16, 32, 1, 0.33, 14, false, true);

        // facing left
        this.animations[5][0][1] = new Animator(this.spritesheet, 180, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[5][1][1] = new Animator(this.spritesheet, 0, 48, 16, 32, 1, 0.33, 14, false, true);
        this.animations[5][2][1] = new Animator(this.spritesheet, 0, 118, 16, 32, 1, 0.33, 14, false, true);

        // special death animation
        //this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
*/
        
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
        ///////////////////////////////
        Lecture 5: 

        ctx.fillStyle = "White";
        ctx.strokeStyle = "Red";

        ctx.strokeRect(100, 110, 100, 100);

        ctx.beginPath();
        ctx.arc(50, 50, 25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(200, 100);
        ctx.stroke();
        */
        
        ////////////////////////////
        // Lecture 6:

        //ctx.drawImage(this.spritesheet, 0, 0);
        // try and squish
        //ctx.drawImage(this.spritesheet, 0, 0, 810, 376);
       

        // start at pixel (209, 52)
        // each character is in 16x16 block. But Big mario is 2x as tall, so 16x32
        // put mario at (0,0)
        // make him 16x32
        /*
        ctx.drawImage(this.spritesheet, 209, 52, // start at pixel (209, 52)
            16, 32, // each character is in 16x16 block. But Big mario is 2x as tall, so 16x32
            0, 0,  // put mario at (0,0) on canvas
            16, 32 // make him 16x32 size on canvas
            );
        */

        //ctx.drawImage(this.spritesheet, 209, 52, 16, 32, 0, 0, 48, 96);


        /*
        /////////////////////////////
        // Lecture 7: (flip)
        */
/*
        let x = 100;
        let w = 48;
        ctx.save();
        ctx.beginPath();
        ctx.translate(100,100);
        ctx.strokeStyle = "Green";
        ctx.strokeRect(x, 100, w, 32 * 3);
        ctx.closePath();
       // ctx.arc(50, 50, 25, 0, 2 * Math.PI);

        ctx.beginPath();
        ctx.fillStyle = "White";
        ctx.arc(100, 100, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();


        ctx.beginPath();
        ctx.fillStyle = "Red";
        ctx.arc(100, 100, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();


        ctx.save();
        ctx.translate(100,100);
        // scale() scales everything from this poin tforward
        //ctx.scale(2, 1); // make everything in x-axis 2 times larger (stretch canvas out to the right 2x)
        //ctx.scale(-1, 1); // now the canvas goes out to the left, instead of the right. 
        //ctx.drawImage(this.spritesheet, 209, 52, 16, 32, -x -w, x, w, 32*3);
        ctx.drawImage(this.spritesheet, 209, 52, 16, 32, 0, 0, w, 32*3);
    
        //ctx.drawImage(this.spritesheet, 209, 52, 16, 32, 100, 100, 16*3, 32*3);
        ctx.restore(); // restore canvas (so it is not stretched anymore)
*/



    /*
    /////////////////////////
    // Lecture 8: (rotation)
    */
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

   /*
    /////////////////////
    // Lecture 9: Animation
   */
  let w = 48*8;
  let h = 48*8;
 // ctx.drawImage(this.idleSpritesheet, 0, 0, 128, 128, 100, 100, w, h);



    this.attackAnimation.drawFrame(this.game.clockTick, ctx, 0,0, 3);
    //this.animations[0][0];
    //var test = this.animations;
    //console.log(test);
    //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 50,0, 3);


   this.idleAnimation.drawFrame(this.game.clockTick, ctx, 0, 150, 3);

   this.deathAnimation.drawFrame(this.game.clockTick, ctx, 0, 300, 3);

   this.runAnimation.drawFrame(this.game.clockTick, ctx, 0, 450, 3);



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