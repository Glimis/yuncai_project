import React, { Component } from 'react';
import styles from './Panel.css';  

export default class Panel  extends Component {
  constructor(props) {
      super(props);
      var state={
        ...props
      }
      
      this.state=state
  }
  render() {
    
    return (
      <div className={ styles.panel }>
         <h3>{this.state.title}</h3>
           {this.state.body}
      </div>
    );
  }
};
