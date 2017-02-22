import { observable, asMap, action, ObservableMap } from 'mobx'
import Store from './Store'
import type { Uuid, Error, Request, Id, Label, DestroyOptions, SaveOptions } from './types'
import Api from './Api'
export default  class Model {
  //请求状态
  @observable request: ?Request = null
  //错误信息
  @observable error: ?Error = null
  //随机id
  uuid: Uuid
  store: Store
  //属性集合
  attributes: ObservableMap


  proxy(){
    return {
      get:'/',
      save:'/',
      all:"/"
    }
  }
  /**
   * 
   * @param  {[type]} attributes: {}          初始化属性
   * @param  {[type]} store:      关联集合,方便循环内的操作
   */
  constructor (attributes: {},store: Store) {
    this.uuid = 'uuid'

    this.store = store
    this.attributes = observable(asMap(attributes));
    this.api=new Api('/api/'+this.constructor.name.toLocaleLowerCase());
  }

  //获取内容
  get (attribute: string): ?any {
    return this.attributes.get(attribute)
  }
  //设置内容
  @action set (name,value): void {
    if(typeof name=='object'){
      this.attributes.merge(name)
    }else{
      this.attributes.set(name,value)
    }
  }

  @action async load(params={}){
    try{
      var data=await this.api.get('/:id',params)

      this.set(data)
      // this.attributes = asMap(data);
      return data;
    }catch(e){
      this.request = null
      // this.attributes = asMap(originalAttributes)
      this.error = {label:"padding", e}
    } 
  }



  @action remove(){
    return this.api.get('/:id',params)
  }
  /**
   * 保存
   * 1.直属信息,提交保存
   * 2.分支信息,修改attributes
   *
   * patch : 局部更新
   * 
   */
  @action async save (){
    try{
      let originalAttributes = this.attributes.toJS()
      var data=await this.api.save(originalAttributes)
      
      this.set(data)
    }catch(e){
      console.log(e)
      
      this.request = null
      
      this.error = {label:"padding", e}
    } 


    // return new Promise((resolve, reject) => {
    //   promise
    //     .then((data) => {
    //       this.request = null
    //       this.set(data)

    //       resolve(data)
    //     })
    //     .catch((body) => {
    //       this.request = null
    //       this.attributes = asMap(originalAttributes)
    //       this.error = {label, body}

    //       reject(body)
    //     })
    // })
  }

  @action destroy (
    {optimistic = true}: DestroyOptions = {}
  ): Promise<*> {
    if (!this.get('id')) {
      this.store.remove([this.uuid], {optimistic})
      return Promise.resolve()
    }

    const label: Label = 'destroying'
    const { promise, abort } = this.store.api.del(`/${this.id}`)

    if (optimistic) this.store.remove([this.id])

    this.request = {label, abort}

    return new Promise((resolve, reject) => {
      return promise
        .then(() => {
          if (!optimistic) this.store.remove([this.id])
          this.request = null

          resolve()
        })
        .catch((body) => {
          if (optimistic) this.store.add([this.attributes.toJS()])
          this.error = {label, body}
          this.request = null

          reject(body)
        })
    })
  }

  get id (): Id {
    return this.get('id') || this.uuid   
  }
}

