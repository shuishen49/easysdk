import { AdPlatformManager } from './AdPlatformManager';
import { EventEmitter } from './EventEmitter';
import { CONFIG } from './config';

export class WeChatManager extends EventEmitter {
    private static instance: WeChatManager;
    private shareCallback: () => void;
    private adCallbackSuccess: () => void;
    private adCallbackFailure: () => void;
    private static readonly adUnitId = CONFIG.weChatAdUnitId    ;
    private videoAd: any; // 根据实际SDK类型来定义
    private closeListener: Function | null = null;

    // 私有构造函数，防止外部实例化
    private constructor() {
        super();
        this.initShareMenu();
        this.initOnShowListener();
        this.initVideoAd();
        console.log("微信平台");
    }

    // 获取单例实例的方法
    public static getInstance(): WeChatManager {
        if (!WeChatManager.instance) {
            WeChatManager.instance = new WeChatManager();
        }
        return WeChatManager.instance;
    }

    // 初始化分享菜单
    private initShareMenu() {
        globalThis.wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });

        globalThis.wx.onShareAppMessage(() => {
            return {
                title: "我居然一关都过不了！", // 分享标题
                imageUrl: "https://tanchidefangkuai.oss-cn-chengdu.aliyuncs.com/share/share.jpg", // 分享图片地址，必须是 HTTPS 协议
                query: "from=rightTopShare", // 携带的查询字符串，可用于确定分享来源
            };
        });

        globalThis.wx.onShareTimeline(() => {
            return {
                title: '我居然一关都过不了！',
                imageUrl: 'https://tanchidefangkuai.oss-cn-chengdu.aliyuncs.com/share/share.jpg', // 图片 URL
                query: 'a=1&b=2'
            };
        });
    }

    // 初始化 wx.onShow 监听器
    private initOnShowListener() {
        globalThis.wx.onShow((result) => {
            if (this.shareCallback) {
                this.shareCallback();
                this.shareCallback = null; // 清除回调
            }
        });
    }

    // 初始化视频广告
    private initVideoAd() {
        this.videoAd = globalThis.wx.createRewardedVideoAd({ adUnitId: WeChatManager.adUnitId });

        this.videoAd.onLoad(() => {
            console.log('激励视频广告加载成功');
            this.emit('adLoadSuccess');
        });

        this.videoAd.onError((err: any) => {
            console.error('激励视频广告加载失败', err);
            this.emit('adLoadError', err);
        });
    }

    // 调用微信分享
    public shareAppMessage(onSuccess: () => void) {
        this.shareCallback = onSuccess;
        globalThis.wx.shareAppMessage({
            title: '我居然一关都过不了！',
        });
    }

    // 展示广告
    public showVideoAd(onSuccess: () => void, onFailure: () => void) {
        if (this.videoAd) {
            this.videoAd.show().then(() => {
                console.log('广告展示成功');
            }).catch((err) => {
                console.error('广告展示失败', err);
                if (onFailure) {
                    onFailure();
                }
            });
    
            // 取消之前的关闭监听器
            if (this.closeListener) {
                this.videoAd.offClose(this.closeListener);
            }
    
            // 定义新的关闭监听器
            this.closeListener = (res) => {
                if (res && res.isEnded) {
                    console.log('广告播放完成，发放奖励');
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    console.log('广告播放未完成');
                    if (onFailure) {
                        onFailure();
                    }
                }
            };
    
            // 添加新的关闭监听器
            this.videoAd.onClose(this.closeListener);
        } else {
            console.error('videoAd 未定义');
            if (onFailure) {
                onFailure();
            }
        }
    }
}
