import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem
} from 'react-weui'
class App extends Component {
  render() {
    return (
            <Tab>
              <TabBody>
                {this.props.children}
              </TabBody>
            </Tab>
    );
  }
};

export default App;
    