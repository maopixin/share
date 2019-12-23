(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Share = factory());
}(this, (function () { 'use strict';

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
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            var arguments$1 = arguments;

            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments$1[i];
                for (var p in s)
                    { if (Object.prototype.hasOwnProperty.call(s, p))
                        { t[p] = s[p]; } }
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

    /*
     * @Author: your name
     * @Date: 2019-12-20 14:54:13
     * @LastEditTime : 2019-12-20 17:14:42
     * @LastEditors  : Please set LastEditors
     * @Description: In User Settings Edit
     * @FilePath: /share/src/data/options.ts
     */
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
        summary: '',
        title: title,
        description: description,
        image: image,
        imageSelector: '',
        weiboKey: '',
        wechatQrcodeTitle: '微信扫一扫：分享',
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
        wechatQrcodeSize: 100,
        sites: ['weibo', 'qq', 'wechat', 'douban', 'qzone', 'linkedin', 'facebook', 'twitter', 'google'],
        mobileSites: [],
        disabled: [],
        initialized: false,
        mode: ''
    };

    var urls = {
        qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
        qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
        weibo: 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
        wechat: 'javascript:',
        douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
        linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
        facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
        twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
        google: 'https://plus.google.com/share?url={{URL}}'
    };

    __$styleInject(".icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n.share-item {\n  display: inline-block;\n  vertical-align: top;\n  margin-right: 10px;\n}\n.share-item .icon {\n  font-size: 30px;\n}\n.wechat {\n  position: relative;\n  color: #7bc549;\n  border-color: #7bc549;\n}\n.wechat .wechat-qrcode {\n  display: none;\n  border: 1px solid #eee;\n  position: absolute;\n  z-index: 9;\n  top: -205px;\n  left: -84px;\n  width: 200px;\n  height: 192px;\n  color: #666;\n  font-size: 12px;\n  text-align: center;\n  background-color: #fff;\n  box-shadow: 0 2px 10px #aaa;\n  transition: all 200ms;\n  -webkit-tansition: all 350ms;\n  -moz-transition: all 350ms;\n}\n.wechat .wechat-qrcode.bottom {\n  top: 40px;\n  left: -84px;\n}\n.wechat .wechat-qrcode.bottom:after {\n  display: none;\n}\n.wechat .wechat-qrcode h4 {\n  font-weight: normal;\n  height: 26px;\n  line-height: 26px;\n  font-size: 12px;\n  background-color: #f3f3f3;\n  margin: 0;\n  padding: 0;\n  color: #777;\n}\n.wechat .wechat-qrcode .qrcode {\n  width: 105px;\n  margin: 10px auto;\n}\n.wechat .wechat-qrcode .qrcode table {\n  margin: 0 !important;\n}\n.wechat .wechat-qrcode .help p {\n  font-weight: normal;\n  line-height: 16px;\n  padding: 0;\n  margin: 0;\n}\n.wechat .wechat-qrcode:after {\n  content: '';\n  position: absolute;\n  left: 50%;\n  margin-left: -6px;\n  bottom: -13px;\n  width: 0;\n  height: 0;\n  border-width: 8px 6px 6px 6px;\n  border-style: solid;\n  border-color: #fff transparent transparent transparent;\n}\n.wechat:hover .wechat-qrcode {\n  display: block;\n}\n");

    (function () {
        // QRCode for JavaScript
        //
        // Copyright (c) 2009 Kazuhiko Arase
        //
        // URL: http://www.d-project.com/
        //
        // Licensed under the MIT license:
        //   http://www.opensource.org/licenses/mit-license.php
        //
        // The word "QR Code" is registered trademark of
        // DENSO WAVE INCORPORATED
        //   http://www.denso-wave.com/qrcode/faqpatent-e.html
        //
        //---------------------------------------------------------------------
        function QR8bitByte(data) {
            this.mode = QRMode.MODE_8BIT_BYTE;
            this.data = data;
            this.parsedData = [];
            // Added to support UTF-8 Characters
            for (var i = 0, l = this.data.length; i < l; i++) {
                var byteArray = [];
                var code = this.data.charCodeAt(i);
                if (code > 0x10000) {
                    byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                    byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                    byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[3] = 0x80 | (code & 0x3F);
                }
                else if (code > 0x800) {
                    byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                    byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                    byteArray[2] = 0x80 | (code & 0x3F);
                }
                else if (code > 0x80) {
                    byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                    byteArray[1] = 0x80 | (code & 0x3F);
                }
                else {
                    byteArray[0] = code;
                }
                this.parsedData.push(byteArray);
            }
            this.parsedData = Array.prototype.concat.apply([], this.parsedData);
            if (this.parsedData.length != this.data.length) {
                this.parsedData.unshift(191);
                this.parsedData.unshift(187);
                this.parsedData.unshift(239);
            }
        }
        QR8bitByte.prototype = {
            getLength: function (buffer) {
                return this.parsedData.length;
            },
            write: function (buffer) {
                for (var i = 0, l = this.parsedData.length; i < l; i++) {
                    buffer.put(this.parsedData[i], 8);
                }
            }
        };
        function QRCodeModel(typeNumber, errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = [];
        }
        QRCodeModel.prototype = { addData: function (data) { var newData = new QR8bitByte(data); this.dataList.push(newData); this.dataCache = null; }, isDark: function (row, col) {
                if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                    throw new Error(row + "," + col);
                }
                return this.modules[row][col];
            }, getModuleCount: function () { return this.moduleCount; }, make: function () { this.makeImpl(false, this.getBestMaskPattern()); }, makeImpl: function (test, maskPattern) {
                this.moduleCount = this.typeNumber * 4 + 17;
                this.modules = new Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = new Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) {
                        this.modules[row][col] = null;
                    }
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test, maskPattern);
                if (this.typeNumber >= 7) {
                    this.setupTypeNumber(test);
                }
                if (this.dataCache == null) {
                    this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
                }
                this.mapData(this.dataCache, maskPattern);
            }, setupPositionProbePattern: function (row, col) { for (var r = -1; r <= 7; r++) {
                if (row + r <= -1 || this.moduleCount <= row + r)
                    { continue; }
                for (var c = -1; c <= 7; c++) {
                    if (col + c <= -1 || this.moduleCount <= col + c)
                        { continue; }
                    if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                        this.modules[row + r][col + c] = true;
                    }
                    else {
                        this.modules[row + r][col + c] = false;
                    }
                }
            } }, getBestMaskPattern: function () {
                var minLostPoint = 0;
                var pattern = 0;
                for (var i = 0; i < 8; i++) {
                    this.makeImpl(true, i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (i == 0 || minLostPoint > lostPoint) {
                        minLostPoint = lostPoint;
                        pattern = i;
                    }
                }
                return pattern;
            }, createMovieClip: function (target_mc, instance_name, depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++) {
                    var y = row * cs;
                    for (var col = 0; col < this.modules[row].length; col++) {
                        var x = col * cs;
                        var dark = this.modules[row][col];
                        if (dark) {
                            qr_mc.beginFill(0, 100);
                            qr_mc.moveTo(x, y);
                            qr_mc.lineTo(x + cs, y);
                            qr_mc.lineTo(x + cs, y + cs);
                            qr_mc.lineTo(x, y + cs);
                            qr_mc.endFill();
                        }
                    }
                }
                return qr_mc;
            }, setupTimingPattern: function () {
                for (var r = 8; r < this.moduleCount - 8; r++) {
                    if (this.modules[r][6] != null) {
                        continue;
                    }
                    this.modules[r][6] = (r % 2 == 0);
                }
                for (var c = 8; c < this.moduleCount - 8; c++) {
                    if (this.modules[6][c] != null) {
                        continue;
                    }
                    this.modules[6][c] = (c % 2 == 0);
                }
            }, setupPositionAdjustPattern: function () {
                var pos = QRUtil.getPatternPosition(this.typeNumber);
                for (var i = 0; i < pos.length; i++) {
                    for (var j = 0; j < pos.length; j++) {
                        var row = pos[i];
                        var col = pos[j];
                        if (this.modules[row][col] != null) {
                            continue;
                        }
                        for (var r = -2; r <= 2; r++) {
                            for (var c = -2; c <= 2; c++) {
                                if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                                    this.modules[row + r][col + c] = true;
                                }
                                else {
                                    this.modules[row + r][col + c] = false;
                                }
                            }
                        }
                    }
                }
            }, setupTypeNumber: function (test) {
                var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
                }
                for (var i = 0; i < 18; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
                }
            }, setupTypeInfo: function (test, maskPattern) {
                var data = (this.errorCorrectLevel << 3) | maskPattern;
                var bits = QRUtil.getBCHTypeInfo(data);
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 6) {
                        this.modules[i][8] = mod;
                    }
                    else if (i < 8) {
                        this.modules[i + 1][8] = mod;
                    }
                    else {
                        this.modules[this.moduleCount - 15 + i][8] = mod;
                    }
                }
                for (var i = 0; i < 15; i++) {
                    var mod = (!test && ((bits >> i) & 1) == 1);
                    if (i < 8) {
                        this.modules[8][this.moduleCount - i - 1] = mod;
                    }
                    else if (i < 9) {
                        this.modules[8][15 - i - 1 + 1] = mod;
                    }
                    else {
                        this.modules[8][15 - i - 1] = mod;
                    }
                }
                this.modules[this.moduleCount - 8][8] = (!test);
            }, mapData: function (data, maskPattern) {
                var inc = -1;
                var row = this.moduleCount - 1;
                var bitIndex = 7;
                var byteIndex = 0;
                for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                    if (col == 6)
                        { col--; }
                    while (true) {
                        for (var c = 0; c < 2; c++) {
                            if (this.modules[row][col - c] == null) {
                                var dark = false;
                                if (byteIndex < data.length) {
                                    dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                                }
                                var mask = QRUtil.getMask(maskPattern, row, col - c);
                                if (mask) {
                                    dark = !dark;
                                }
                                this.modules[row][col - c] = dark;
                                bitIndex--;
                                if (bitIndex == -1) {
                                    byteIndex++;
                                    bitIndex = 7;
                                }
                            }
                        }
                        row += inc;
                        if (row < 0 || this.moduleCount <= row) {
                            row -= inc;
                            inc = -inc;
                            break;
                        }
                    }
                }
            } };
        QRCodeModel.PAD0 = 0xEC;
        QRCodeModel.PAD1 = 0x11;
        QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
            var buffer = new QRBitBuffer();
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() > totalDataCount * 8) {
                throw new Error("code length overflow. ("
                    + buffer.getLengthInBits()
                    + ">"
                    + totalDataCount * 8
                    + ")");
            }
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                buffer.put(0, 4);
            }
            while (buffer.getLengthInBits() % 8 != 0) {
                buffer.putBit(false);
            }
            while (true) {
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD0, 8);
                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(QRCodeModel.PAD1, 8);
            }
            return QRCodeModel.createBytes(buffer, rsBlocks);
        };
        QRCodeModel.createBytes = function (buffer, rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r++) {
                var dcCount = rsBlocks[r].dataCount;
                var ecCount = rsBlocks[r].totalCount - dcCount;
                maxDcCount = Math.max(maxDcCount, dcCount);
                maxEcCount = Math.max(maxEcCount, ecCount);
                dcdata[r] = new Array(dcCount);
                for (var i = 0; i < dcdata[r].length; i++) {
                    dcdata[r][i] = 0xff & buffer.buffer[i + offset];
                }
                offset += dcCount;
                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
                var modPoly = rawPoly.mod(rsPoly);
                ecdata[r] = new Array(rsPoly.getLength() - 1);
                for (var i = 0; i < ecdata[r].length; i++) {
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;
                    ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
                }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < dcdata[r].length) {
                        data[index++] = dcdata[r][i];
                    }
                }
            }
            for (var i = 0; i < maxEcCount; i++) {
                for (var r = 0; r < rsBlocks.length; r++) {
                    if (i < ecdata[r].length) {
                        data[index++] = ecdata[r][i];
                    }
                }
            }
            return data;
        };
        var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
        var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
        var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
        var QRUtil = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0), G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0), G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1), getBCHTypeInfo: function (data) {
                var d = data << 10;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
                    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
                }
                return ((data << 10) | d) ^ QRUtil.G15_MASK;
            }, getBCHTypeNumber: function (data) {
                var d = data << 12;
                while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
                    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
                }
                return (data << 12) | d;
            }, getBCHDigit: function (data) {
                var digit = 0;
                while (data != 0) {
                    digit++;
                    data >>>= 1;
                }
                return digit;
            }, getPatternPosition: function (typeNumber) { return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]; }, getMask: function (maskPattern, i, j) { switch (maskPattern) {
                case QRMaskPattern.PATTERN000: return (i + j) % 2 == 0;
                case QRMaskPattern.PATTERN001: return i % 2 == 0;
                case QRMaskPattern.PATTERN010: return j % 3 == 0;
                case QRMaskPattern.PATTERN011: return (i + j) % 3 == 0;
                case QRMaskPattern.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                case QRMaskPattern.PATTERN101: return (i * j) % 2 + (i * j) % 3 == 0;
                case QRMaskPattern.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
                case QRMaskPattern.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
                default: throw new Error("bad maskPattern:" + maskPattern);
            } }, getErrorCorrectPolynomial: function (errorCorrectLength) {
                var a = new QRPolynomial([1], 0);
                for (var i = 0; i < errorCorrectLength; i++) {
                    a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
                }
                return a;
            }, getLengthInBits: function (mode, type) { if (1 <= type && type < 10) {
                switch (mode) {
                    case QRMode.MODE_NUMBER: return 10;
                    case QRMode.MODE_ALPHA_NUM: return 9;
                    case QRMode.MODE_8BIT_BYTE: return 8;
                    case QRMode.MODE_KANJI: return 8;
                    default: throw new Error("mode:" + mode);
                }
            }
            else if (type < 27) {
                switch (mode) {
                    case QRMode.MODE_NUMBER: return 12;
                    case QRMode.MODE_ALPHA_NUM: return 11;
                    case QRMode.MODE_8BIT_BYTE: return 16;
                    case QRMode.MODE_KANJI: return 10;
                    default: throw new Error("mode:" + mode);
                }
            }
            else if (type < 41) {
                switch (mode) {
                    case QRMode.MODE_NUMBER: return 14;
                    case QRMode.MODE_ALPHA_NUM: return 13;
                    case QRMode.MODE_8BIT_BYTE: return 16;
                    case QRMode.MODE_KANJI: return 12;
                    default: throw new Error("mode:" + mode);
                }
            }
            else {
                throw new Error("type:" + type);
            } }, getLostPoint: function (qrCode) {
                var moduleCount = qrCode.getModuleCount();
                var lostPoint = 0;
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount; col++) {
                        var sameCount = 0;
                        var dark = qrCode.isDark(row, col);
                        for (var r = -1; r <= 1; r++) {
                            if (row + r < 0 || moduleCount <= row + r) {
                                continue;
                            }
                            for (var c = -1; c <= 1; c++) {
                                if (col + c < 0 || moduleCount <= col + c) {
                                    continue;
                                }
                                if (r == 0 && c == 0) {
                                    continue;
                                }
                                if (dark == qrCode.isDark(row + r, col + c)) {
                                    sameCount++;
                                }
                            }
                        }
                        if (sameCount > 5) {
                            lostPoint += (3 + sameCount - 5);
                        }
                    }
                }
                for (var row = 0; row < moduleCount - 1; row++) {
                    for (var col = 0; col < moduleCount - 1; col++) {
                        var count = 0;
                        if (qrCode.isDark(row, col))
                            { count++; }
                        if (qrCode.isDark(row + 1, col))
                            { count++; }
                        if (qrCode.isDark(row, col + 1))
                            { count++; }
                        if (qrCode.isDark(row + 1, col + 1))
                            { count++; }
                        if (count == 0 || count == 4) {
                            lostPoint += 3;
                        }
                    }
                }
                for (var row = 0; row < moduleCount; row++) {
                    for (var col = 0; col < moduleCount - 6; col++) {
                        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
                            lostPoint += 40;
                        }
                    }
                }
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount - 6; row++) {
                        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
                            lostPoint += 40;
                        }
                    }
                }
                var darkCount = 0;
                for (var col = 0; col < moduleCount; col++) {
                    for (var row = 0; row < moduleCount; row++) {
                        if (qrCode.isDark(row, col)) {
                            darkCount++;
                        }
                    }
                }
                var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
                lostPoint += ratio * 10;
                return lostPoint;
            } };
        var QRMath = { glog: function (n) {
                if (n < 1) {
                    throw new Error("glog(" + n + ")");
                }
                return QRMath.LOG_TABLE[n];
            }, gexp: function (n) {
                while (n < 0) {
                    n += 255;
                }
                while (n >= 256) {
                    n -= 255;
                }
                return QRMath.EXP_TABLE[n];
            }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) };
        for (var i = 0; i < 8; i++) {
            QRMath.EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i++) {
            QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i++) {
            QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
        }
        function QRPolynomial(num, shift) {
            if (num.length == undefined) {
                throw new Error(num.length + "/" + shift);
            }
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
                offset++;
            }
            this.num = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) {
                this.num[i] = num[i + offset];
            }
        }
        QRPolynomial.prototype = { get: function (index) { return this.num[index]; }, getLength: function () { return this.num.length; }, multiply: function (e) {
                var num = new Array(this.getLength() + e.getLength() - 1);
                for (var i = 0; i < this.getLength(); i++) {
                    for (var j = 0; j < e.getLength(); j++) {
                        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
                    }
                }
                return new QRPolynomial(num, 0);
            }, mod: function (e) {
                if (this.getLength() - e.getLength() < 0) {
                    return this;
                }
                var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
                var num = new Array(this.getLength());
                for (var i = 0; i < this.getLength(); i++) {
                    num[i] = this.get(i);
                }
                for (var i = 0; i < e.getLength(); i++) {
                    num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
                }
                return new QRPolynomial(num, 0).mod(e);
            } };
        function QRRSBlock(totalCount, dataCount) { this.totalCount = totalCount; this.dataCount = dataCount; }
        QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
            if (rsBlock == undefined) {
                throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            }
            var length = rsBlock.length / 3;
            var list = [];
            for (var i = 0; i < length; i++) {
                var count = rsBlock[i * 3 + 0];
                var totalCount = rsBlock[i * 3 + 1];
                var dataCount = rsBlock[i * 3 + 2];
                for (var j = 0; j < count; j++) {
                    list.push(new QRRSBlock(totalCount, dataCount));
                }
            }
            return list;
        };
        QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) { switch (errorCorrectLevel) {
            case QRErrorCorrectLevel.L: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectLevel.M: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectLevel.Q: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectLevel.H: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default: return undefined;
        } };
        function QRBitBuffer() { this.buffer = []; this.length = 0; }
        QRBitBuffer.prototype = { get: function (index) { var bufIndex = Math.floor(index / 8); return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1; }, put: function (num, length) { for (var i = 0; i < length; i++) {
                this.putBit(((num >>> (length - i - 1)) & 1) == 1);
            } }, getLengthInBits: function () { return this.length; }, putBit: function (bit) {
                var bufIndex = Math.floor(this.length / 8);
                if (this.buffer.length <= bufIndex) {
                    this.buffer.push(0);
                }
                if (bit) {
                    this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
                }
                this.length++;
            } };
        var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
        function _isSupportCanvas() {
            return typeof CanvasRenderingContext2D != "undefined";
        }
        // android 2.x doesn't support Data-URI spec
        function _getAndroid() {
            var android = false;
            var sAgent = navigator.userAgent;
            if (/android/i.test(sAgent)) { // android
                android = true;
                var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
                if (aMat && aMat[1]) {
                    android = parseFloat(aMat[1]);
                }
            }
            return android;
        }
        var svgDrawer = (function () {
            var Drawing = function (el, htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                this.clear();
                function makeSVG(tag, attrs) {
                    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                    for (var k in attrs)
                        { if (attrs.hasOwnProperty(k))
                            { el.setAttribute(k, attrs[k]); } }
                    return el;
                }
                var svg = makeSVG("svg", { 'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight });
                svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                _el.appendChild(svg);
                svg.appendChild(makeSVG("rect", { "fill": _htOption.colorLight, "width": "100%", "height": "100%" }));
                svg.appendChild(makeSVG("rect", { "fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template" }));
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        if (oQRCode.isDark(row, col)) {
                            var child = makeSVG("use", { "x": String(col), "y": String(row) });
                            child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
                            svg.appendChild(child);
                        }
                    }
                }
            };
            Drawing.prototype.clear = function () {
                while (this._el.hasChildNodes())
                    { this._el.removeChild(this._el.lastChild); }
            };
            return Drawing;
        })();
        var useSVG = document.documentElement.tagName.toLowerCase() === "svg";
        // Drawing in DOM by using Table tag
        var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
            var Drawing = function (el, htOption) {
                this._el = el;
                this._htOption = htOption;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _htOption = this._htOption;
                var _el = this._el;
                var nCount = oQRCode.getModuleCount();
                var nWidth = Math.floor(_htOption.width / nCount);
                var nHeight = Math.floor(_htOption.height / nCount);
                var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
                for (var row = 0; row < nCount; row++) {
                    aHTML.push('<tr>');
                    for (var col = 0; col < nCount; col++) {
                        aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                    }
                    aHTML.push('</tr>');
                }
                aHTML.push('</table>');
                _el.innerHTML = aHTML.join('');
                // Fix the margin values as real size.
                var elTable = _el.childNodes[0];
                var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
                var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
                if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                    elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
                }
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._el.innerHTML = '';
            };
            return Drawing;
        })() : (function () {
            function _onMakeImage() {
                this._elImage.src = this._elCanvas.toDataURL("image/png");
                this._elImage.style.display = "block";
                this._elCanvas.style.display = "none";
            }
            // Android 2.1 bug workaround
            // http://code.google.com/p/android/issues/detail?id=5141
            var _this = window;
            if (_this._android && _this._android <= 2.1) {
                var factor = 1 / window.devicePixelRatio;
                var drawImage = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                    var arguments$1 = arguments;

                    if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                        for (var i = arguments.length - 1; i >= 1; i--) {
                            arguments$1[i] = arguments$1[i] * factor;
                        }
                    }
                    else if (typeof dw == "undefined") {
                        arguments[1] *= factor;
                        arguments[2] *= factor;
                        arguments[3] *= factor;
                        arguments[4] *= factor;
                    }
                    drawImage.apply(_this, arguments);
                };
            }
            /**
             * Check whether the user's browser supports Data URI or not
             *
             * @private
             * @param {Function} fSuccess Occurs if it supports Data URI
             * @param {Function} fFail Occurs if it doesn't support Data URI
             */
            function _safeSetDataURI(fSuccess, fFail) {
                var self = this;
                self._fFail = fFail;
                self._fSuccess = fSuccess;
                // Check it just once
                if (self._bSupportDataURI === null) {
                    var el = document.createElement("img");
                    var fOnError = function () {
                        self._bSupportDataURI = false;
                        if (self._fFail) {
                            self._fFail.call(self);
                        }
                    };
                    var fOnSuccess = function () {
                        self._bSupportDataURI = true;
                        if (self._fSuccess) {
                            self._fSuccess.call(self);
                        }
                    };
                    el.onabort = fOnError;
                    el.onerror = fOnError;
                    el.onload = fOnSuccess;
                    el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                    return;
                }
                else if (self._bSupportDataURI === true && self._fSuccess) {
                    self._fSuccess.call(self);
                }
                else if (self._bSupportDataURI === false && self._fFail) {
                    self._fFail.call(self);
                }
            }
            /**
             * Drawing QRCode by using canvas
             *
             * @constructor
             * @param {HTMLElement} el
             * @param {Object} htOption QRCode Options
             */
            var Drawing = function (el, htOption) {
                this._bIsPainted = false;
                this._android = _getAndroid();
                this._htOption = htOption;
                this._elCanvas = document.createElement("canvas");
                this._elCanvas.width = htOption.width;
                this._elCanvas.height = htOption.height;
                el.appendChild(this._elCanvas);
                this._el = el;
                this._oContext = this._elCanvas.getContext("2d");
                this._bIsPainted = false;
                this._elImage = document.createElement("img");
                this._elImage.alt = "Scan me!";
                this._elImage.style.display = "none";
                this._el.appendChild(this._elImage);
                this._bSupportDataURI = null;
            };
            /**
             * Draw the QRCode
             *
             * @param {QRCode} oQRCode
             */
            Drawing.prototype.draw = function (oQRCode) {
                var _elImage = this._elImage;
                var _oContext = this._oContext;
                var _htOption = this._htOption;
                var nCount = oQRCode.getModuleCount();
                var nWidth = _htOption.width / nCount;
                var nHeight = _htOption.height / nCount;
                var nRoundedWidth = Math.round(nWidth);
                var nRoundedHeight = Math.round(nHeight);
                _elImage.style.display = "none";
                this.clear();
                for (var row = 0; row < nCount; row++) {
                    for (var col = 0; col < nCount; col++) {
                        var bIsDark = oQRCode.isDark(row, col);
                        var nLeft = col * nWidth;
                        var nTop = row * nHeight;
                        _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.lineWidth = 1;
                        _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                        _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
                        // 안티 앨리어싱 방지 처리
                        _oContext.strokeRect(Math.floor(nLeft) + 0.5, Math.floor(nTop) + 0.5, nRoundedWidth, nRoundedHeight);
                        _oContext.strokeRect(Math.ceil(nLeft) - 0.5, Math.ceil(nTop) - 0.5, nRoundedWidth, nRoundedHeight);
                    }
                }
                this._bIsPainted = true;
            };
            /**
             * Make the image from Canvas if the browser supports Data URI.
             */
            Drawing.prototype.makeImage = function () {
                if (this._bIsPainted) {
                    _safeSetDataURI.call(this, _onMakeImage);
                }
            };
            /**
             * Return whether the QRCode is painted or not
             *
             * @return {Boolean}
             */
            Drawing.prototype.isPainted = function () {
                return this._bIsPainted;
            };
            /**
             * Clear the QRCode
             */
            Drawing.prototype.clear = function () {
                this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
                this._bIsPainted = false;
            };
            /**
             * @private
             * @param {Number} nNumber
             */
            Drawing.prototype.round = function (nNumber) {
                if (!nNumber) {
                    return nNumber;
                }
                return Math.floor(nNumber * 1000) / 1000;
            };
            return Drawing;
        })();
        /**
         * Get the type by string length
         *
         * @private
         * @param {String} sText
         * @param {Number} nCorrectLevel
         * @return {Number} type
         */
        function _getTypeNumber(sText, nCorrectLevel) {
            var nType = 1;
            var length = _getUTF8Length(sText);
            for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
                var nLimit = 0;
                switch (nCorrectLevel) {
                    case QRErrorCorrectLevel.L:
                        nLimit = QRCodeLimitLength[i][0];
                        break;
                    case QRErrorCorrectLevel.M:
                        nLimit = QRCodeLimitLength[i][1];
                        break;
                    case QRErrorCorrectLevel.Q:
                        nLimit = QRCodeLimitLength[i][2];
                        break;
                    case QRErrorCorrectLevel.H:
                        nLimit = QRCodeLimitLength[i][3];
                        break;
                }
                if (length <= nLimit) {
                    break;
                }
                else {
                    nType++;
                }
            }
            if (nType > QRCodeLimitLength.length) {
                throw new Error("Too long data");
            }
            return nType;
        }
        function _getUTF8Length(sText) {
            var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
            return replacedText.length + (replacedText.length != sText ? 3 : 0);
        }
        /**
         * @class QRCode
         * @constructor
         * @example
         * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
         *
         * @example
         * var oQRCode = new QRCode("test", {
         *    text : "http://naver.com",
         *    width : 128,
         *    height : 128
         * });
         *
         * oQRCode.clear(); // Clear the QRCode.
         * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
         *
         * @param {HTMLElement|String} el target element or 'id' attribute of element.
         * @param {Object|String} vOption
         * @param {String} vOption.text QRCode link data
         * @param {Number} [vOption.width=256]
         * @param {Number} [vOption.height=256]
         * @param {String} [vOption.colorDark="#000000"]
         * @param {String} [vOption.colorLight="#ffffff"]
         * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H]
         */
        window.QRCode = function (el, vOption) {
            this._htOption = {
                width: 256,
                height: 256,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRErrorCorrectLevel.H
            };
            if (typeof vOption === 'string') {
                vOption = {
                    text: vOption
                };
            }
            // Overwrites options
            if (vOption) {
                for (var i in vOption) {
                    this._htOption[i] = vOption[i];
                }
            }
            if (typeof el == "string") {
                el = document.getElementById(el);
            }
            if (this._htOption.useSVG) {
                Drawing = svgDrawer;
            }
            this._android = _getAndroid();
            this._el = el;
            this._oQRCode = null;
            this._oDrawing = new Drawing(this._el, this._htOption);
            if (this._htOption.text) {
                this.makeCode(this._htOption.text);
            }
        };
        /**
         * Make the QRCode
         *
         * @param {String} sText link data
         */
        QRCode.prototype.makeCode = function (sText) {
            this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
            this._oQRCode.addData(sText);
            this._oQRCode.make();
            this._el.title = sText;
            this._oDrawing.draw(this._oQRCode);
            this.makeImage();
        };
        /**
         * Make the Image from Canvas element
         * - It occurs automatically
         * - Android below 3 doesn't support Data-URI spec.
         *
         * @private
         */
        QRCode.prototype.makeImage = function () {
            if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
                this._oDrawing.makeImage();
            }
        };
        /**
         * Clear the QRCode
         */
        QRCode.prototype.clear = function () {
            this._oDrawing.clear();
        };
        /**
         * @name QRCode.CorrectLevel
         */
        QRCode.CorrectLevel = QRErrorCorrectLevel;
        return QRCode;
    })();

    !function (e) {
        var c, o = '<svg><symbol id="icongoogle" viewBox="0 0 1024 1024"><path d="M920.69140625 175.23828125l0 673.49707031c0 19.66992188-7.09277344 36.53173828-21.23876953 50.70410156C885.25390625 913.625 868.35253906 920.69140625 848.76171875 920.69140625L175.23828125 920.69140625c-19.59082031 0-36.53173828-7.06640625-50.69091797-21.25195313C110.41455078 885.26708984 103.30859375 868.40527344 103.30859375 848.73535156L103.30859375 175.23828125c0-19.60400391 7.10595703-36.4921875 21.23876953-50.69091797C138.70654297 110.38818359 155.64746094 103.30859375 175.23828125 103.30859375l673.5234375 0c19.59082031 0 36.4921875 7.07958984 50.69091797 21.23876953C913.59863281 138.73291016 920.69140625 155.63427734 920.69140625 175.23828125zM551.27392578 237.34619141c0-5.97216797-6.02490234-8.97802734-18.02197265-8.97802735-1.64794922 0-15.76757813-0.14501953-42.49072266-0.4086914-26.73632813-0.27685547-46.48535156-0.27685547-59.29980469 0-12.77490234 0.27685547-29.26757813 1.37109375-49.41210937 3.28271484-20.22363281 1.8984375-36.26806641 4.75927734-48.22558594 8.55615234-31.61425781 10.34912109-56.79492188 27.23730469-75.62109375 50.71728516-18.79980469 23.40087891-28.19970703 51.17871094-28.19970703 83.35986328 0 38.14013672 11.98388672 68.92382813 35.96484375 92.31152344 23.92822266 23.4140625 55.02832031 34.87060547 93.16845703 34.33007812l4.93066406 0c0 13.11767578 0.54052734 22.62304688 1.60839844 28.66113282 1.09423828 5.98535156 2.47851563 9.12304688 4.12646484 9.39990234s3.67822266 1.60839844 6.10400391 4.08691406c2.43896484 2.42578125 4.73291016 6.38085938 6.97412109 11.83886719-29.97949219 0-57.92871094 3.22998047-83.80810547 9.76904297-25.87939453 6.56542969-49.12207031 19.59082031-69.87304687 39.27392578-20.671875 19.59082031-31.03417969 44.38916016-31.03417969 74.38183594 0 41.92382813 16.75634766 73.15576172 50.28222656 93.60351562 33.52587891 20.39501953 72.60205078 30.62548828 117.25488282 30.62548828 50.16357422 0 93.62988281-12.39257813 130.38574218-37.20410156 36.79541016-24.79833984 55.21289063-61.13232422 55.21289063-109.10742187 0-20.68505859-5.31298828-40.57910156-15.95214844-59.65576172-10.58642578-19.07666016-22.47802734-34.06640625-35.52978515-44.96923828-13.10449219-10.86328125-24.93017578-21.37060547-35.54296875-31.4428711-10.63916016-10.125-15.96533203-17.87695313-15.96533204-23.34814453 0-5.97216797 4.08691406-12.91992188 12.30029297-20.83007812 8.16064453-7.89697266 17.24414063-15.79394531 27.35595703-23.70410157 10.125-7.89697266 19.23486328-20.56640625 27.40869141-38.06103515 8.16064453-17.37597656 12.26074219-37.61279297 12.26074219-60.49951172 0-41.37011719-11.98388672-70.53222656-35.96484375-87.42041016 0.58007813 0 4.73291016-0.421875 12.69580078-1.23925781 7.91015625-0.81738281 13.46044922-1.62158203 16.75634766-2.45214844 3.21679688-0.83056641 7.91015625-2.16210938 13.89550781-4.08691406 5.98535156-1.91162109 10.19091797-4.640625 12.66943359-8.17382813C549.99511719 246.48242187 551.27392578 242.29003906 551.27392578 237.34619141zM485.84375 658.32470703c0 23.99414063-11.70703125 43.30810547-35.13427734 57.98144531-23.45361328 14.75244141-47.98828125 22.09570313-73.6171875 22.09570313-25.57617188 0-48.87158203-6.49951172-69.8334961-19.59082031-20.97509766-13.09130859-31.49560547-31.65380859-31.49560547-55.60839844 0-26.18261719 11.16650391-45.78662109 33.52587891-58.8515625 22.31982422-13.06494141 47.39501953-19.60400391 75.18603516-19.60400391 25.1015625 0 48.25195313 6.42041016 69.53027343 19.1953125C475.19140625 616.78320313 485.84375 634.91064453 485.84375 658.32470703zM440.86132812 376.30126953c0 19.10302734-4.21875 35.46386719-12.68261718 49.02978516-8.4375 13.65820313-21.64746094 20.50048828-39.60351563 20.50048828-23.45361328 0-42.06884766-12.39257813-56.00390625-37.20410156-13.86914063-24.79833984-20.83007813-49.71533203-20.83007812-74.81689454 0-19.06347656 4.21875-35.37158203 12.69580078-49.01660156 8.42431641-13.60546875 21.64746094-20.43457031 39.65625-20.43457031 23.4140625 0 42.06884766 12.37939453 55.96435547 37.17773437C433.96630859 326.36181641 440.86132812 351.27880859 440.86132812 376.30126953zM726.99804688 370.60595703l98.87695312 0 0-49.05615234-98.87695313 0L726.99804688 221.82910156l-49.04296876 0 0 99.72070313-99.70751953 0 0 49.05615234 99.70751954 0-1e-8 98.89013672 49.04296875 0L726.99804688 370.60595703z" fill="#d81e06" ></path></symbol><symbol id="icondouban" viewBox="0 0 1024 1024"><path d="M238.16899108 116.4921875h547.6619406A121.59925314 121.59925314 0 0 1 907.50773525 237.3159348v549.36805315A121.59925314 121.59925314 0 0 1 785.83093168 907.50773525H238.16899108A121.59925314 121.59925314 0 0 1 116.4921875 786.68398795V237.3159348A121.59925314 121.59925314 0 0 1 238.16899108 116.4921875z" fill="#42BD56" ></path><path d="M248.71586504 239.72000201H775.67181063v58.93841277H248.71586504zM729.14148371 593.04027923V360.77640059H294.85843827v231.64347442l434.28304544 0.62040422zM357.98458125 420.41276878H667.10104908v113.61154725H357.98458125z m277.63094678 305.54914263a690.97534589 690.97534589 0 0 0 53.35477406-100.81570692l-63.35879424-23.26516308a818.77864197 818.77864197 0 0 1-57.07720013 124.08087H457.7145806a579.92296672 579.92296672 0 0 0-62.04043538-124.08087l-58.395559 23.26516308a909.12502612 909.12502612 0 0 1 58.39555899 100.81570692H233.7486096v58.31800933h556.50270279v-58.31800933z" fill="#FFFFFF" ></path></symbol><symbol id="icondiandian" viewBox="0 0 1024 1024"><path d="M536.99960938 686.99990234h325.00019531V361.99970703l-324.52470703 0.05009766-0.47460938-75.04980469h249.99960938V186.99980469H536.99960938V112.00097656H411.99980469v249.99960938h-225v325.00019531h174.99990234v226.77539063l174.99990234-226.77539063z m-225.00000001-82.29990234V450.17509766H737v154.52490234H311.99960937z m499.8506836 156.62460937c-41.34990234 0-74.85029297 33.87568359-74.85029297 75.67558594 0 41.79990234 33.50039063 75.70019531 74.85029297 75.70019531 41.32441406 0 74.84941406-33.87568359 74.84941406-75.70019531-0.02460937-41.80078125-33.525-75.67558594-74.84941406-75.67558594z m-224.85058594 0c-41.32441406 0-74.84941406 33.87568359-74.84941406 75.67558594 0 41.79990234 33.49951172 75.70019531 74.84941406 75.70019531 41.32529297 0 74.85029297-33.87568359 74.85029297-75.70019531 0-41.80078125-33.525-75.67558594-74.85029297-75.67558594z m-374.99941406 0c-41.32529297 0-74.85029297 33.87568359-74.85029297 75.67558594 0 41.79990234 33.50039063 75.70019531 74.85029297 75.70019531 41.32441406 0 74.84941406-33.87568359 74.84941406-75.70019531 0-41.80078125-33.525-75.67558594-74.84941406-75.67558594z" fill="#1296db" ></path></symbol><symbol id="iconlinkedin" viewBox="0 0 1024 1024"><path d="M512 0c283.2 0 512 228.8 512 512S795.2 1024 512 1024 0 795.2 0 512 228.8 0 512 0z m294.4 553.6c0-108.8-57.6-160-136-160-62.4 0-91.2 35.2-107.2 59.2v0-49.6h-118.4c1.6 33.6 0 355.2 0 355.2h118.4V558.4c0-11.2 1.6-20.8 3.2-28.8 8-20.8 27.2-43.2 60.8-43.2 43.2 0 59.2 32 59.2 80v190.4h118.4V553.6zM321.6 230.4c-40 0-67.2 27.2-67.2 60.8 0 33.6 25.6 60.8 65.6 60.8 41.6 0 67.2-27.2 67.2-60.8 0-35.2-25.6-60.8-65.6-60.8z m-59.2 526.4h118.4V401.6h-118.4v355.2z" fill="#01577E" ></path></symbol><symbol id="iconwechat" viewBox="0 0 1024 1024"><path d="M683.058 364.695c11 0 22 1.016 32.943 1.976C686.564 230.064 538.896 128 370.681 128c-188.104 0.66-342.237 127.793-342.237 289.226 0 93.068 51.379 169.827 136.725 229.256L130.72 748.43l119.796-59.368c42.918 8.395 77.37 16.79 119.742 16.79 11 0 21.46-0.48 31.914-1.442a259.168 259.168 0 0 1-10.455-71.358c0.485-148.002 128.744-268.297 291.403-268.297l-0.06-0.06z m-184.113-91.992c25.99 0 42.913 16.79 42.913 42.575 0 25.188-16.923 42.579-42.913 42.579-25.45 0-51.38-16.85-51.38-42.58 0-25.784 25.93-42.574 51.38-42.574z m-239.544 85.154c-25.384 0-51.374-16.85-51.374-42.58 0-25.784 25.99-42.574 51.374-42.574 25.45 0 42.918 16.79 42.918 42.575 0 25.188-16.924 42.579-42.918 42.579z m736.155 271.655c0-135.647-136.725-246.527-290.983-246.527-162.655 0-290.918 110.88-290.918 246.527 0 136.128 128.263 246.587 290.918 246.587 33.972 0 68.423-8.395 102.818-16.85l93.809 50.973-25.93-84.677c68.907-51.93 120.286-119.815 120.286-196.033z m-385.275-42.58c-16.923 0-34.452-16.79-34.452-34.179 0-16.79 17.529-34.18 34.452-34.18 25.99 0 42.918 16.85 42.918 34.18 0 17.39-16.928 34.18-42.918 34.18z m188.165 0c-16.984 0-33.972-16.79-33.972-34.179 0-16.79 16.927-34.18 33.972-34.18 25.93 0 42.913 16.85 42.913 34.18 0 17.39-16.983 34.18-42.913 34.18z" fill="#09BB07" ></path></symbol><symbol id="iconqzone" viewBox="0 0 1024 1024"><path d="M955.728 428.224c8.385-8.785 3.76-23.536-8.073-25.753l-276.832-51.854c-4.838-0.906-9.02-3.987-11.38-8.383L525.873 93.229c-2.798-5.23-8.342-7.85-13.875-7.896-5.532 0.045-11.075 2.667-13.873 7.896L364.558 342.234c-2.36 4.396-6.543 7.477-11.381 8.383L76.345 402.471c-11.833 2.217-16.458 16.968-8.073 25.753L269.64 639.086c3.564 3.733 5.205 8.952 4.433 14.1l-46.015 282.032c-1.819 12.126 10.394 21.407 21.298 16.182L505 827.827a16.098 16.098 0 0 1 7-1.58 16.1 16.1 0 0 1 7.003 1.58L774.644 951.4c10.904 5.225 23.117-4.056 21.298-16.182l-46.88-287.298 206.666-219.696z" fill="#FFCD00" ></path><path d="M559.42 493.63c-4.517-3.772-110.987-40.332-273.968-16-3.16 0.47-5.913-0.394-8.04-1.992-0.717 4 3.587 7.152 8.988 7.527 115.064 8.021 179.42 54.987 199.492 71.501 40.78-28.923 71.882-50.606 73.063-51.527 3.668-2.856 3.695-6.811 0.465-9.51m135.65-29.972c-41.744 35.168-160.159 116.897-201.52 148.468-4.864 3.711-3.177 9.424 2.098 11.43 17.045 6.488 36.23 11.95 56.421 16.445l159.784-152.228c12.544-13.184 5.238-29.152-10.422-32.661-1.025 3.011-3.259 5.933-6.36 8.546M817.187 640l-0.101 0.045c-70.456 29.709-241.54 79.623-451.762 72.33-25.386-0.88-50.63-3.715-64.786-6.325-2.067-0.38-3.878-1.012-5.476-1.846-10.567 12.224 2.073 21.462 47.148 30.58 131.886 26.676 286.047 38.934 415.304 30.665l-8.884-54.324c43.727-31.431 64.996-58.546 67.524-62.57 2.899-4.616 1.033-8.555 1.033-8.555" fill="#F1A308" ></path><path d="M818.863 646.995c-53.31 5.137-215.894 3.686-311.826-33.167-5.107-1.962-6.834-7.566-2.129-11.194 40.025-30.84 154.62-110.68 195.014-145.035 7.872-6.696 9.95-15.437 0.375-22.542-18.36-13.623-83.168-36.203-158.198-36.816-107.373-0.88-212.858 29.498-259.133 54.09-10.983 5.837-4.392 21.221 6.83 19.495 164.223-25.24 271.495 12.756 276.045 16.67 3.255 2.798 3.074 6.906-0.5 9.715-3.036 2.389-199.263 143.36-258.23 193.11-9.286 7.834-6.845 24.246 8.35 27.018 14.152 2.582 39.406 5.412 64.784 6.284 210.173 7.214 381.314-42.24 451.755-71.63 0 0-2.148-7.057-13.137-5.998" fill="#FFFFFF" ></path></symbol><symbol id="iconweibo" viewBox="0 0 1024 1024"><path d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z" fill="#E71F19" ></path><path d="M803.096 425.327c2.896 1.298 5.945 1.869 8.994 1.869 8.993 0 17.7-5.328 21.323-14.112 5.95-13.964 8.993-28.793 8.993-44.205 0-62.488-51.208-113.321-114.181-113.321-15.379 0-30.32 3.022-44.396 8.926-11.755 4.896-17.263 18.432-12.335 30.24 4.933 11.662 18.572 17.134 30.465 12.238 8.419-3.46 17.268-5.33 26.41-5.33 37.431 0 67.752 30.241 67.752 67.247 0 9.068-1.735 17.857-5.369 26.202a22.832 22.832 0 0 0 12.335 30.236l0.01 0.01z" fill="#F5AA15" ></path><path d="M726.922 114.157c-25.969 0-51.65 3.744-76.315 10.942-18.423 5.472-28.868 24.622-23.5 42.91 5.509 18.29 24.804 28.657 43.237 23.329a201.888 201.888 0 0 1 56.578-8.064c109.253 0 198.189 88.271 198.189 196.696 0 19.436-2.905 38.729-8.419 57.16-5.508 18.289 4.79 37.588 23.212 43.053 3.342 1.014 6.817 1.442 10.159 1.442 14.943 0 28.725-9.648 33.37-24.48 7.547-24.906 11.462-50.826 11.462-77.175-0.143-146.588-120.278-265.813-267.973-265.813z" fill="#F5AA15" ></path><path d="M388.294 534.47c-84.151 0-152.34 59.178-152.34 132.334 0 73.141 68.189 132.328 152.34 132.328 84.148 0 152.337-59.182 152.337-132.328 0-73.15-68.19-132.334-152.337-132.334zM338.53 752.763c-29.454 0-53.39-23.755-53.39-52.987 0-29.228 23.941-52.989 53.39-52.989 29.453 0 53.39 23.76 53.39 52.989 0 29.227-23.937 52.987-53.39 52.987z m99.82-95.465c-6.382 11.086-19.296 15.696-28.726 10.219-9.43-5.323-11.75-18.717-5.37-29.803 6.386-11.09 19.297-15.7 28.725-10.224 9.43 5.472 11.755 18.864 5.37 29.808z" fill="#040000" ></path></symbol><symbol id="iconpengyouquan" viewBox="0 0 1024 1024"><path d="M652.189 114.635s-55.86-22.614-140.234-22.614c-84.37 0-140.23 25.903-140.23 25.903l280.549 285.449-0.085-288.738z" fill="#FB5453" ></path><path d="M811.202 217.796c-61.928-58.727-121.8-79.649-121.8-79.649l-2.06 392.072 210.411-199.332c0 0.085-24.535-54.364-86.55-113.09z" fill="#6468F1" ></path><path d="M906.498 368.778L617.205 645.535h292.667s22.95-55.119 22.95-138.419c-0.087-83.215-26.324-138.338-26.324-138.338z" fill="#5283F0" ></path><path d="M696.62 887.697s56.813-22.842 118.033-80.602c61.223-57.757 83.1-113.488 83.1-113.488l-409.132-1.946L696.62 887.697z" fill="#00B2FE" ></path><path d="M371.806 911.213s55.864 22.61 140.234 22.61c84.455 0 140.234-25.902 140.234-25.902l-280.548-285.45 0.08 288.742z" fill="#66D020" ></path><path d="M224.484 808.047c61.934 58.732 121.806 79.65 121.806 79.65l2.057-392.072-210.411 199.33c0.084-0.08 24.619 54.365 86.548 113.092z" fill="#9AD122" ></path><path d="M114.134 368.778s-22.956 55.107-22.956 138.378c0 83.276 26.244 138.379 26.244 138.379l289.372-276.672h-292.66v-0.085z" fill="#FFC71A" ></path><path d="M339.07 138.147s-56.814 22.843-118.034 80.6c-61.222 57.758-83.1 113.494-83.1 113.494l409.132 1.942L339.07 138.147z" fill="#FF7612" ></path></symbol><symbol id="iconqq" viewBox="0 0 1024 1024"><path d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z" fill="#FAAD08" ></path><path d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z" fill="#FAAD08" ></path><path d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z" fill="#000000" ></path><path d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017" fill="#000000" ></path><path d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453" fill="#FFFFFF" ></path><path d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498" fill="#FAAD08" ></path><path d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135" fill="#000000" ></path><path d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927" fill="#FFFFFF" ></path><path d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574" fill="#EB1C26" ></path><path d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z" fill="#EB1C26" ></path></symbol><symbol id="iconweixinzhifu" viewBox="0 0 1024 1024"><path d="M395.846 603.585c-3.921 1.98-7.936 2.925-12.81 2.925-10.9 0-19.791-5.85-24.764-14.625l-2.006-3.864-78.106-167.913c-0.956-1.98-0.956-3.865-0.956-5.845 0-7.83 5.928-13.68 13.863-13.68 2.965 0 5.928 0.944 8.893 2.924l91.965 64.43c6.884 3.864 14.82 6.79 23.708 6.79 4.972 0 9.85-0.945 14.822-2.926L861.71 282.479c-77.149-89.804-204.684-148.384-349.135-148.384-235.371 0-427.242 157.158-427.242 351.294 0 105.368 57.361 201.017 147.323 265.447 6.88 4.905 11.852 13.68 11.852 22.45 0 2.925-0.957 5.85-2.006 8.775-6.881 26.318-18.831 69.334-18.831 71.223-0.958 2.92-2.013 6.79-2.013 10.75 0 7.83 5.929 13.68 13.865 13.68 2.963 0 5.928-0.944 7.935-2.925l92.922-53.674c6.885-3.87 14.82-6.794 22.756-6.794 3.916 0 8.889 0.944 12.81 1.98 43.496 12.644 91.012 19.53 139.48 19.53 235.372 0 427.24-157.158 427.24-351.294 0-58.58-17.78-114.143-48.467-163.003l-491.39 280.07-2.963 1.98z" fill="#09BB07" ></path></symbol><symbol id="iconzhifubao" viewBox="0 0 1024 1024"><path d="M902.095 652.871l-250.96-84.392s19.287-28.87 39.874-85.472c20.59-56.606 23.539-87.689 23.539-87.689l-162.454-1.339v-55.487l196.739-1.387v-39.227H552.055v-89.29h-96.358v89.294H272.133v39.227l183.564-1.304v59.513h-147.24v31.079h303.064s-3.337 25.223-14.955 56.606c-11.615 31.38-23.58 58.862-23.58 58.862s-142.3-49.804-217.285-49.804c-74.985 0-166.182 30.123-175.024 117.55-8.8 87.383 42.481 134.716 114.728 152.139 72.256 17.513 138.962-0.173 197.04-28.607 58.087-28.391 115.081-92.933 115.081-92.933l292.486 142.041c-11.932 69.3-72.067 119.914-142.387 119.844H266.37c-79.714 0.078-144.392-64.483-144.466-144.194V266.374c-0.074-79.72 64.493-144.399 144.205-144.47h491.519c79.714-0.073 144.396 64.49 144.466 144.203v386.764z m-365.76-48.895s-91.302 115.262-198.879 115.262c-107.623 0-130.218-54.767-130.218-94.155 0-39.34 22.373-82.144 113.943-88.333 91.519-6.18 215.2 67.226 215.2 67.226h-0.047z" fill="#02A9F1" ></path></symbol><symbol id="iconfacebook" viewBox="0 0 1024 1024"><path d="M926 201.522C926 144.347 879.647 98 822.473 98h-620.95C144.347 98 98 144.347 98 201.522v620.95C98 879.649 144.348 926 201.522 926h620.95C879.648 926 926 879.648 926 822.473v-620.95z m-155 102.81H666.666v103.333H771v103.333H666.666V822H563.334V510.998H460V407.665h103.334V272.412c0-34.738 38.262-71.412 77.238-71.412H771v103.332z" fill="#425F9B" ></path></symbol><symbol id="icontumblr" viewBox="0 0 1024 1024"><path d="M678 470.509H553.877v161.534c0 30.236 5.79 45.56 45.513 45.56H678v124.26S635.385 806 591.114 806c-109.645 0-161.366-66.27-161.366-140.82V470.508H347v-115.97c99.714-8.285 108.402-84.495 115.851-132.539h91.026v124.254H678v124.255zM843.201 98H180.804a82.529 82.529 0 0 0-58.636 24.168A82.526 82.526 0 0 0 98 180.804v662.398a82.779 82.779 0 0 0 24.253 58.545A82.782 82.782 0 0 0 180.804 926h662.397c21.96 0 43.02-8.722 58.546-24.253A82.778 82.778 0 0 0 926 843.202V180.804a82.784 82.784 0 0 0-24.253-58.55A82.784 82.784 0 0 0 843.201 98z" fill="#36465F" ></path></symbol><symbol id="icontwitter" viewBox="0 0 1024 1024"><path d="M996.12 211.772c-27.41 40.139-60.586 74.338-99.524 102.58 0.419 5.715 0.628 14.311 0.628 25.788 0 53.242-7.782 106.353-23.346 159.333-15.565 52.986-39.201 103.845-70.903 152.58-31.707 48.735-69.47 91.84-113.279 129.306-43.813 37.474-96.638 67.37-158.477 89.693-61.84 22.323-127.951 33.491-198.335 33.491-110.943 0-212.483-29.692-304.613-89.063 14.305 1.622 30.264 2.434 47.876 2.434 92.13 0 174.226-28.247 246.284-84.738-42.974-0.84-81.467-14.043-115.478-39.62-34.01-25.57-57.358-58.222-70.042-97.94 13.519 2.04 26.018 3.063 37.495 3.063 17.612 0 35.008-2.256 52.2-6.764-45.855-9.43-83.828-32.252-113.908-68.466-30.08-36.208-45.12-78.268-45.12-126.163v-2.44c27.829 15.564 57.726 23.95 89.694 25.157-27.04-18.026-48.532-41.557-64.463-70.591-15.932-29.03-23.926-60.552-23.973-94.563 0-36.055 9.01-69.41 27.042-100.067 49.525 60.998 109.815 109.812 180.881 146.446 71.06 36.63 147.106 56.99 228.126 61.078-3.249-15.565-4.874-30.71-4.874-45.435 0-54.868 19.337-101.641 58.013-140.316s85.45-58.012 140.32-58.012c57.332 0 105.649 20.886 144.955 62.65 44.653-8.595 86.63-24.553 125.93-47.873-15.144 47.06-44.201 83.511-87.176 109.344 38.1-4.088 76.173-14.33 114.218-30.735l-0.151-0.157z" fill="#00ACED" ></path></symbol><symbol id="iconVK" viewBox="0 0 1024 1024"><path d="M844.398 102H178.801C136.559 102 102 136.559 102 178.801v665.597c0 42.243 34.559 76.801 76.801 76.801h665.597c42.243 0 76.801-34.558 76.801-76.801V178.801c0-42.242-34.558-76.801-76.801-76.801zM765.52 675.441l-74.879 1.118s-16.161 3.203-37.282-11.36c-28-19.199-54.398-69.277-75.039-62.719-20.8 6.559-20.16 51.52-20.16 51.52s0.16 9.602-4.64 14.719c-5.122 5.601-15.36 6.722-15.36 6.722h-33.441s-73.918 4.481-139.039-63.363c-71.039-73.918-133.758-220.637-133.758-220.637s-3.684-9.601 0.316-14.242c4.481-5.277 16.481-5.597 16.481-5.597l80.16-0.481s7.519 1.277 12.961 5.277c4.48 3.204 6.879 9.442 6.879 9.442s12.961 32.801 30.082 62.398c33.437 57.762 49.121 70.403 60.48 64.321 16.481-8.957 11.52-81.758 11.52-81.758s0.32-26.403-8.321-38.082c-6.718-9.117-19.359-11.84-24.8-12.481-4.481-0.636 2.879-11.039 12.48-15.84 14.399-7.039 39.84-7.519 69.918-7.199 23.363 0.16 30.242 1.762 39.363 3.84 27.68 6.723 18.239 32.481 18.239 94.242 0 19.84-3.52 47.68 10.718 56.797 6.082 4 21.122 0.641 58.723-63.199 17.758-30.238 31.199-65.758 31.199-65.758s2.879-6.402 7.36-9.121c4.64-2.719 10.879-1.922 10.879-1.922l84.32-0.476s25.281-3.043 29.441 8.476c4.321 12-9.441 40-43.84 85.922-56.48 75.359-62.878 68.32-15.839 111.84 44.8 41.601 54.078 61.922 55.679 64.48 18.239 30.719-20.8 33.121-20.8 33.121z" fill="#4A76A8" ></path></symbol><symbol id="iconlinkedin1" viewBox="0 0 1024 1024"><path d="M127 908h165V379H127v529z m82.554-792C262.262 116 305 158.823 305 211.474 305 264.186 262.262 307 209.554 307 156.655 307 114 264.186 114 211.474 114 158.823 156.655 116 209.554 116zM396 379.15h157.741v72.277h2.236C577.91 409.815 631.63 366 711.699 366 878.199 366 909 475.484 909 617.916V908H744.588V650.873c0-61.383-1.214-140.283-85.538-140.283-85.642 0-98.7 66.8-98.7 135.745V908H396V379.15z" fill="#006A9A" ></path></symbol><symbol id="iconskype" viewBox="0 0 1024 1024"><path d="M748.923 609.302c0-19.512-3.783-37.357-11.358-53.51-7.574-16.21-17.028-29.53-28.372-40.073-11.319-10.515-25.546-20.093-42.668-28.655-17.123-8.583-33.199-15.226-48.261-19.934a672.07 672.07 0 0 0-51.166-13.479l-60.85-14.012c-11.675-2.737-20.257-4.776-25.726-6.137-5.502-1.352-12.297-3.6-20.429-6.733-8.145-3.15-13.99-6.287-17.52-9.368-3.53-3.081-6.756-7.184-9.651-12.278a35.607 35.607 0 0 1-4.418-17.526c0-30.045 28.072-45.074 84.187-45.074 16.775 0 31.77 2.343 45.057 7.039 13.263 4.685 23.8 10.252 31.572 16.697a471.411 471.411 0 0 1 22.24 19.604 113.057 113.057 0 0 0 23.35 16.998 57.416 57.416 0 0 0 28.06 7.026c18.322 0 33.025-6.232 44.147-18.703 11.143-12.475 16.698-27.52 16.698-45.086 0-21.457-10.908-40.85-32.778-58.158-21.84-17.33-49.514-30.478-82.977-39.448C574.59 239.498 539.095 235 501.647 235c-26.482 0-52.212 3.03-77.149 9.077a269.007 269.007 0 0 0-69.887 27.486 140.925 140.925 0 0 0-52.018 50.906c-13.01 21.672-19.555 46.713-19.593 75.17 0 23.826 3.688 44.579 11.066 62.294a111.135 111.135 0 0 0 32.777 44.185 199.103 199.103 0 0 0 46.764 28.375c16.715 7.184 36.797 13.51 60.242 19.025l85.37 21.032c35.063 8.575 56.908 15.626 65.477 21.063 12.47 7.78 18.706 19.487 18.706 35.083 0 15.226-7.773 27.835-23.333 37.756-15.604 9.922-36.047 14.895-61.39 14.895-19.846 0-37.698-3.107-53.512-9.363-15.809-6.245-28.479-13.746-38.01-22.518-9.522-8.784-18.378-17.582-26.563-26.366-8.183-8.78-17.134-16.286-26.866-22.544a57.495 57.495 0 0 0-31.59-9.35c-19.51 0-34.214 5.831-44.13 17.513-9.93 11.694-14.888 26.315-14.888 43.867 0 35.894 23.77 66.582 71.315 92.104 47.55 25.505 104.243 38.284 170.086 38.31 28.415 0 55.72-3.597 81.845-10.836 26.154-7.235 50.002-17.672 71.623-31.285 21.605-13.638 38.842-31.855 51.697-54.678C742.576 663.384 749 637.77 749 609.302h-0.077zM961 736.498c0 61.978-21.907 114.863-65.773 158.704C851.387 939.042 798.493 961 736.524 961c-50.69 0-96.27-15.598-136.784-46.773-30.02 6.24-59.266 9.358-87.706 9.358-55.711 0-109.016-10.813-159.908-32.484-50.887-21.654-94.726-50.874-131.547-87.693-36.82-36.82-66.052-80.672-87.693-131.534a404.245 404.245 0 0 1-32.484-159.908c0-28.435 3.118-57.668 9.364-87.706C78.59 383.726 63 338.1 63 287.476c0-61.952 21.92-114.862 65.79-158.703C172.628 84.933 225.525 63 287.49 63c50.676 0 96.262 15.585 136.783 46.761a429.565 429.565 0 0 1 87.697-9.37c55.725 0 109.005 10.837 159.904 32.482 50.9 21.667 94.728 50.887 131.534 87.706 36.819 36.807 66.04 80.66 87.693 131.547a403.926 403.926 0 0 1 32.471 159.908c0 28.41-3.092 57.642-9.345 87.693C945.428 640.292 961 685.86 961 736.498z" fill="#00AFF0" ></path></symbol><symbol id="iconline" viewBox="0 0 1024 1024"><path d="M512.013 75C250.766 75 39 241.635 39 447.175 39 638.1 221.798 795.348 457.187 816.77a28.802 28.802 0 0 1 19.224 12.549c10.448 17.196 3.022 53.833-5.09 94.914-8.114 41.076 36.005 19.76 45.766 15 7.771-3.769 207.754-116.462 326.812-226.97C930.962 644.746 985 550.924 985 447.187 985.03 241.635 773.247 75 512.013 75zM355 543.99c-0.125 13.927-11.545 25.122-25.513 25.01h-86.763C227.41 569 207 563.723 207 538.986V354.01a25.188 25.188 0 0 1 7.564-17.773A25.324 25.324 0 0 1 232.513 329h5.108a25.328 25.328 0 0 1 17.95 7.237 25.192 25.192 0 0 1 7.563 17.773v159.97h66.34c13.972-0.12 25.4 11.075 25.526 25.006v5.004z m71-5.342C426 552.652 414.581 564 400.5 564c-14.085 0-25.5-11.348-25.5-25.352V359.352C375 345.35 386.415 334 400.5 334c14.081 0 25.5 11.35 25.5 25.352v179.296z m222.93-0.021c-1.429 13.309-12.064 23.763-25.395 24.962a28.745 28.745 0 0 1-29.934-14.313l-81.827-114.744v104.066c-0.33 13.783-11.597 24.783-25.388 24.783-13.785 0-25.057-11-25.386-24.783V358.946a25.156 25.156 0 0 1 7.524-17.73A25.16 25.16 0 0 1 486.38 334a32.116 32.116 0 0 1 28.788 18.278c7.874 11.623 83.026 116.388 83.026 116.388v-109.72c0.341-13.783 11.614-24.779 25.404-24.779s25.062 10.996 25.403 24.78v179.65l-0.07 0.03z m153.436-114.634c8.949 0 17.217 4.767 21.692 12.503a24.969 24.969 0 0 1 0 25.008 25.057 25.057 0 0 1-21.692 12.503h-66.264v39.988h66.26a25.057 25.057 0 0 1 22.18 12.33 24.958 24.958 0 0 1 0 25.344 25.058 25.058 0 0 1-22.18 12.324h-99.383a22.721 22.721 0 0 1-16.165-6.482A22.629 22.629 0 0 1 680 541.513v-185.01a22.64 22.64 0 0 1 6.81-16.01 22.734 22.734 0 0 1 16.169-6.486h99.387a25.063 25.063 0 0 1 22.18 12.324 24.978 24.978 0 0 1 0 25.345 25.071 25.071 0 0 1-22.18 12.329h-66.264v40.004h66.26l0.004-0.016z" fill="#00C300" ></path></symbol><symbol id="iconPinterest" viewBox="0 0 1024 1024"><path d="M511.879 90.596c-232.625 0-421 188.519-421 421.32 0 178.393 110.623 330.85 267.394 392.214-3.794-33.529-6.954-84.138 1.263-120.83 7.583-32.895 49.304-209.39 49.304-209.39s-12.64-25.308-12.64-62.63c0-58.831 34.134-102.482 75.855-102.482 36.03 0 53.098 27.2 53.098 59.467 0 36.056-22.758 90.462-34.767 140.438-10.114 41.751 20.86 75.911 62.58 75.911 74.593 0 132.117-79.074 132.117-192.945 0-100.585-72.695-171.436-175.734-171.436-119.473 0-190.27 89.83-190.27 182.825 0 36.057 13.906 75.277 31.607 96.153 3.16 4.431 3.793 7.594 3.16 12.02-3.16 13.287-10.114 41.752-11.377 47.447-1.897 7.592-6.324 9.49-13.907 5.694-52.468-24.672-85.339-101.218-85.339-163.212 0-132.85 96.715-254.94 278.135-254.94 146.025 0 259.178 104.38 259.178 242.92 0 144.866-91.66 261.9-218.085 261.9-42.355 0-82.808-22.142-96.716-48.078 0 0-20.86 80.338-25.917 99.95-9.484 36.692-35.402 82.24-52.468 110.706 39.19 12.019 80.911 18.977 124.529 18.977 232.626 0 421-188.514 421-421.315 0-232.165-188.374-420.684-421-420.684z" fill="#BD081C" ></path></symbol><symbol id="icongithub" viewBox="0 0 1024 1024"><path d="M512.465 98.744c-236.05-2.401-429.41 187.034-431.998 423.242 0.894 183.912 120.176 346.283 295.332 402.018 21.6 3.93 29.451-9.04 29.451-20.436v-71.916c-120.17 25.545-145.7-56.59-145.7-56.59a112.364 112.364 0 0 0-47.914-62.089c-39.272-25.937 3.141-25.545 3.141-25.545a90.702 90.702 0 0 1 65.978 43.624c25.358 43.993 81.26 59.548 125.678 34.976a91.569 91.569 0 0 1 27.487-56.59c-95.825-10.615-196.36-46.768-196.36-209.067a163.13 163.13 0 0 1 43.591-114.358 148.652 148.652 0 0 1 4.32-111.609c15.896-35.223 36.525-11.397 117.815 43.229a419.24 419.24 0 0 1 216.002 0c82.471-54.626 117.82-43.229 117.82-43.229a148.657 148.657 0 0 1 4.32 111.61 163.145 163.145 0 0 1 45.945 113.57c0 162.695-101.321 198.458-196.36 209.067a98.273 98.273 0 0 1 29.452 78.594v115.933c0 13.752 7.856 24.756 29.457 20.43 174.63-56.071 293.466-218.106 294.545-401.622C941.878 285.778 748.52 96.343 512.465 98.744" fill="#231F20" ></path></symbol><symbol id="icondingding" viewBox="0 0 1024 1024"><path d="M512.003 79C272.855 79 79 272.855 79 512.003 79 751.145 272.855 945 512.003 945 751.145 945 945 751.145 945 512.003 945 272.855 751.145 79 512.003 79z m200.075 375.014c-0.867 3.764-3.117 9.347-6.234 16.012h0.087l-0.347 0.648c-18.183 38.86-65.631 115.108-65.631 115.108l-0.215-0.52-13.856 24.147h66.8L565.063 779l29.002-115.368h-52.598l18.27-76.29c-14.76 3.55-32.253 8.436-52.945 15.1 0 0-27.967 16.36-80.607-31.5 0 0-35.501-31.29-14.891-39.078 8.744-3.33 42.466-7.573 69.004-11.122 35.93-4.845 57.965-7.441 57.965-7.441s-110.607 1.643-136.841-2.468c-26.237-4.11-59.525-47.905-66.626-86.377 0 0-10.953-21.117 23.595-11.122 34.547 10 177.535 38.95 177.535 38.95s-185.933-56.992-198.36-70.929c-12.381-13.846-36.406-75.902-33.289-113.981 0 0 1.343-9.521 11.127-6.926 0 0 137.49 62.75 231.475 97.152 94.028 34.403 175.76 51.885 165.2 96.414z" fill="#3AA2EB" ></path></symbol><symbol id="icontengxunweibo" viewBox="0 0 1024 1024"><path d="M808.63085938 907.5078125H215.36914062c-54.38232422 0-98.87695313-44.49462891-98.87695312-98.87695313V215.36914062C116.4921875 160.98681641 160.98681641 116.4921875 215.36914062 116.4921875h593.26171875c54.38232422 0 98.87695313 44.49462891 98.87695313 98.87695313v593.26171875c0 54.38232422-44.49462891 98.87695313-98.87695313 98.87695312" fill="#47BCF6" ></path><path d="M378.51611328 774.02392578c-9.88769531 0-19.77539063-9.88769531-19.77539062-19.77539062-4.94384766-133.48388672 49.43847656-207.64160156 88.98925781-247.19238282-14.83154297-24.71923828-14.83154297-59.32617188 4.94384765-88.98925781 24.71923828-29.66308594 74.15771484-39.55078125 108.76464844-9.88769531 34.60693359 24.71923828 39.55078125 74.15771484 14.83154297 108.76464844-24.71923828 29.66308594-64.27001953 39.55078125-98.87695312 19.77539062-34.60693359 29.66308594-84.04541016 98.87695313-79.1015625 217.52929688 0 9.88769531-9.88769531 19.77539063-19.77539063 19.77539062" fill="#FFFFFF" ></path><path d="M512 655.37158203c-14.83154297 0-24.71923828 0-39.55078125-4.94384766-9.88769531 0-19.77539063-14.83154297-14.83154297-24.71923828 0-9.88769531 14.83154297-19.77539063 24.71923828-14.83154297 9.88769531 0 19.77539063 4.94384766 29.66308594 4.94384766 79.1015625 0 148.31542969-69.21386719 148.31542969-148.31542969 0-84.04541016-64.27001953-148.31542969-148.31542969-148.31542968s-148.31542969 69.21386719-148.31542969 148.31542968c0 14.83154297 4.94384766 34.60693359 9.88769532 49.43847657 4.94384766 9.88769531 0 19.77539063-14.83154297 24.71923828-9.88769531 4.94384766-19.77539063 0-24.71923828-14.83154297-4.94384766-19.77539063-9.88769531-39.55078125-9.88769532-59.32617188C324.13378906 363.68457031 408.17919922 279.63916016 512 279.63916016s187.86621094 84.04541016 187.86621094 187.86621093c0 103.82080078-84.04541016 187.86621094-187.86621094 187.86621094" fill="#FFFFFF" ></path></symbol></svg>', l = (c = document.getElementsByTagName("script"))[c.length - 1].getAttribute("data-injectcss");
        if (l && !e.__iconfont__svg__cssinject__) {
            e.__iconfont__svg__cssinject__ = !0;
            try {
                document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
            }
            catch (c) {
                console && console.log(c);
            }
        }
        !function (c) {
            if (document.addEventListener)
                { if (~["complete", "loaded", "interactive"].indexOf(document.readyState))
                    { setTimeout(c, 0); }
                else {
                    var l = function () {
                        document.removeEventListener("DOMContentLoaded", l, !1),
                            c();
                    };
                    document.addEventListener("DOMContentLoaded", l, !1);
                } }
            else
                { document.attachEvent && (i = c,
                    a = e.document,
                    h = !1,
                    (o = function () {
                        try {
                            a.documentElement.doScroll("left");
                        }
                        catch (c) {
                            return void setTimeout(o, 50);
                        }
                        t();
                    })(),
                    a.onreadystatechange = function () {
                        "complete" == a.readyState && (a.onreadystatechange = null,
                            t());
                    }); }
            function t() {
                h || (h = !0,
                    i());
            }
            var i, a, h, o;
        }(function () {
            var c, l, t, i, a, h;
            (c = document.createElement("div")).innerHTML = o,
                o = null,
                (l = c.getElementsByTagName("svg")[0]) && (l.setAttribute("aria-hidden", "true"),
                    l.style.position = "absolute",
                    l.style.width = 0,
                    l.style.height = 0,
                    l.style.overflow = "hidden",
                    t = l,
                    (i = document.body).firstChild ? (a = t,
                        (h = i.firstChild).parentNode.insertBefore(a, h)) : i.appendChild(t));
        });
    }(window);

    var Share = /** @class */ (function () {
        function Share(el, config) {
            if (el === void 0) { el = '.custom-share'; }
            if (config === void 0) { config = {}; }
            this.isWx = /MicroMessenger/i.test(navigator.userAgent);
            this.isMobile = document.documentElement.clientWidth <= 768;
            // 由于不想config的属性有多种类型，所以先不支持元素属性
            // const dataConfig = getDataSet(el);
            this.el = this.getRoot(el);
            this.config = __assign(__assign({}, defaults), config);
            this.createIcons();
            this.createWechat();
        }
        Share.prototype.getRoot = function (el) {
            if (!document.querySelector(el)) {
                throw '第一个参数应该是元素的类名，例如".custom-share"';
            }
            var ele = document.querySelector(el) || document.createElement('div');
            return ele;
        };
        Share.prototype.createIcons = function () {
            var _this = this;
            this.handleSites();
            var isPrepend = this.config.mode == 'prepend';
            isPrepend && this.config.sites.reverse();
            this.config.sites.forEach(function (name, index) {
                var url = _this.makeUrl(name);
                if (!_this.config.initialized) {
                    var link = _this.createLink(name, url);
                    isPrepend ? _this.el.insertBefore(link, _this.el.firstChild) : _this.el.appendChild(link);
                }
                else {
                    _this.handleLink(name, url);
                }
            });
        };
        Share.prototype.createWechat = function () {
            var wechat = document.querySelector('.wechat');
            if (wechat) {
                var div = document.createElement('div');
                div.className = "wechat-qrcode";
                div.innerHTML = "<h4>" + this.config.wechatQrcodeTitle + "</h4>\n                            <div class=\"qrcode\"></div>\n                            <div class=\"help\">" + this.config.wechatQrcodeHelper + "</div>";
                var qrcode = div.querySelector('.qrcode');
                new QRCode(qrcode, { text: this.config.url, width: this.config.wechatQrcodeSize, height: this.config.wechatQrcodeSize });
                wechat.appendChild(div);
            }
            else {
                return false;
            }
        };
        Share.prototype.createLink = function (name, url) {
            var a = document.createElement('a');
            a.className = "share-item " + name;
            a.href = url;
            if (name == 'wechat') {
                a.tabIndex = -1;
            }
            else {
                a.target = "_blank";
            }
            a.innerHTML = "<svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon" + name + "\"></use>\n                        </svg>";
            return a;
        };
        Share.prototype.handleLink = function (name, url) {
            var item = document.querySelector("." + name);
            if (item) {
                item.href = url;
            }
            else {
                throw "\u6CA1\u6709\u627E\u5230\u7C7B\u540D\u4E3A." + name + "\u7684\u5143\u7D20";
            }
        };
        Share.prototype.handleSites = function () {
            var config = this.config;
            if (config.mobileSites.length == 0) {
                config.mobileSites = config.sites;
            }
            // 如果当前环境是微信浏览器，则禁用微信分享
            if (this.isWx) {
                config.disabled.push('wechat');
            }
            // 删除sites中被disabled包含的部分
            if (config.disabled.length > 0) {
                config.disabled.forEach(function (e, i) {
                    var pcSiteshasIndex = config.sites.indexOf(e);
                    var mbSiteshasIndex = config.mobileSites.indexOf(e);
                    pcSiteshasIndex > -1 && config.sites.splice(pcSiteshasIndex, 1);
                    mbSiteshasIndex > -1 && config.mobileSites.splice(mbSiteshasIndex, 1);
                });
            }
        };
        Share.prototype.makeUrl = function (name) {
            var _this = this;
            if (!this.config.summary) {
                this.config.summary = this.config.description;
            }
            return urls[name].replace(/\{\{(\w)(\w*)\}\}/g, function (m, fix, key) {
                var nameKey = name + fix + key.toLowerCase();
                key = (fix + key).toLowerCase();
                return encodeURIComponent((_this.config[nameKey] === undefined ? _this.config[key] : _this.config[nameKey]) || '');
            });
        };
        return Share;
    }());

    return Share;

})));
//# sourceMappingURL=Share.js.map
