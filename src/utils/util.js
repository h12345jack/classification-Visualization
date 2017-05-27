const CLASS_NAME = {
	"lcc": "LCC(美国国会图书分类法)",
    "ztf": "中图法(中国图书馆分类法)",
    "zhihu": "知乎话题结构"
}


export function getClassName(class_name = 'lcc'){
	return CLASS_NAME[class_name];

}