/* globals Class */
// @flow
import { observable, asMap, action, ObservableMap } from 'mobx'
import Model from './Model'
import arrayDiff from 'lodash.difference'
import arrayLast from 'lodash.last'
import type { Label, CreateOptions, Error, Request, SetOptions, Id } from './types.js'
import Api from './Api'
// type ApiCall = {
//   abort: () => void;
//   promise: Promise<*>;
// }

// interface ApiInterface { // eslint-disable-line
//   fetch(path?: string): ApiCall;
//   post(path?: string, data: {}): ApiCall;
//   put(path?: string, data: {}): ApiCall;
//   del(path?: string): ApiCall;
// }

export default class Collection {
  @observable request: ?Request = null
  @observable error: ?Error = null
  @observable models: [] = []

  api: ApiInterface // eslint-disable-line

  constructor (data: ?[]) {
    this.api=new Api('/api/'+this.constructor.name.toLocaleLowerCase());
    this.attributes = observable(asMap({}));
    if (data) this.set(data)
  }
    @action async all(params){
    try{
      var data=await this.api.all('/:id',params)

      this.set({
        list:data
      })
      return data;
    }catch(e){
      this.request = null
      this.error = {label:"padding", e}
    } 
  }
  //当前页数
  getPage(){
    return this.attributes.get('page');
  }
  //总页数
  getPages(){
    return this.attributes.get('pages'); 
  }
  // 获取所有数据
  getList(){
    return this.attributes.get('list')||[];
  }
  @action async load(params={}){
    try{
      var data=await this.api.getPage(params);
      this.set(data)
      return data;
    }catch(e){
      this.request = null
      this.error = {label:"padding", e}
    } 
  }
  /**
   * Returns the URL where the model's resource would be located on the server.
   */
  url (): string {
    return '/'
  }

  /**
   * Specifies the model class for that collection
   */
  model (): Class<Model> {
    return Model
  }

  /**
   * Gets the ids of all the items in the collection
   */
  _ids (): Array<number> {
    const ids = this.models.map((item) => item.id)
      .filter(Boolean)

    // LOL flow: https://github.com/facebook/flow/issues/1414
    return ((ids.filter(Boolean): Array<any>): Array<number>)
  }

  /**
   * Get a resource at a given position
   */
  at (index: number): ?Model {
    return this.models[index]
  }

  /**
   * Get a resource with the given id or uuid
   */
  get (id: Id): ?Model {
    return this.models.find((item) => item.id === id)
  }

  /**
   * Adds a collection of models.
   * Returns the added models.
   */
  @action add (models: Array<Object>): Array<Model> {
    const Model = this.model()

    const instances = models.map((attr) => new Model(attr,this))
    this.models = this.models.concat(instances)

    return instances
  }

  /**
   * Removes the model with the given ids or uuids
   */
  @action remove (ids: Array<Id>): void {
    ids.forEach((id) => {
      const model = this.get(id)
      if (!model) return

      this.models.splice(this.models.indexOf(model), 1)
    })
  }

  /**
   * Sets the models into the collection.
   *
   * You can disable adding, changing or removing.
   */
  
  @action set (name,value): void {
    if(typeof name=='object'){
      this.attributes.merge(name)
    }else{
      this.attributes.set(name,value)
    }
  }
  // @action set (
  //   models: [],
  //   {add = true, change = true, remove = true}: SetOptions = {}
  // ): void {
    
  //   if (remove) {
  //     const ids = models.map((d) => d.id)
  //     this.remove(arrayDiff(this._ids(), ids))
  //   }

  //   models.forEach((attributes) => {
  //     let model = this.get(attributes.id)

  //     if (model && change) model.set(attributes)
  //     if (!model && add) this.add([attributes])
  //   })
  // }

  /**
   * Creates the model and saves it on the backend
   *
   * The default behaviour is optimistic but this
   * can be tuned.
   */
  @action create (
    attributes: Object,
    {optimistic = true}: CreateOptions = {}
  ): Promise<*> {
    const label: Label = 'creating'
    const { abort, promise } = this.api.post('', attributes)
    let model

    if (optimistic) {
      model = arrayLast(this.add([attributes]))
      model.request = {label, abort}
    }

    return new Promise((resolve, reject) => {
      promise
        .then((data) => {
          if (model) {
            model.set(data)
            model.request = null
          } else {
            this.add([data])
          }

          resolve(data)
        })
        .catch((body) => {
          if (model) this.remove([model.id])
          this.error = {label, body}

          reject(body)
        })
    })
  }

  /**
   * Fetches the models from the backend.
   *
   * It uses `set` internally so you can
   * use the options to disable adding, changing
   * or removing.
   */
  @action fetch (options: SetOptions = {}): Promise<*> {
    const label: Label = 'fetching'
    const {abort, promise} = this.api.fetch()

    this.request = {label, abort}

    return new Promise((resolve, reject) => {
      promise
        .then((data) => {
          this.request = null

          this.set(data.list, options)

          resolve(data)
        })
        .catch((body) => {
          this.request = null
          this.error = {label, body}

          reject(body)
        })
    })
  }
}

 