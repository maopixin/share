var share = (function () {
    'use strict';

    var a = 123;
    var Share = /** @class */ (function () {
        function Share(el, options) {
            this.el = el;
            this.options = options;
            this.a = a;
            document.getElementById('a').className = '123';
        }
        return Share;
    }());

    return Share;

}());
//# sourceMappingURL=share.js.map
