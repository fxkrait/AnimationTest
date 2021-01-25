/* queue downloads, trigger downloads, listen for downloads when they arrive.

    NOT SET UP TO HANDEL AUDIO ASSETS (but it would involve similar design features)
*/
class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = []; // load the images when we download them, so that we can access them later on.
        this.downloadQueue = []; 
    };

    // add to list all images you want to download
    //  path is a String (depicting the path of the image that we want to download) [remote or local path]
    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path); // push the String paths to the list for the download queue (the list of strings)
    };

    /*
        Checks if all the images have been downloaded (or tried to download all of them), or have downloaded as much as they could 
        (successes + errors = total num of images requested)
    */
    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    // callback si the name of the function to run when we're done downloading all the images (this is called in main.js, and main is passed in when 
    //   downloadAll() finishes
    downloadAll(callback) {
        // sometimes we want to call downloadAll() even though we are downloading 0 things.
        // in this case, we call the callback immediately (but 10 ms delay, to ensure that the HTML document is already loaded)
        //  The proper awy to do this, is in main.js, to wait until window is finished loading, to run downloadAll()
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
 
        // loop through the download queue that we filled up previously
        for (var i = 0; i < this.downloadQueue.length; i++) {
            // create a new image tag that would appear on the HTML document (create a new Image tag)
            var img = new Image(); 

            // this is a normal operator that refers to the current instance of the class (the current instance of assetmanager)
            //  however, in Javascript, a class is just a function. So if we use "this" inside a function that is not attached to a class, this downloadAll()
            //  is attached to assetmanager (it's a method function of assetmanager), so within the scope of downloadAll(), this refers to as we would expect,
            //  the current instance or object of assestmanager.
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);


            /*
            However, when I go inside this function. This function is another callback function, that has no name, and is defined on the fly.
            This function is not attached to the assetmanager, so inside this function, "this" refers to the function and not the current instance of 
              the assetmanager. 
            So what that means is if we were going to use "this" in here  (say "this.successCount++"), that would not end up incrementing the successCount
              in the assetmanager like I want, it would increment the successCount in this function.
            This function doesn't have a successCount, so this would probably trigger an error.

            ******* IMPORTANT (this vs that)******
            To make it increment the successCount of the current instance outside, you have to do this weird design pattern.
            - You do "var that = this;" outside the function.
            "that" gives us a reference to the "this"
            so inside the function, we can call the alias or reference "that" to access the "this" which points to the current instance of the class.
            */

            /*
            Before we trigger downloads, add listeners for "loading" (if image successfully downloaded) and if an "error" (Say failed download) occurs.
            This needs to be done prior to download, if image downloads too quickly for this to be set up.
            */
            img.addEventListener("load", function () {
                console.log("Loaded " + this.src);
                that.successCount++;
                // if done, the run callback(). We are done after all the images are done (checked via isDone() function)
                if (that.isDone()) callback();
            });

            img.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            // set current images source to the path
            // this will trigger the download in the browser
            //  (the download isn't finished here [it is not blocking], but the downloads are done asynchronously, the image download is simply started).
            img.src = path;

            /*
            Once image is downloaded, use the path as the index to the image
            (Remember the array can be treated like a map).

            At this point after adding the image to the cache, the image might not be downloaded. 
            But we don't call getAsset() until all the images have finished downloaded.
            */
            this.cache[path] = img;
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};

