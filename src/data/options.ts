import { getMetaContentByName, getFirstImage } from '../utils';

const url = location.href;
const origin = location.origin;
const site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
const title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
const description = getMetaContentByName('description') || getMetaContentByName('Description');
const image = getFirstImage();

export default {
    url,
    origin,
    source: site,
    title,
    description,
    image,
    imageSelector: undefined,
    weiboKey: '',
    wechatQrcodeTitle: '微信扫一扫：分享',
    wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
    wechatQrcodeSize: 100,
    sites: ['weibo', 'qq', 'wechat', 'douban', 'qzone', 'linkedin', 'facebook', 'twitter', 'google'],
    mobileSites: [],
    disabled: [],
    initialized: false
}