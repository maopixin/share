/*
 * @Author: oliver
 * @Date: 2019-11-28 13:51:50
 * @LastEditTime : 2019-12-20 14:10:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/src/main.ts
 */
import defaults from './data/options';
import { getDataSet } from './utils';
import './style/index.less'

class Share {

    el: string;
    config: object;

    constructor(el:string = '.custom-share', config:object = {}) {
        const dataConfig = getDataSet(el);
        this.config = Object.assign(defaults, dataConfig, config);
        this.initialization();
    };

    initialization() {
        console.log(this.config);
    };

};

export default Share;