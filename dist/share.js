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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /*
     * @Author: oliver
     * @Date: 2019-12-03 09:54:02
     * @LastEditTime : 2019-12-20 15:49:23
     * @LastEditors  : Please set LastEditors
     * @Description: In User Settings Edit
     * @FilePath: /share/src/utils/index.ts
     */
    /**
     * @description: 通过meta标签的name获取meta标签的内容
     * @param {string} name meta标签的名字
     * @return {string}: meta标签的内容
     */
    function getMetaContentByName(name) {
        var ele = document.getElementsByName(name)[0];
        return ele ? ele.content : '';
    }
    /**
     * @description: 获取html文档里面的第一张图片
     * @return: html文档里面的第一张图片的地址
     */
    function getFirstImage() {
        var ele = document.images[0];
        return ele ? ele.src : '';
    }
    /**
     * @description: 通过class获取元素的自定义属性对象
     * @param {string}} cls 元素的class（.class）
     * @return {object}: 元素的data-属性
     */
    function getDataSet(cls) {
        var ele = document.querySelector(cls);
        if (ele.dataset) {
            return JSON.parse(JSON.stringify(ele.dataset));
        }
        else {
            var attrs = ele.attributes;
            var len = attrs.length;
            var obj = {};
            for (var i = 0; i < len; i++) {
                var item = attrs[i];
                var key = item.name;
                if (key.indexOf("data-") > -1) {
                    key = key.replace(/^data-/i, '').replace(/-(\w)/g, function (all, letter) { return letter.toUpperCase(); });
                    obj[key] = item.value;
                }
            }
            return obj;
        }
    }

    var url = location.href;
    var origin = location.origin;
    var site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
    var title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
    var description = getMetaContentByName('description') || getMetaContentByName('Description');
    var image = getFirstImage();
    var defaults = {
        url: url,
        origin: origin,
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

    __$styleInject(".share_item {\n  display: inline-block;\n  vertical-align: top;\n}\n.icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n");

    var Share = /** @class */ (function () {
        function Share(el, config) {
            if (el === void 0) { el = '.custom-share'; }
            if (config === void 0) { config = {}; }
            var dataConfig = getDataSet(el);
            this.el = el;
            this.config = __assign(__assign(__assign({}, defaults), dataConfig), config);
            this.initialization();
        }
        Share.prototype.initialization = function () {
            console.log(this.config);
            alert(1 + 1);
        };
        return Share;
    }());

    return Share;

}());
//# sourceMappingURL=Share.js.map
