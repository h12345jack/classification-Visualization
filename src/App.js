import React, { Component } from 'react';
import './index.css';
import ecConfig from 'echarts2/config'
import MyLayout from './containers/Layout'

import {treeChange, init_tree} from './echarts/tree'
import {getRoot} from './api/tree'
import _ from 'lodash'

class App extends Component {

  
  render() {
    return (
      <div id="App">
        <MyLayout />
      </div>
    );
  }
}

export default App;
