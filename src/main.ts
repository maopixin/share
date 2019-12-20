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