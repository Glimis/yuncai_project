import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import {Table ,Button,Form,Col  } from 'react-bootstrap';
import {  Link } from 'react-router'
import Items from 'Store/Item'
import {Grids,GridLabel,ButtonArea,Button,Form,FormCell,CellHeader,CellBody,CellFooter,Label,Input} from 'react-weui'
import { browserHistory } from 'react-router'


@observer
export default class OrderForm extends Component{
  constructor(props){
    super(props);
    var store=this.store=new Items();
    store.load();
  }  
  data(){
    var self=this;
    var data=this.store.getList().map(function (obj,index) {

      obj.children=<GridLabel onClick={self.gotoShow.bind(self,obj._id)}>
       <div className="button-sp-area">
        功能点:{obj.gnd} 版本号:{obj.bbh} 申请时间:{obj.date}
             
                    <Button size="small">Mini</Button>
                </div>
      </GridLabel>
        return obj;
     })
    return data;
  }
  gotoShow(id){
    browserHistory.push(`/item/`+id)
  }
  gotoCreate(){
    browserHistory.push('/item/add') 
  }
  sq(id){
    fetch('/api/mail/'+id)
  }
  render(){
    var self=this;
    return (
          <div className='container showlist'>
            <ButtonArea>
                <Button onClick={self.gotoCreate}>
                    新增
                </Button>
            </ButtonArea>
            <Form>
              {this.store.getList().map(function(obj,index){
                   return (<FormCell vcode>
                            <CellHeader>
                                <Label>{obj.gnd}</Label>
                            </CellHeader>
                            <CellBody>
                                版本号:{obj.bbh} 申请时间:{obj.date}
                            </CellBody>
                            <CellFooter>
                                <Button type="vcode" onClick={self.sq.bind(self,obj._id)}>申请({obj.count})</Button>
                            </CellFooter>
                        </FormCell>)
            })}
            </Form>
          </div>)
  }
}
