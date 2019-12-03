export function getMetaContentByName(name: string):string {
    const ele = <HTMLMetaElement>document.getElementsByName(name)[0];
    return ele ? ele.content : '';
}

export function getFirstImage():string {
    const ele = <HTMLImageElement>document.images[0];
    return ele ? ele.src : '';
}