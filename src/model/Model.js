

export default  class Model  {

  load(){
    
    var get=this.proxy.get;
    if(!get)return;
    var self=this;
    fetch(get)
      .then(function(response) { 
          return response.json();  
      }).then(function(json) {  
        self.setData(json)
      });  
  }
  
  setData(data){
    Object.assign(this, data);
  }

  all(){
    var get=this.proxy.all;
    if(!get)return;
    var self=this;
    fetch(get)
      .then(function(response) { 
          return response.json();  
      }).then(function(json) {  
        self.setData(json)
      }); 
  }
}


