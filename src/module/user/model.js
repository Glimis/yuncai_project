import { observable } from 'mobx';
import {Model} from 'Common'

class BaseInfo extends Model{
  proxy={
    get:"/json/person.json"
  }
  @observable name = "a";

  constructor(obj={}) {
    super(obj);
    this.name=obj.name;
  }

  


}

export default BaseInfo;
