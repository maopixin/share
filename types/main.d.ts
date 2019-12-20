import './style/index.less';
interface Config {
    url: string;
    origin: string;
    source: string;
    summary: string;
    title: string;
    description: string;
    image: string;
    imageSelector: string;
    weiboKey: string;
    wechatQrcodeTitle: string;
    wechatQrcodeHelper: string;
    wechatQrcodeSize: number;
    mobileSites: Array<string>;
    sites: Array<string>;
    disabled: Array<string>;
    initialized: boolean;
    mode: string;
}
declare class Share {
    el: string;
    config: Config;
    isWx: boolean;
    isMobile: boolean;
    constructor(el?: string, config?: object);
    createIcons(): void;
    createWechat(): void;
    handleSites(): void;
    makeUrl(name: string): string;
}
export default Share;
