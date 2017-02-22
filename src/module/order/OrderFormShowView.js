import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Order from 'Model/Order'
import _ from 'lodash'
import { FormGroup,FormControl,DropdownButton,InputGroup,MenuItem ,Button,Form,Col,ControlLabel  } from 'react-bootstrap';
import {  autorun } from 'mobx';

@observer
export default class OrderForm extends Component{
  constructor(props){
    super(props);
    var id=props.params.id;
    const order =this.order=new Order();
    order.load({
        id:id
    })
  }  
  change(name,e){
     this.value=e.target.value;
  }
  async click(){
    this.props.router.push('/order/list')
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
                  <FormControl type="text" value={self.order.get('name')}  disabled/>
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
                              <FormControl type="text" value={value}  disabled/>
                            </Col>
                          </FormGroup>)
                })
              }
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="button" className="btn btn-default" onClick={self.click.bind(this)}>返回</button>
                </div>
              </div>
            </Form>
          </div>)
  }
}

