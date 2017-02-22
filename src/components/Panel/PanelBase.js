import React, { Component } from 'react';
import Panel from './Panel'
import styles from './Panel.css';  
import Button from '../Button'
import { observer } from 'mobx-react';


export default class PanelBase  extends Panel {
    constructor(props){
      super(props);
      this.state ={
        title:'计划书基本信息',
        body:(<BaseComponent  baseInfo={props.baseInfo}/>),
        ...props
      };

    }
};


@observer
class BaseComponent extends Component{
  render(){
    return (
          <div className={ styles.base }>
            <ul >
                <li><a className="glyphicon glyphicon-pencil"></a><label>公司/项目</label><span>{this.props.baseInfo.name}</span></li>
                <li><a className="glyphicon glyphicon-pencil"></a><label>行业属性/项目</label><span>12312</span></li>
                <li><a className="glyphicon glyphicon-pencil"></a><label>创始人</label><span>123</span></li>
                <li><a className="glyphicon glyphicon-pencil"></a><label>创建时间</label><span>123</span></li>
            </ul>
            <footer > 
            <Button onClick={this.click.bind(this)}><a  className="glyphicon glyphicon-pencil"></a>编写商业计划书</Button>
            </footer>
          </div>)
  }
  click(){
    var self=this;
    self.props.baseInfo.load()
    // setTimeout(function(){
    //   self.props.baseInfo.name=Math.random()
    // },1000)
    // this.props.baseInfo.name="asd"
    // this.props.baseInfo.load();
  }
}