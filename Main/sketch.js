var width = 1100;
var height = 500;
var rocket;
var population;
var lifeSpan = 300;
var count = 0;
var lifeP;
var GenerationCount;
var Generation;
var Gcount = 0;
var target;
var keys;
var Psize = 200;
var rx = 160;
var ry = height/2;
var rw = 750;
var rh = 20;
var launchinPointX = width/2;
var launchinPointY = height;
var WaitingTime = 0;
var nextTime = 3000;
var WaitTimeShow;
var WaitTimeCount;
var NextWatiTimeShow;
var NextTimeCount;
var LeftShiftCount = 0;
var RigtShiftCount = 0;
var Magnitude = 0.15;
//Only one time thrust to reach target
var newmag = 0.3;
//winning count
var WinningCount = 0;
//Only once startUp everything
function setup(){
  canvas = createCanvas(1100,500);
  canvas.position(50,0);
  rocket = new Rocket();
  population = new Population();
  population.CreateRockets(Psize);

  //print no of rockets
  lifeP = createP();
  lifeP.position(50,500);
  //printing the no of generations
  GenerationCount = createP();
  //printing the "Generation"
  Generation = createP();
  Generation.position(50,530);
  GenerationCount.position(140,530);

  WaitTimeShow = createP();
  WaitTimeShow.position(50,550);
  NextWatiTimeShow = createP();
  NextWatiTimeShow.position(50,570);
  WaitTimeCount = createP();
  WaitTimeCount.position(170,550);
  NextTimeCount = createP();
  NextTimeCount.position(170,570);
  //target position
  target = createVector(width/2,50);
  keys = new keyPressed();
}
//Main loop area
function draw(){
  background(51);
  population.run();
  lifeP.html(count);
  GenerationCount.html(Gcount);
  Generation.html("Generation");
  WaitTimeShow.html("WaitTimeShow");
  NextWatiTimeShow.html("NextWaitingTime");
  WaitTimeCount.html(WaitingTime);
  NextTimeCount.html(nextTime);
  count++;
  WaitingTime += 1;
  //Reinitializeing the rockets
  if(count == lifeSpan){
    //population.CreateRockets(Psize+100);
    population.evaluateFitness();
    population.selection();
    //population = new Population();
    count = 0;
    Gcount++;
    //WaitingTime += 10;
  }
  //Drawing the target
  ellipse(target.x, target.y,15,15);
  fill(255);
  rect(160,height/2,750,20);
  keys.stop();
}

//Keypressed to stop unnecessary simulation
function keyPressed(){
  this.stop = function (){
    if(keyCode === ESCAPE){
      noLoop();
    }
  }
}
