import echarts2 from 'echarts2'
import tree from 'echarts2/chart/tree'
import ecConfig from 'echarts2/config'
import _ from 'lodash'

import {treeChange, init_tree} from './tree'


export const lcc = (data) => {
    let myChart = echarts2.init(document.getElementById('lcc-main'));
    return myChart;
}
