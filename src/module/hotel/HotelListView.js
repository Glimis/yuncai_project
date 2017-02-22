import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import {Table ,Button,Form,Col  } from 'react-bootstrap';
import {  Link } from 'react-router'
import Hotels from 'Store/Hotel'
import {Grids,GridLabel,ButtonArea,Button} from 'react-weui'
import { browserHistory } from 'react-router'
import './index.css'

@observer
export default class OrderForm extends Component{
  constructor(props){
    super(props);
    var hotels=this.hotels=new Hotels();
    hotels.load();
  }  
  data(){
    var self=this;
    var data=this.hotels.getList().map(function (obj,index) {

      obj.children=<GridLabel onClick={self.gotoShow.bind(self,obj._id)}>{obj.name}</GridLabel>
        return obj;
     })

    data.push({
      children:<GridLabel onClick={this.gotoCreate}>新增</GridLabel>
    })
    return data;
  }
  gotoShow(id){

    browserHistory.push(`/hotel/`+id)
  }
  gotoCreate(){
    browserHistory.push('/hotel/add') 
  }
  render(){
    var self=this;
    return (
          <div className='container showlist'>
            <ButtonArea>
                <Button>
                    新增
                </Button>
            </ButtonArea>
            <Grids data={this.data()}/>
          </div>)
  }
}

 // <Table responsive>
            //   <thead>
            //     <tr>
            //       <th>#</th>
            //       <th>名称</th>
            //       <th>地址</th>
            //       <th></th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {
            //       this.hotels.getList().map(function (obj,index) {
            //         return (
            //                 <tr>
            //                   <td>{index+1}</td>
            //                   <td>{obj.name}</td>
            //                   <td>{obj.address}</td>
            //                   <td><Link to={`/hotel/`+obj._id}>修改</Link></td>
            //                 </tr>)
            //       })
            //     }

            //   </tbody>
            // </Table>