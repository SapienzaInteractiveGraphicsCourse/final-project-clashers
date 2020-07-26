var gltfLoader;
var renderer;
var container;

var head;
var scene;
var landscape;
var upperArm_right;
var upperArm_left;
var upperLeg_right;
var upperLeg_left;
var lowerLeg_right;
var lowerLeg_left;
var handRight;
var torso;
var spine;
var thumb1_right;
var thumb2_right;
var finger1_right;
var finger1_2_right;
var finger2_right;
var finger2_2_right;
var finger3_right;
var finger3_2_right;
var handLeft;
var thumb1_left;
var thumb2_left;
var finger1_left;
var finger1_2_left;
var finger2_left;
var finger2_2_left;
var finger3_left;
var finger3_2_left;
var finger4_left;
var finger4_2_left;
var finger4_right;
var finger4_2_right;

var tweenStartScale;
var tweenGoalScale;
var tweenBackScale;
var tweenStartRight;
var tweenGoalRight;
var tweenStartLeft;
var tweenGoalLeft;
var tweenIdle;
var tween_idle;
var tween;
var tweenRaiseUpHand;
var tweenLowerHand;
var tweenBack;
var tweenJump;
var tweenJumpBack;
var tweenFlex;
var tweenStartRaise;
var tweenGoalRaise;
var tweenGoalLower;

var tweenStartJump;
var tweenGoalJump;
var tweenGoalJumpBack;
var tweenStartFlex;
var tweenGoalFlex;
var tweenStartFall;
var tweenGoalFall;
var tweenFall;
var tweenGoalWin;
var tweenStartWin;
var tweenStartGameOver;
var tweenGoalGameOver;
var tweenBackGameOver;
var tweenGameOver;
var tweenGameOverBack;
var tweenWin;

var ground;

var yoshi;
var mario;
var luigi;
var brick;
var emptyBlock;
var castle;
var pipe;
var flagpole;
var coin;
var powerUp;
var questionBox;
var goomba;

var camera;
var dPressed = false;
var aPressed = false;
var spacePressed = false;
var isRotatedRight = true;
var isWalking = false;
var isJumping = false;
var isJumpingLeft = false;
var isJumpingRight = false;

var isFalling = false;

var dirLight;
var ambientLight;
var controls;
var keysPressed = {};

var yoshiBox;
var yoshiUpperBox;
var yoshiLowerBox;
var questionBoxContainer;
var geometryMaterial;
var geometryMaterial1;
var geometryMaterial2;
var pipeContainer;
var pipeContainerTop;
var powerUpContainer;
var coinContainer;
var brickContainer;
var emptyBlockContainer;
var groupContainer;
var brickClone;
var questionBoxClone;
var coinClone;
var powerUpClone;
var goombaClone;
var groupContainerTop;
var emptyBlockContainerTop;
var goombaContainer;
var goombaContainerTop;

var dir;

var collidedLeft = false;
var collidedRight = false;
var collidedTop1 = false;
var collidedTop2 = false;
var collidedBottom = false;
var collidedSide = false;
var collidedTopPipe = false;
var collidedTopStairs = false;
var groupCollision = false;
var goombaCollision = false;

var groupJump;
var groupRun;
var groupRotate;

var group1 = new Array();
var group2 = new Array();
var group3 = new Array();
var group4 = new Array();
var group5 = new Array();
var group6 = new Array();
var stairs = new Array();
var groupPipes = new Array();

var character;

var questionBoxArray = new Array();
var objectArray = new Array();
var coinContainerArray = new Array();
var coinArray = new Array();
var powerUpContainerArray = new Array();
var powerUpArray = new Array();
var pipeContainerTopArray = new Array();
var pipeContainerArray = new Array();
var emptyBlockContainerArray = new Array();
var emptyBlockContainerTopArray = new Array();
var goombaArray = new Array();
var goombaContainerArray = new Array();
var goombaContainerTopArray = new Array();

var tweenWalkGoombaArray = new Array();
var tweenGoombaFeetArray = new Array();

var marioBox;
var marioUpperBox;
var marioLowerBox;

var luigiBox;
var luigiUpperBox;
var luigiLowerBox;

var boxId;
var lowerBoxId;
var upperBoxId;
var touchesBox;
var touchesUpper;
var touchesLower;
var model;

var score;
var text;
var life;
var textLife;

var isCoin = false;
var goombaDead = false;

var pipeHeightGoal;
var stairsHeightGoal;
var currentPosition;

var coinSound;
var itemSound;
var jumpSound;
var loseLifeSound;
var gameOverSound;
var levelSound;
var goombaSound;
var winSound;

var removeLife = 1;

var questionLoaded = false;
var coinLoaded = false;
var brickLoaded = false;
var pipeLoaded = false;
var goombaLoaded = false;
var powerUpLoaded = false;
var emptyBlockLoaded = false;
var castleLoaded = false;

var keyboardDisabled = false;
