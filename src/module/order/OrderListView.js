import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Table ,Button,Form,Col,Pagination  } from 'react-bootstrap';
import {  Link } from 'react-router'
import Orders from 'Store/Order'

@observer
export default class OrderForm extends Component{
  constructor(props){
    super(props);
    var order=this.order=new Orders();
    this.handleSelect(1)
  }
  handleSelect(page){
    this.order.load({
        sort:{date:-1},
        page:page
    });
  }  
  render(){
    var self=this;
    return (
          <div className='container'>
            <Button><Link to={`/order/add`}>新增</Link></Button>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>时间</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.order.getList().map(function (obj,index) {
                    var date=new Date(obj.date);
                    return (
                            <tr>
                              <td>{index+1}</td>
                              <td>{obj.name}</td>
                              <td>{date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()}</td>
                              <td><Link to={`/order/`+obj._id}>查看</Link></td>
                            </tr>)
                  })
                }
              </tbody>
            </Table>
            <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.order.getPages()}
                    maxButtons={5}
                    activePage={this.order.getPage()}
                    onSelect={this.handleSelect.bind(this)}
                    />
          </div>)
  }
}