import echarts2 from 'echarts2'
import tree from 'echarts2/chart/tree'
import ecConfig from 'echarts2/config'
import _ from 'lodash'

import {treeChange, init_tree} from './tree'


export const ztf = (data) => {
    let origin_data = _.cloneDeep(data);

    let myChart = echarts2.init(document.getElementById('ztf-main'));
    let option = {
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
            text: '中国图书馆图书分类法',
            subtext: '极坐标'
        },
        toolbox: {
            show : true,
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
    };
    option.series[0].data.push(data);
    init_tree(option.series[0].data, 0 , 2);
    console.log(option.series[0].data)
    myChart.setOption(option);
    myChart.on(ecConfig.EVENT.CLICK, function(param){
        name = param.name;
        let ok = treeChange(name,option.series[0].data,origin_data, 0);
        console.log(ok);
        console.log(option);
        myChart.clear()
        myChart.setOption(option);

    });
}
