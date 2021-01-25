class Animator {
    /*
    get an image (spritesheet), store it, and pass it on to use for drawImage
    xStart, yStart: (x,y), top left corner, of image in spritesheet
    width,height: width and height of image in spritesheet
    frameCount: How many frames are there (EX: Walk is 3 frames (3 images))
    frameDuration: How long should each frame be painted on the canvas before we switch to the next frame
     - This will help up speed up or slow down our animation
     framePadding: In Spritesheet, there is white space between images. But this padding can change, so we need to specify it.
     reverse [Boolean]: If animation should run in reverse
     loop [Boolean]: If animation should loop


    */
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        /*
        Take care of looping and reversing
        */
        if (this.isDone()) {
            // IF loop is done (if we have gone past the total time), and if we're also looping, subtract back time, and go back to 0 to start over. (like a mod operator)
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else { // you are calling drawFrame() on an animation that is finished. And since this line is going to return, it won't draw anything at all, 
            // and you might just get a flicker.
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
       
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y, // where to draw
            this.width * scale,
            this.height * scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        }
    };

    // tells us our current frame
    // 0 based indexing
    currentFrame() {
        // time we've been animating / frame duration = how many frames have gone by to get to this point.
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
