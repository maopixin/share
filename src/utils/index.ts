export function getMetaContentByName(name: string):string {
    const ele = <HTMLMetaElement>document.getElementsByName(name)[0];
    return ele ? ele.content : '';
}

export function getFirstImage():string {
    const ele = <HTMLImageElement>document.images[0];
    return ele ? ele.src : '';
}

export function getDataSet(cls:string):object {
    const ele = <HTMLElement>document.querySelector(cls);
    
	if(ele.dataset){
		return JSON.parse(JSON.stringify(ele.dataset));
	}else{
		const attrs:NamedNodeMap = ele.attributes;
        const len:number = attrs.length;
        let obj:object = {};
        
		for (let i = 0; i < len; i++) {
            const item = attrs[i];
			let key = item.name;
			if(key.indexOf("data-") > -1){
                key = key.replace(/^data-/i, '').replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
                obj[key] = item.value;
			}
		}
		return obj;
	}
}