import { observable } from 'mobx';
import Model from './Model'

class BaseInfo extends Model{
  proxy={
    get:"/json/person.json"
  }
  @observable name = "a";

  constructor(obj={}) {
    super(obj);
    this.name=obj.name||'default';
  }

  


}

export default BaseInfo;
