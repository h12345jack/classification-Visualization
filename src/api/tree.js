import axios from 'axios'

const ONLINE_URL = ''
const DEV_URL = '/data'
const DEBUG = true
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