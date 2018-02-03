//Creating the population of the rockets
function Population(){
    this.rockets = [];
    this.matingPool = [];
    /*var this.popsize = 50;
    for (var i = 0; i < this.popsize; i ++){
      this.rockets[i] = new Rocket();
    }*/
    this.CreateRockets = function(Psize){
      this.popsize = Psize;
      for (var i = 0; i < this.popsize; i ++){
        this.rockets[i] = new Rocket();
      }
    }
    
    this.run = function(){
      for (var i = 0; i < this.popsize; i ++){
        this.rockets[i].update();
        this.rockets[i].show();
      }
    }

    //Evaluation for the reGenerating population
    this.evaluateFitness = function(){
      var maxFit = 0;
      for (var i = 0; i < this.popsize; i ++){
        //Calculating the fitness
        this.rockets[i].calcualteFitenss();
        //Updating fitness depending upon the distance factor
        if(this.rockets[i].distanceBetween < 250){
          this.rockets[i].fitness *= 2;
        }
        //Calculating the Maximum fitness among all the rockets object
        if(this.rockets[i].fitness > maxFit){
          maxFit = this.rockets[i].fitness;
        }
      } 
      //Normalizing the fitness of all the rockets
      for (var i = 0; i < this.popsize; i ++){
        this.rockets[i].fitness /= maxFit;
      }
      //Clearing matingPool everytime before use
      this.matingPool = [];
      for (var i = 0; i < this.popsize; i ++){
        var n = this.rockets[i].fitness * 100;
        for (var j = 0; j < n; j ++){
          this.matingPool.push(this.rockets[i]);
        }
      }
    }
    //.....
    this.selection = function (){
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i ++){
          var parentA = random(this.matingPool).dna;
          var parentB = random(this.matingPool).dna;
          var child = parentA.crossover(parentB);
          child.mutation();
          newRockets[i] = new Rocket(child);
          //newRockets[0].applycolor(color(0,255,0,130));
          //giving the color to the new rockets based upon their fitness or their recent distance from target
          if(this.rockets[i].distanceBetween < 250 || this.rockets[i].fitness > .5){
            newRockets[i].applycolor(color(0,255,0,130));
          }else{
            newRockets[i].applycolor(color(255,0,0,130));
          }
        }
        this.rockets = newRockets;
      }
  }