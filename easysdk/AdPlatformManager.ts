import { sys } from 'cc';
import { WeChatManager } from './WeChatManager';
import { ByteDanceManager } from './ByteDanceManager';

export class AdPlatformManager {
    private static instance: AdPlatformManager | null = null;

    private constructor() { }

    public static getInstance(): AdPlatformManager {
        if (!AdPlatformManager.instance) {
            AdPlatformManager.instance = new AdPlatformManager();
        }
        return AdPlatformManager.instance;
    }

    public showAd(onSuccess: () => void, onFailure: () => void) {
        const platform = AdPlatformManager.getPlatform()
        switch (platform) {
            case "dy":
                // console.log("当前平台是抖音");
                ByteDanceManager.getInstance().showVideoAd(onSuccess, onFailure);
                break;
            case "wx":
                WeChatManager.getInstance().showVideoAd(onSuccess, onFailure);
                break;
            default:
                // 在这里添加其他平台的广告展示逻辑
                // console.log('当前平台不支持广告展示');
                if (onFailure) {
                    onFailure();
                }
                break;
        }
    }

    public static getPlatform(): string {
        console.log('sys.platform：' + sys.platform);
        const platform = sys.platform.toLowerCase();
        if (platform.includes('bytedance')) {
            return "dy";
        } else if (platform.includes('wechat')) {
            return "wx";
        } else {
            return "未知平台";
        }
    }

    public static initVideoAd(){
        const platform = AdPlatformManager.getPlatform()
        switch (platform) {
            case "dy":
                ByteDanceManager.getInstance();
                break;
            case "wx":
                WeChatManager.getInstance();
                break;
            default:
                // 在这里添加其他平台的广告展示逻辑
                // console.log('当前平台不支持广告展示');
                break;
        }
    }
    
}
