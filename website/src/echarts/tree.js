export function init_tree(data,layer,layer_limit){
	let child_list = []
	for(let i = 0; i<data.length; i++){
		if(layer >= layer_limit){
			data[i].children = [];
		}else{
			child_list = [...child_list, ...data[i].children];
		}
	}
	// console.log(layer,layer_limit);
	if(layer < layer_limit){
		init_tree(child_list,layer + 1, layer_limit);
	}

}



/*传入为list*/
export function treeChange(name, data, origin_data, layer){
	const name_node = BFSNode(origin_data, name);

	for(let i=0; i<data.length; i++){
		if(data[i].name === name){
			if(data[i].children.length === 0){
				data[i].children = name_node.children;
			}else{
				data[i].children = [];
			}
			return 1
		}
		if(treeChange(name,data[i].children, name_node, layer+1)){
			return 1
		}
	}
	return 0
}

function BFSNode(node, name){
	let node_list =[]
	if(!Array.isArray(node)){
		node_list = [node]
	}else{
		node_list = node
	}

	if(node_list.length === 0 ){
		return null;
	}
	let children_node_list = []

	for(const item of node_list){
		console.log(item.name,name);
		if(item.name === name){
			return item
		}else{
			if(item.children){
				children_node_list = [...children_node_list,...item.children]
			}
		}
	}
	return BFSNode(children_node_list, name);
}