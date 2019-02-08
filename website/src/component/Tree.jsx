import React, { Component } from 'react';
import _ from 'lodash'
import ReactEcharts from 'echarts-for-react'; 

import {getRoot} from '../api/tree'
import {treeChange, init_tree} from '../echarts/tree'
import {getClassName} from '../utils/util'

export default class Tree extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      data: {},
	      classfication: 'lcc',
	      option: {}
	  	}
  	}


  	componentDidUpdate() {
		const {option, data, classfication } = this.state;
		getRoot(classfication).then(res => {
			const data = res.data;
			const option = {
				tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove'
				},
				series: [
					{
						type: 'tree',
		
						data: [data],
		
						top: '18%',
						bottom: '14%',
		
						layout: 'radial',
		
						symbol: 'emptyCircle',
		
						symbolSize: 7,
		
						initialTreeDepth: 3,
		
						animationDurationUpdate: 750
		
					}
				]
			}
			console.log(option)
			this.setState({
				data,
				option
			})
		});
  	}

	render(){
		return <div id={`${this.state.classfication}-main`} style={{height:800}}>
					  {/* <ReactEcharts 
						option={this.state.option}
						notMerge={true}
						lazyUpdate={true}
					/> */}
			  </div>
	}
}
