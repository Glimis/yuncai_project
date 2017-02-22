import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';


import App from './App';
import ItemListView from './module/item/ItemListView'
import ItemAddView from './module/item/ItemAddView'


import { Navbar,Nav,NavItem ,NavDropdown ,MenuItem  } from 'react-bootstrap';
import { Router, Route, Link, browserHistory,IndexRoute  } from 'react-router'




render(
  <AppContainer>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/item/list" component={ItemListView}/>
            <Route path="/item/add" component={ItemAddView}/>
        </Route>
  </Router>
  </AppContainer>,
  document.getElementById('root')
);

