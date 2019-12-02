const a = 123;
class Share {
    el: string;
    options: object;
    a: number;
    constructor(el: string, options: object) {
        this.el = el;
        this.options = options;
        this.a = a;
        document.getElementById('a').className = '123'
    }
}
// window.Share = Share;
export default Share;