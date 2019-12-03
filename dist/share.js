var Share = (function () {
    'use strict';

    

    function __$styleInject(css) {
        if (!css) return;

        if (typeof window == 'undefined') return;
        var style = document.createElement('style');
        style.setAttribute('media', 'screen');

        style.innerHTML = css;
        document.head.appendChild(style);
        return css;
    }

    function getMetaContentByName(name) {
        var ele = document.getElementsByName(name)[0];
        return ele ? ele.content : '';
    }
    function getFirstImage() {
        var ele = document.images[0];
        return ele ? ele.src : '';
    }

    var site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
    var title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
    var description = getMetaContentByName('description') || getMetaContentByName('Description');
    var image = getFirstImage();
    var defaults = {
        url: location.href,
        origin: location.origin,
        source: site,
        title: title,
        description: description,
        image: image,
        imageSelector: undefined,
        weiboKey: '',
        wechatQrcodeTitle: '微信扫一扫：分享',
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
        wechatQrcodeSize: 100,
        sites: ['weibo', 'qq', 'wechat', 'douban', 'qzone', 'linkedin', 'facebook', 'twitter', 'google'],
        mobileSites: [],
        disabled: [],
        initialized: false
    };

    __$styleInject(".icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n");

    var Share = /** @class */ (function () {
        function Share(el, config) {
            this.config = defaults;
        }
        Share.prototype.init = function () {
            console.log(this.config);
        };
        return Share;
    }());

    return Share;

}());
//# sourceMappingURL=Share.js.map
