import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Order from 'Model/Order'
import Hotels from 'Store/Hotel'
import _ from 'lodash'
import { FormGroup,FormControl,DropdownButton,InputGroup,MenuItem ,Button,Form,Col,ControlLabel  } from 'react-bootstrap';
import {  autorun } from 'mobx';

@observer
export default class OrderForm extends Component{
  constructor(props){
    super(props);
    const order =this.order=new Order();
    const hotels=this.hotels=new Hotels();
    //切换
    autorun(() => {
      var id=order.get('nameid');
      
      var hotel=_.find(this.hotels.getList(),function(v){
        return v._id==id;
      })
      if(!hotel)return;
      order.set({
        nameid:hotel._id,
        name:hotel.name,
        address:hotel.address,
        form:_.map(hotel.form,function(v){
          var o={};
          o['name']=v;
          o['value']=0;
          return o;
        })
      })
    });

    hotels.load({
        limit:999
    })
    .then(function(data){
        var list=data.list||[];
        if(list.length>0){
          order.set('nameid',list[0]._id);
        }
    });
  }  
  change(name,e){
     this.value=e.target.value;
  }
  async click(){
    var data=await this.order.save()
    // this.props.router.push('/order/list')
        
  }
  select(e){
    var id=e.target.value;
    this.order.set('nameid',id);
  }
  render(){
    var self=this;
    return (
          <div className='container'>
            <Form horizontal>
              <FormGroup controlId="formControlsSelect">
                <Col sm={2}>
                  <ControlLabel>名称</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl  componentClass="select" placeholder="select" onChange={this.select.bind(self)}>
                    {
                      this.hotels.getList().map(function (obj) {
                        return (<option value={obj._id}>{obj.name}</option>)
                      })
                    }
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col sm={2}>
                  <ControlLabel>地址</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl type="text" value={self.order.get('address')}  disabled/>
                </Col>
              </FormGroup>
              {
                this.order.get('form')&&this.order.get('form').map(function (obj) {
                  var {name,value}=obj;
                  return (<FormGroup controlId="formControlsSelect">
                            <Col sm={2}>
                              <ControlLabel>{name}</ControlLabel>
                            </Col>
                            <Col sm={10}>
                              <FormControl type="number" onChange={self.change.bind(obj,name)} />
                            </Col>
                          </FormGroup>)
                })
              }
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="button" className="btn btn-default" onClick={self.click.bind(this)}>确定</button>
                </div>
              </div>
            </Form>
          </div>)
  }
}

