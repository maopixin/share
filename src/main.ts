/*
 * @Author: oliver
 * @Date: 2019-11-28 13:51:50
 * @LastEditTime : 2019-12-20 15:58:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/src/main.ts
 */
import defaults from './data/options';
import { getDataSet } from './utils/index';
import './style/index.less'

class Share {

    el: string;
    config: object;

    constructor(el:string = '.custom-share', config:object = {}) {
        const dataConfig = getDataSet(el);
        this.el = el;
        this.config = {...defaults, ...dataConfig, ...config};
        this.initialization();
    };

    initialization() {
        console.log(this.config);
        alert(1 + 1);
    };

};

export default Share;