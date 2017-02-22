import React, { Component } from 'react';
import styles from './common.css';  


export default class Button  extends Component {
    constructor(props){
      console.log(props)
      super(props);

    }
  render() {
    return (
      <button onClick={this.props.onClick} className={styles.btn}>{this.props.children}</button>
    );
  }
};
