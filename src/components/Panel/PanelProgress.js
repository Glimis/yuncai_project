import React, { Component } from 'react';
import Panel from './Panel'
export default class PanelProgress  extends Panel {
    constructor(props){
      super(props);
      this.state ={
        title:'项目进度',
        body:(<div>进度条</div>)
      };
    }
};
