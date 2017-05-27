import React, { Component } from 'react';
import echarts2 from 'echarts2'
import tree from 'echarts2/chart/tree'
import ecConfig from 'echarts2/config'
import _ from 'lodash'
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

  	componentWillMount() {
  		this.updateTree(this.props.classfication)
  	}

  	componentWillReceiveProps(nextProps) {
  		this.updateTree(nextProps.classfication)
  	}

  	updateTree(classfication) {
  		const classficationName = getClassName(classfication);
  		console.log(classfication, "---------32");
  		getRoot(classfication)
  			.then(res => {
  				const data = res.data;
                console.log(data.details);

  				const origin_data = _.cloneDeep(data);
  				const option = {
	  					  tooltip : {
			  				  showDelay:1,
				              hideDelay: 50,
				              position: function(p){
				                  return [p[0]+ 10,p[1]-10]
				              },
				              textStyle : {
				                  color: 'yellow',
				                  decoration: 'none',
				                  fontSize: 15,
				                  fontWeight: 'bold'
				              },
				              formatter: function(params, tickets, callback){
				                  return params.data.details;
				              }
				          },
				          title : {
				              text: classficationName,
				              subtext: '极坐标'
	          			  },
	          			  toolbox: {
				              show : false,
				              feature : {
				                  mark : {show: true},
				                  dataView : {show: false, readOnly: true},
				                  restore : {show: true},
				                  saveAsImage : {show: true}
				              }
				          },
				          series : [
				              {
				                  name:'树图',
				                  type:'tree',
				                  orient: 'radial',  // vertical horizontal radial
				                  rootLocation: {x: 'center',y: 'center'}, // 根节点位置  {x: 100, y: 'center'}
				                  layerPadding: 250,
				                  hoverable: true,
				                  roam: true,
				                  clickable: true,
				                  symbol: 'circle',
				                  symbolSize: [10, 6],
				                  itemStyle: {
				                      normal: {
				                          color: '#4883b4',
				                          label: {
				                              show: true,
				                              position: 'right',
				                              formatter: "{b}",
				                              textStyle: {
				                                  color: '#53C4F7',
				                                  fontSize: 5
				                              }
				                          },
				                          lineStyle: {
				                              color: '#ccc',
				                              type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
				                          }
				                      },
				                      emphasis: {
				                          color: '#4883b4',
				                          label: {
				                              show: false
				                          },
				                          borderWidth: 0
				                      }
				                  },
				                  data: []
				           	   }
				          ]
  				}
  				this.setState({
  					data,
  					origin_data,
  					option
  				});
  			}).catch(err =>{
  				console.log(err);
  			})
  	}

  	initTree(){
  		const {option, data, origin_data } = this.state;
  		option.series[0].rootLocation = {x: 'center',y: 'center'};
  		option.series[0].data.push(data);
  		init_tree(option.series[0].data, 0 , 2);
  		const myChart = echarts2.init(document.getElementById(this.state.classfication + '-main'));
  		myChart.clear()
  		myChart.setOption(option);
  		console.log("======128")
        myChart.on(ecConfig.EVENT.CLICK, function(param){
          name = param.name;
          let ok = treeChange(name,option.series[0].data,origin_data, 0);
          myChart.clear()
          myChart.setOption(option);

      	});
  	}

  	resetRoot(){
  		const {option, data, origin_data} = this.state;
  		option.series[0].rootLocation = {x: 'center',y: 'center'};
  		const myChart = echarts2.init(document.getElementById(this.state.classfication + '-main'));
  		myChart.clear()
        myChart.setOption(option);
        console.log("======144")
        myChart.on(ecConfig.EVENT.CLICK, function(param){
          name = param.name;
          let ok = treeChange(name,option.series[0].data,origin_data, 0);
          myChart.clear()
          myChart.setOption(option);

      	});
  	}

  	componentDidUpdate() {
  		this.initTree();
  		console.log("componentDidUpdate");
  	}

	render(){
		console.log(this.state.classfication)
		return <div id={`${this.state.classfication}-main`} style={{height:800}}></div>
	}
}