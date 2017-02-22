import { observable } from 'mobx';
import Item from 'Model/Item'


export default class ItemAddViewVM{


  constructor({id:id}){
      this.model=new  Item(); 
      if(id){
        this.model.load({
          id:id
        })
      }
  }
  change(name,e){
    this.model.set(name,e.target.value) 
  }
  save(){
    return this.model.save();
  }


}
