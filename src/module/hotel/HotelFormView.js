import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import { FormGroup,FormControl,DropdownButton,InputGroup,MenuItem ,Button,Form,Col  } from 'react-bootstrap';
// import Hotel from 'Model/Hotel'
import VM from './HotelFormViewVM'

import 'weui';
import 'react-weui/lib/react-weui.min.css';
import { ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips
} from 'react-weui'

@observer
export default class HotelFormView extends Component{
  constructor(props){
    super(props);
    var id=props.params.id
    this.vm=new VM({id:id});
    window.vm=this.vm;
  }  
  //修改属性
  changeHotel(name,e){
    this.vm.hotel.set(name,e.target.value) 
  }
  //修改属性
  changeState(value){
     this.setState({
        addTypeValue:value
     })
  }  
  changeStateHandle(e){
    this.vm.value=e.target.value
  }
  //保存
  async save(){
    await this.vm.saveHotel(); 
    this.props.router.push('/hotel/list')
  }
  render(){
    var self=this;
     return  (
          <div>
            <Form>
                <FormCell>
                    <CellHeader>
                        <Label>变更的功能点</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" placeholder="变更的功能点"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>问题详细描述</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="问题详细描述"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>影响功能点</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="影响功能点"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>修改后的版本号</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="修改后的版本号"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>开发show环境自测结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="开发show环境自测结果"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>开发负责人</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="开发负责人"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试show环境验证结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试show环境验证结果"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试阿里云环境验证结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试阿里云环境验证结果"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试负责人</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试负责人"/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>备注</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="备注"/>
                    </CellBody>
                </FormCell>
            </Form>
            <ButtonArea>
                <Button
                    onClick={ e=> {
                        if(this.state.showToptips) return;
                        this.setState({showToptips: !this.state.showToptips})
                        window.setTimeout(e=> this.setState({showToptips: !this.state.showToptips}), 2000)
                    }
                }>
                    保存
                </Button>
            </ButtonArea>
          </div>
         )    
    // return (
    //       <div className='container'>
    //         <Form horizontal>
    //           <FormGroup >
    //             <Col sm={2}>
    //               名称
    //             </Col>
    //             <Col sm={10}>
    //               <FormControl type="text" value={this.vm.hotel.get('name')} onChange={this.changeHotel.bind(self,'name')} />
    //             </Col>
    //           </FormGroup>
    //           <FormGroup >
    //             <Col sm={2}>
    //               地址
    //             </Col>
    //             <Col sm={10}>
    //               <FormControl type="text" value={this.vm.hotel.get('address')}  onChange={this.changeHotel.bind(self,'address')}/>
    //             </Col>
    //           </FormGroup>
    //           <FormGroup >
    //           {
    //               this.vm.hotel.get('form')&&this.vm.hotel.get('form').map(function (obj) {
    //                 return (<label  className="col-sm-2 control-label">{obj}</label>)
    //               })
    //           }
    //           </FormGroup>
    //           <FormGroup>
    //             <Col sm={2}>
    //               <InputGroup>
    //                 <FormControl type="text" value={this.vm.value}  onChange={this.changeStateHandle.bind(self)}/>
    //                 <InputGroup.Button>
    //                   <Button onClick={self.vm.addType.bind(self.vm)}>添加类别</Button>
    //                 </InputGroup.Button>                  
    //               </InputGroup>
    //              </Col> 
    //           </FormGroup>
    //           <FormGroup >
    //             <Col sm={2}>
    //               <Button onClick={self.save.bind(self)}>保存状态</Button>
    //             </Col>
    //           </FormGroup>
    //         </Form>  
    //       </div>)
  }
}