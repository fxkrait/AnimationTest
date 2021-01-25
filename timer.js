// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    };

    tick() {
        var current = Date.now(); // returns the current time in milliseconds.
        var delta = (current - this.lastTimestamp) / 1000; // convert milliseconds to seconds
        this.lastTimestamp = current;

        // return difference, but make sure that time slice isn't too big.
        var gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};
