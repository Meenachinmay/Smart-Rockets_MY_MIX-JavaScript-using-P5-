//DNA for rockets
function DNA(genes){
    if(genes){
      this.genes = genes;
    }else{
      this.genes = [];
      for (var i = 0; i < lifeSpan; i ++){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(Magnitude);
      }
    }
    //CrossOver function
    this.crossover = function(partner){
      var newgenes = [];
      var mid = floor(random(this.genes.length));
      for (var i = 0; i < this.genes.length; i ++){
        if(i > mid){
          newgenes[i] = this.genes[i];
          newgenes[i].setMag(newmag);
        }else{
          newgenes[i] = partner.genes[i];
          newgenes[i].setMag(newmag);
        }
      }
      return new DNA(newgenes);
    }
    //Adding some more random rockets each time with new Generation
    this.mutation = function (){
      for (var i = 0; i < genes.length; i ++){
        if(random(1) < 0.01){
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(0.2);
        }
      }
    }
  }