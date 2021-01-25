// define game engine
var gameEngine = new GameEngine();

// global variable
var ASSET_MANAGER = new AssetManager();

// queue download for each of the images you want the asset manager to download
ASSET_MANAGER.queueDownload("./sprites/mario.png");
ASSET_MANAGER.queueDownload("./sprites/spr_ArcherAttack_strip_NoBkg.png");
ASSET_MANAGER.queueDownload("./sprites/spr_ArcherDeath_strip_NoBkg.png");
ASSET_MANAGER.queueDownload("./sprites/spr_ArcherIdle_strip_NoBkg.png");
ASSET_MANAGER.queueDownload("./sprites/spr_ArcherRun_strip_NoBkg.png");
ASSET_MANAGER.queueDownload("./sprites/diablo/azid.png");
ASSET_MANAGER.queueDownload("./sprites/diablo/rogueMercenary.png");

ASSET_MANAGER.queueDownload("./sprites/luigi.png");
ASSET_MANAGER.queueDownload("./sprites/enemies.png");
ASSET_MANAGER.queueDownload("./sprites/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/ground.png");
ASSET_MANAGER.queueDownload("./sprites/bricks.png");
ASSET_MANAGER.queueDownload("./sprites/items.png");
ASSET_MANAGER.queueDownload("./sprites/coins.png");


// pass a function into downloadAll()

// we want to use the function passed in when we're done with downloadAll()
//  this is a "CallBack Function", it does stuff when the method is done.
ASSET_MANAGER.downloadAll(function () {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;

	// our 2nd constructor, that runs after everything has been loaded (including the page)
	gameEngine.init(ctx);

	// create a new entity called the scene manager
	/*
	The SceneManager manages what scene we are in. If we are in level 1, it will add in the bricks and goombas for level 1, and so on.
	  The SceneManeger is the only real entity that matters at the beginning of the game. Because it will be loaded in, and it will say,
	   "Oh, we're in the first level", and it will load everything else in for us.
	*/
	new SceneManager(gameEngine);

	// we downloadAll() the images before we start the game engine.
	gameEngine.start();
});
