import  'fetch-polyfill'

function getUrl(url,params){
    return url.replace(/:([^\/?#]*)/g,function(v,key){
      return params[key]||v;
    })
}


export default class Api {
    constructor (basepath) {
        this.basepath=basepath;
    }

    get (
        url : '/',
        params : {}
    ): Promise<*> {
        var url=getUrl(url,params);
        return fetch(this.basepath+"/"+url).then(res=>res.json())
    }

    save (
        params : {}
    ): Promise<*> {
        return fetch(this.basepath,{
            method:'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(params)    
        }).then(res=>res.json())
    }

    all(url,params){
         return fetch(this.basepath+"/all",{
            // method:'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(params)    
        }).then(res=>res.json()) 
    }
    //获取分页信息
    getPage(params:{}): Promise<*> {
        return fetch(this.basepath+'?cb='+JSON.stringify(params)).then(res=>res.json())
    }
}
