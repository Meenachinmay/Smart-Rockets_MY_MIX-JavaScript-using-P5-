//Rocket objects
function Rocket(dna){
  //#########################################################
  if(WinningCount < 2 && WaitingTime == nextTime){
      if(random(1) < 0.05){
        newmag += .1
        launchinPointX = launchinPointX - 100;
      }else{
        newmag += .1;
        launchinPointX = launchinPointX + 100;
      }
      this.position = createVector(launchinPointX,launchinPointY);
      nextTime = nextTime + 2000;
    }else{
      this.position = createVector(launchinPointX,launchinPointY);
    }
    //########################################################
    //Setting the colors of Rockets
    this.color = color(255,130);
    this.applycolor = function(colorname){
       this.color = color(colorname);
    }

    this.velocity = createVector();
    this.accelaration = createVector();
    this.completed = false;
    this.crashed = false;
    this.distanceBetween;

    if(dna){
      this.dna = dna;
    }else{
      this.dna = new DNA();
    }
    this.fitness = 0;
    
    this.applyForce = function(force){
      this.accelaration.add(force);
    }
    
    this.calcualteFitenss = function(){
      var d = dist(this.position.x,this.position.y,target.x,target.y);
      this.fitness = 1 / d;
      if(this.completed){
        this.fitness *= 10;
      }
  
      if(this.crashed){
        this.fitness = 0;
      }
    }
    
    this.update = function(){
      var d = dist(this.position.x, this.position.y,target.x, target.y);
      this.distanceBetween = d;
      
      if(d < 10){
        this.completed = true;
        this.color = color(0,255,0,130);
        WinningCount++;
        //this.position = target.copy();
      }
      if(this.position.x > rx && this.position.x < rx + rw && this.position.y > ry && this.position.y < ry + rh){
        this.crashed = true;
        this.color = color(255,0,0,130);
      }
      this.applyForce(this.dna.genes[count]);
      if(!this.completed && !this.crashed){
        this.velocity.add(this.accelaration);
        this.position.add(this.velocity);
        this.accelaration.mult(0);
      }
      }
  
    this.show = function(){
      push();
      translate(this.position.x,this.position.y);
      rotate(this.velocity.heading());
      rectMode(CENTER);
      noStroke();
      fill(this.color);
      rect(0,0,50/2,10/2);
      pop();
    }
  }