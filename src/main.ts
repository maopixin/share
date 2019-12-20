/*
 * @Author: oliver
 * @Date: 2019-11-28 13:51:50
 * @LastEditTime : 2019-12-20 17:34:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/src/main.ts
 */
import defaults from './data/options';
import urls from './data/urls';
import { getDataSet } from './utils/index';
import './style/index.less';

interface Config {
    url: string,
    origin: string,
    source: string,
    summary: string,
    title: string,
    description: string,
    image: string,
    imageSelector: string,
    weiboKey: string,
    wechatQrcodeTitle: string,
    wechatQrcodeHelper: string,
    wechatQrcodeSize: number,
    mobileSites: Array<string>,
    sites: Array<string>,
    disabled: Array<string>,
    initialized: boolean,
    mode: string
}

class Share {

    el: string;
    config: Config;
    isWx: boolean = /MicroMessenger/i.test(navigator.userAgent);
    isMobile: boolean = document.documentElement.clientWidth <= 768;

    constructor(el:string = '.custom-share', config:object = {}) {
        // 由于不想config的属性有多种类型，所以先不支持元素属性
        // const dataConfig = getDataSet(el);
        this.el = el;
        this.config = {...defaults, ...config};
        this.createIcons();
        this.createWechat();
    };
    createIcons(): void {
        this.handleSites();
        const isPrepend: boolean = this.config.mode == 'prepend';
        isPrepend && this.config.sites.reverse();
        this.config.sites.forEach((name: string, index: number) => {
            const url: string = this.makeUrl(name);
        })
    };
    createWechat() {
        
    };
    handleSites(): void {
        let config: Config = this.config;

        if(config.mobileSites.length == 0) {
            config.mobileSites = config.sites;
        }

        // 如果当前环境是微信浏览器，则禁用微信分享
        if (this.isWx) {
            config.disabled.push('wechat');
        };

        // 删除sites中被disabled包含的部分
        if(config.disabled.length > 0) {
            config.disabled.forEach((e, i) => {
                const pcSiteshasIndex: number = config.sites.indexOf(e);
                const mbSiteshasIndex: number = config.mobileSites.indexOf(e);
                pcSiteshasIndex > -1 && config.sites.splice(pcSiteshasIndex, 1);
                mbSiteshasIndex > -1 && config.mobileSites.splice(mbSiteshasIndex, 1);
            })
        };
    }
    makeUrl(name: string) {
        if (!this.config.summary){
            this.config.summary = this.config.description;
        }
        
        return '';
    }
};

export default Share;