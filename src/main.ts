import defaults from './data/options';
class Share {
    el: string;
    config: object;
    constructor(el:string, config:object = {}) {
        this.config = defaults;
    };
    init() {
        console.log(this.config);
    }
};
export default Share;