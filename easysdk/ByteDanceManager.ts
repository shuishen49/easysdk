import { EventEmitter } from './EventEmitter';
import { CONFIG } from './config';

export class ByteDanceManager extends EventEmitter {
    private static instance: ByteDanceManager | null = null;
    private videoAd: any; // 根据实际SDK类型来定义
    private static readonly adUnitId = CONFIG.byteDanceAdUnitId;
    // 在类中添加一个属性来保存关闭监听器
    private closeListener: Function | null = null;
    // 私有构造函数，防止外部实例化
    private constructor() {
        super();
        this.initVideoAd();
        console.log("抖音平台");
    }

    public static getInstance(): ByteDanceManager {
        if (!ByteDanceManager.instance) {
            ByteDanceManager.instance = new ByteDanceManager();
        }
        return ByteDanceManager.instance;
    }

    // 初始化视频广告
    private initVideoAd() {
        this.videoAd = globalThis.tt.createRewardedVideoAd({ adUnitId: ByteDanceManager.adUnitId });

        this.videoAd.onLoad(() => {
            console.log('激励视频广告加载成功');
            this.emit('adLoadSuccess');
        });

        this.videoAd.onError((err: any) => {
            console.error('激励视频广告加载失败', err);
            this.emit('adLoadError', err);
        });

        this.videoAd.onClose((res: any) => {
            if (res && res.isEnded) {
                console.log('广告播放完成，发放奖励');
                this.emit('adClosed', { completed: true });
            } else {
                console.log('广告播放未完成');
                this.emit('adClosed', { completed: false });
            }
        });
    }


    // 展示视频广告
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
    
    public showRevisitGuide(): Promise<void> {
        return new Promise((resolve, reject) => {
            globalThis.tt.showRevisitGuide({
                success: () => {
                    console.log('成功调起复访引导弹窗');
                    resolve();
                },
                fail: (res) => {
                    console.log('调用失败，错误信息：%s', res.errMsg);
                    reject(res);
                }
            });
        });
    }

    public navigateToScene(): Promise<void> {
        return new Promise((resolve, reject) => {
            globalThis.tt.navigateToScene({
                scene: "sidebar",
                success: (res) => {
                    console.log("navigate to scene success");
                    // 跳转成功回调逻辑
                    console.log("成功");
                    resolve();
                },
                fail: (res) => {
                    console.log("navigate to scene fail: ", res);
                    // 跳转失败回调逻辑
                    reject(res);
                },
            });
        });
    }

}
