import { observable } from 'mobx';
import Hotel from 'Model/Hotel'
import Type from 'Store/Type'


export default class HotelFormViewVM{
  //追加的类别值
  @observable value = "";

  constructor({id:id}){
      this.hotel=new  Hotel();   
      this.type=new Type();
      if(id){
        this.hotel.load({
          id:id
        })
      }

      this.type.all();
  }

  saveHotel(){
    return this.hotel.save();
  }
  //添加类型
  addType(){
    var val=this.value;
    if(!val)return;
    if(this.hotel.get('form')){
      this.hotel.get('form').push(val)
    }else{
      this.hotel.set('form',[val])
    }
    this.value="";
  }


}
