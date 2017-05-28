import axios from 'axios'

const ONLINE_URL = 'https://h12345jack.github.io/classification-Visualization/v1'
const DEV_URL = '/data'
const DEBUG = false
const API_URL = DEBUG? DEV_URL : ONLINE_URL

const ROUTE_DIC ={
	'lcc': '/lcc.json',
	'ztf': '/ztf.json'
}

export function getRoot(cls){
	return axios({
		url : API_URL + ROUTE_DIC[cls],
		method: 'GET',
	});
}