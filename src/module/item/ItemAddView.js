import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import { FormGroup,FormControl,DropdownButton,InputGroup,MenuItem ,Button,Form,Col  } from 'react-bootstrap';
// import Hotel from 'Model/Hotel'
import VM from './ItemAddViewVM'

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
                        <Input type="text" placeholder="变更的功能点" onChange={this.vm.change.bind(this.vm,'gnd')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>问题详细描述</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="问题详细描述"  onChange={this.vm.change.bind(this.vm,'xxms')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>影响功能点</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="影响功能点"  onChange={this.vm.change.bind(this.vm,'yxjd')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>修改后的版本号</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="修改后的版本号" onChange={this.vm.change.bind(this.vm,'bbh')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>开发show环境自测结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="开发show环境自测结果" onChange={this.vm.change.bind(this.vm,'showkf')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>开发负责人</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="开发负责人" onChange={this.vm.change.bind(this.vm,'kffzr')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试show环境验证结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试show环境验证结果" onChange={this.vm.change.bind(this.vm,'showcs')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试阿里云环境验证结果</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试阿里云环境验证结果" onChange={this.vm.change.bind(this.vm,'alcs')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>测试负责人</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="测试负责人" onChange={this.vm.change.bind(this.vm,'csfzr')}/>
                    </CellBody>
                </FormCell>
                <FormCell>
                    <CellHeader>
                        <Label>备注</Label>
                    </CellHeader>
                    <CellBody>
                        <Input type="text" defaultValue="" placeholder="备注" onChange={this.vm.change.bind(this.vm,'remark')}/>
                    </CellBody>
                </FormCell>
            </Form>
            <ButtonArea>
                <Button
                    onClick={ e=> {
                       this.vm.save()
                    }
                }>
                    保存
                </Button>
            </ButtonArea>
          </div>
         ) 
  }
}